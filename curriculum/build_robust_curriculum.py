"""Generate the Robust curriculum source used by the POUR importer."""
import json
from pathlib import Path


def document(title, sections):
    nodes = [{"type": "heading", "attrs": {"level": 1}, "content": [{"type": "text", "text": title}]}]
    for heading, paragraphs in sections:
        nodes.append({"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": heading}]})
        for paragraph in paragraphs:
            nodes.append({"type": "paragraph", "content": [{"type": "text", "text": paragraph}]})
    return {"type": "doc", "content": nodes}


def assessment(title, questions):
    elements, key, explanations = [], {}, {}
    for number, (question, correct, distractors, explanation) in enumerate(questions, 1):
        name = f"q{number}"
        # Rotate the correct answer so that the position does not reveal it.
        choices = list(distractors)
        choices.insert((number - 1) % 4, correct)
        elements.append({"type": "radiogroup", "name": name, "title": question, "choices": choices, "isRequired": True})
        key[name], explanations[name] = correct, explanation
    return {"questions": {"title": title, "pages": [{"name": "page1", "title": "Knowledge check", "elements": elements}]}, "answer_key": key, "explanations": explanations, "passing_percent": 70, "max_attempts": 3}


lessons_data = [
    (
        "4.1.1 Parsing (Obsolete and removed)",
        "Explain why 4.1.1 was removed in WCAG 2.2, distinguish obsolete requirements from current accessibility barriers, and use markup and assistive technology tests to investigate remaining issues.",
        [
            ("Learning objectives", ["Explain the historical purpose and WCAG 2.2 status of 4.1.1; identify problems that remain relevant under other criteria; and investigate a markup defect without claiming that a validator alone establishes conformance."]),
            ("Why Robust matters", ["Robust content is implemented so browsers, accessibility APIs, and assistive technologies can interpret and operate it reliably. A screen reader uses information exposed through the browser and platform accessibility API; it does not simply read a page's visual layout. A defect in markup or scripting can therefore produce a different experience for someone using assistive technology.", "The WCAG version matters. Success criterion 4.1.1 Parsing was removed from WCAG 2.2 because its original assistive-technology parsing problems no longer have the same utility. It is included here as historical context, not as a current WCAG 2.2 conformance requirement. Consult https://www.w3.org/TR/WCAG22/#parsing-obsolete-and-removed."]),
            ("What removal does and does not mean", ["The former criterion addressed particular markup parsing problems, such as malformed elements or duplicate IDs. Its removal does not mean that broken labels, inaccessible controls, or incorrect relationships are acceptable. When an incorrect ID association leaves an input without a programmatically determinable name, investigate that actual failure against the applicable current requirements, including 4.1.2 and, where relevant, 1.3.1.", "A duplicate ID is not automatically a WCAG 2.2 failure merely because an automated validator flags it. It can nonetheless cause a label, description, or control relationship to resolve to the wrong element. Determine the user-facing effect rather than assigning an obsolete criterion as the failure." ]),
            ("Use validation as a diagnostic", ["Use an HTML validator and browser developer tools to locate structural errors, then inspect the accessibility tree and exercise the affected component with keyboard and assistive technology. Fix invalid nesting and duplicate identifiers when they cause unreliable behavior, and retest the affected task. A clean validation report alone cannot establish that controls have correct names, states, or messages.", "For example, if two form inputs use the same id and a label targets that id, inspect which input receives the label. Give each input a unique id and associate each label with its own control. Then confirm the accessible names in the browser and with a screen reader." ]),
            ("Required practical activity", ["Create a small form with two inputs that share an id, each with a label. Use a markup validator to identify the duplicate, inspect both inputs in the accessibility tree, and record the names actually exposed. Give the inputs distinct ids and update the labels, then repeat the inspection. Explain which observed barrier, if any, is relevant to current criteria and why 4.1.1 must not be reported as a WCAG 2.2 requirement. Complete the mini-assessment after this activity."]),
            ("Key takeaways", ["4.1.1 is obsolete and removed in WCAG 2.2. Markup diagnostics remain useful, but judge current conformance using applicable current criteria and observed effects on users."]),
        ],
        [
            ("What is the status of 4.1.1 in WCAG 2.2?", "It is obsolete and removed", ["It is a new Level AA requirement", "It is the sole test of all markup", "It requires every page to validate as HTML"], "The criterion was removed from WCAG 2.2; it is included for historical context."),
            ("A duplicate id makes a form control lose its accessible name. What should you do?", "Fix the association and evaluate the relevant current criteria", ["Ignore the issue because 4.1.1 was removed", "Report only a 4.1.1 failure under WCAG 2.2", "Hide the control from the accessibility tree"], "A defect can still cause a failure of an applicable current criterion."),
            ("What does a clean markup validation report prove?", "It is useful diagnostic evidence but does not establish accessibility conformance", ["All assistive technologies will work", "The site meets every WCAG criterion", "Every dynamic state is announced correctly"], "Markup validation cannot test every interaction or user-facing barrier."),
        ],
    ),
    (
        "4.1.2 Name, Role, Value",
        "Identify and test programmatic names, roles, states, and values of interface components, and implement accessible native or custom controls that expose updates to assistive technology.",
        [
            ("Learning objectives", ["Describe accessible names, roles, values, and states; choose native HTML controls when appropriate; and test whether custom components expose their state and updates to assistive technologies. WCAG 2.2 4.1.2 is Level A: https://www.w3.org/TR/WCAG22/#name-role-value."]),
            ("How interfaces communicate with assistive technology", ["A control's accessible name identifies its purpose, its role identifies its type, and its value and states describe its current condition. For example, a screen reader user needs to know that a control is a button named 'Show details' and whether its associated section is expanded. These properties must be programmatically determinable, so software can obtain them without relying on color or visual position.", "When a user can change a state or value, the component needs to expose the change to user agents and assistive technology. This is not the same as merely changing text or a CSS class on screen; the accessibility information must also reflect the updated state." ]),
            ("Start with native controls", ["A native button with clear text, a labeled input, or a checkbox used according to its HTML specification supplies useful semantics and interaction behavior. For example, a button with visible text 'Save changes' normally has both an accessible name and button role. An input needs an associated label describing the expected value. Inspect the actual computed name because labels, aria-label, and other naming mechanisms can interact.", "Native markup is not a complete accessibility guarantee. A disabled button, confusing label, hidden error, or inaccessible workflow can still create a barrier. Test keyboard interaction and the complete task as well as the accessibility properties." ]),
            ("Custom controls and changing state", ["When a native element cannot meet the design need, expose the correct role, name, state, and value using appropriate semantics and implement the expected keyboard behavior. For a disclosure button, update aria-expanded between false and true as its panel closes and opens. The visual display and exposed state must stay synchronized. A visually clickable div with no name, role, keyboard support, or state is not an equivalent button.", "ARIA does not add behavior by itself. A custom checkbox must respond to keyboard input, update its checked state, and expose that state using a suitable role and aria-checked. Do not add a conflicting ARIA role or state to a native control. Follow the applicable design pattern and test in the browser accessibility tree and with real assistive technology." ]),
            ("Test the full interaction", ["Inspect a control before interaction and record its computed name, role, and state or value. Operate it with keyboard, then verify that the visible state and accessibility tree agree. Test representative browser and assistive technology combinations for announcements; an automated audit can find some missing properties but cannot prove a custom widget behaves correctly in all relevant states." ]),
            ("Required practical activity", ["Build a disclosure using a native button named 'Show details', an associated panel, and aria-expanded. Inspect its accessible name, role, and state while closed. Activate it by keyboard, verify the panel becomes visible and aria-expanded changes to true, then close and verify false. Record any mismatch between the visible state and exposed state, fix it, and test with a screen reader if available. Complete the mini-assessment after this activity."]),
            ("Key takeaways", ["Expose meaningful names, roles, states, and values; keep changes synchronized; prefer native controls; and test the interaction, not only the initial markup."]),
        ],
        [
            ("A button shows or hides details. What must reflect whether its panel is open?", "Its programmatically exposed expanded state", ["Only its background color", "Only the panel's position on screen", "The page title"], "The control's exposed state should update with the visible panel."),
            ("Which implementation is the best starting point for an ordinary action?", "A native button with a meaningful name", ["A clickable div with no semantics", "An image with no alternative text", "A paragraph styled to look like a button"], "Native buttons provide built-in semantics and interaction when used correctly."),
            ("What does adding ARIA to a custom control do?", "It can expose semantics but does not implement keyboard behavior", ["It automatically implements every interaction", "It replaces all browser and assistive technology testing", "It always makes a control conformant"], "The author must implement and test behavior as well as semantics."),
        ],
    ),
    (
        "4.1.3 Status Messages",
        "Recognize status messages and expose appropriate changes to assistive technologies without moving focus, using suitable live-region semantics and practical testing.",
        [
            ("Learning objectives", ["Identify status messages under WCAG 2.2 4.1.3, select suitable status or alert semantics, and test announcement of dynamic updates without unnecessarily moving keyboard focus. This criterion is Level AA: https://www.w3.org/TR/WCAG22/#status-messages."]),
            ("What is a status message?", ["A status message reports the result or progress of an action, waiting state, or error without taking focus. Examples include 'Search returned 12 results', 'Saving...', 'Changes saved', and an error summary shown after a failed submission. A user who cannot see a change elsewhere on the page needs a way to learn about it while staying at their current place.", "Not every changed text node is a status message. Content that receives focus as part of a deliberate navigation or an opened dialog is handled differently. Identify what the update communicates, whether it changes context, and which other criteria may apply." ]),
            ("Choose a suitable live region", ["A polite live region can announce non-urgent updates when assistive technology is ready. For example, a persistent element with role='status' can contain 'Changes saved' after a save completes. Use an appropriate assertive alert for important errors requiring prompt attention; excessive assertive announcements can interrupt users and hide other information.", "Prefer a live-region container that exists before its content changes. Update the text in that existing container, and test the behavior in relevant browser and assistive technology combinations. Simply adding a message visually, or adding a live-region attribute after an update, may not reliably produce an announcement. Different combinations can vary, so verify rather than assuming." ]),
            ("Focus and content design", ["A status message should be programmatically available without receiving focus. Do not move focus to a routine success message just to force an announcement. For an error workflow, choose a focus strategy appropriate to the task and related requirements; 4.1.3 does not prohibit moving focus in every circumstance. A dialog or other change of context has different behavior.", "Write concise, meaningful messages that identify the result and any useful next step. An error such as 'Email address is required' is more useful than 'Error'. Avoid announcing every keystroke or repeating the same update unnecessarily. Dynamic content, focus management, instructions, and error identification may also involve other criteria." ]),
            ("Testing a dynamic update", ["Keep focus on the search button or input, trigger a search, and listen for a concise result count announced through the live region. Repeat for zero results and a later search. Confirm that the visible message matches the announced text, focus remains usable, and repeated or stale announcements do not obscure the workflow. Automated tooling alone cannot reliably confirm a user's experience of timing and interruption." ]),
            ("Required practical activity", ["Create a search form and an initially empty persistent element with role='status'. After submission, update that element with either '3 results found' or 'No results found'. Keep focus on the form, trigger both outcomes with a keyboard, and verify the accessibility tree and a screen reader announcement where available. Record the outcome and refine wording or timing if the message is missing or duplicated. Complete the mini-assessment after this activity."]),
            ("Key takeaways", ["Expose relevant status updates through suitable semantics without requiring focus, distinguish routine updates from urgent alerts, and test actual dynamic behavior."]),
        ],
        [
            ("A search updates a result count without moving focus. What helps announce the change?", "Update a persistent polite status region", ["Change only a decorative icon", "Move focus to the page header on every search", "Remove the result count"], "A status region can expose routine result updates without receiving focus."),
            ("When is an assertive alert most appropriate?", "When an important error needs prompt attention", ["For every letter typed into a search box", "For routine background updates every second", "For decorative changes"], "Assertive announcements interrupt and should be used for important messages."),
            ("How should you verify a dynamic status message?", "Trigger the update and test its announcement while tracking focus", ["Inspect only the initial static page", "Check only its color", "Assume any visible message is announced"], "Testing the changed content and actual assistive technology behavior matters."),
        ],
    ),
]

additional_sections = {
    "4.1.1 Parsing (Obsolete and removed)": [
        ("Worked example: duplicate identifiers", [
            "A registration form asks for an email address and a phone number. Both input elements accidentally have id='contact', and their visible labels each use for='contact'. The first input may receive the label association while the second has no reliable accessible name. Visually the form appears understandable, but a person navigating from control to control may hear an incomplete or misleading name.",
            "Begin by identifying each input in browser developer tools and inspecting its computed accessible name. Activate each visible label and observe which input receives focus. A markup validator can point to the duplicate, but the behavior and accessibility tree show why it matters. Correct the example by assigning id='email' and id='phone' and matching each label's for attribute to the intended input. Reinspect the names and activate each label again.",
            "When documenting the issue, describe the actual effect and cite the applicable current criterion instead of claiming that duplicate identifiers inherently fail the removed 4.1.1 criterion. A broken association can be relevant to information and relationships or to a control's accessible name, depending on the implementation and effect. Record the browser, assistive technology, and steps that reproduce the barrier."
        ]),
        ("Worked example: malformed nesting", [
            "Suppose an author places a link inside a button so that one visual area seems to perform two actions. A validator may flag invalid interactive nesting. Browsers can repair malformed HTML in different ways, leaving the resulting document structure unlike the source the author intended. Keyboard and assistive technology users may encounter a different sequence of controls or an unclear action.",
            "First establish whether the user is navigating to a destination or submitting an action. Use a link for navigation and a button for an action, and present separate controls when both are needed. Inspect the browser's rendered DOM and accessibility tree, then use the keyboard to confirm that each control can be reached and activated independently. The diagnostic finding is an opportunity to investigate real barriers; identify any failure using the current criterion that the observed behavior actually violates."
        ]),
        ("A practical investigation workflow", [
            "Start with a specific task: for example, a learner is trying to submit their contact details. Record the intended sequence and compare what is displayed with what is exposed to assistive technology. Check labels, relationship targets, focus order, and interactive elements rather than treating a validator's count of errors as a complete accessibility result.",
            "Run an automated markup check to discover suspicious structures, then inspect each relevant finding in context. Some reported markup defects may have no accessibility effect in the tested interface; others can hide important information or make a control unusable. A manually observed barrier still matters even when the page passes a markup validator.",
            "After fixing a defect, repeat the original user task and retest with appropriate assistive technology. Report remaining uncertainty, because one browser and one screen reader cannot establish universal compatibility. The goal is reliable user-facing behavior backed by evidence, not an artificial score based on the former criterion."
        ]),
        ("Reflect and apply", [
            "Consider two defects: a duplicate id that causes two labels to target the same input, and a duplicate id that is never referenced and produces no observed effect. Which needs immediate user-facing remediation, and what further tests would you conduct? Both deserve engineering attention, but a WCAG failure should be tied to an applicable requirement and a real impact, not to the removed parsing criterion alone.",
            "Version-specific reporting also matters during an audit. If a customer asks for a WCAG 2.2 assessment, state that 4.1.1 is removed and evaluate the experience against current requirements. If a different standard or version applies, check that standard explicitly rather than assuming the same conformance rules."
        ]),
    ],
    "4.1.2 Name, Role, Value": [
        ("Worked example: a disclosure", [
            "A course page has a 'Show learning objectives' control. The first implementation is a clickable div with a chevron image; JavaScript changes the panel's display, but the div has no accessible name or button role and cannot be activated from the keyboard. The open state is visible because the chevron rotates, yet no programmatic state is exposed. A screen reader user cannot reliably discover what the control does or whether it is expanded.",
            "Replace the div with a button whose text identifies the action. Give it aria-expanded='false' when the panel is hidden, and set the attribute to 'true' when the panel opens. Use an appropriate relationship such as aria-controls if useful for the design, and ensure the referenced panel id is unique. The native button provides expected keyboard activation, while the script synchronizes the exposed expanded state and visible panel.",
            "Inspect the accessibility tree before and after activating the button. Record the button's accessible name, role, and expanded state at each step, and test with keyboard and a screen reader. If the panel opens but aria-expanded remains false, the user receives conflicting information. Correct the state update and repeat the interaction, including closing the panel."
        ]),
        ("Worked example: custom checkbox", [
            "A custom preferences widget displays a square and label 'Receive reminders'. A mouse click adds a checkmark but the component is built from a generic div. A checkmark alone is visual; it does not expose a checkbox role or checked state. A native input type='checkbox' with an associated label is usually the simplest starting point and provides programmatic checked state and keyboard behavior.",
            "If a custom implementation is truly necessary, ensure it has a determinable name, a checkbox role, a synchronized aria-checked state, and the expected keyboard interaction. Update the value both when the user acts and when application state changes elsewhere. Test checked, unchecked, and disabled conditions as applicable, including a screen-reader announcement of the changed state. Do not assume that adding role='checkbox' automatically implements the interaction."
        ]),
        ("Names and values in context", [
            "Accessible names should help a person distinguish controls. Three buttons all named 'Edit' can be ambiguous in a list of courses. A meaningful contextual name such as 'Edit Perceivable lesson' can communicate which item is affected, while remaining consistent with any visible label. The computed name can be affected by aria-label, aria-labelledby, associated labels, and text content, so inspect what is actually exposed instead of guessing from the DOM.",
            "Values also matter. For a volume slider, expose the current value and valid range using the appropriate native input or custom slider semantics; a numeric value without understandable context can be confusing. When a user changes the slider using the keyboard or another input method, the visible and programmatically exposed values must remain synchronized. Related requirements about keyboard use, focus, and labels still apply."
        ]),
        ("Debugging checklist and reflection", [
            "For each control, ask: What is its purpose? What role is exposed? What state or value is available before interaction? Can the person change the value through the supported interaction? What state is exposed afterward? Can assistive technology receive the change? Compare the answers with what a sighted mouse user sees and does.",
            "Consider a button that opens a menu. If the visible label says 'Options' but the accessibility tree exposes only 'button', a useful name is missing. If it exposes 'Options, expanded' after the menu has closed, the state is stale. Repair each problem at its source and retest rather than masking it with an unrelated announcement."
        ]),
    ],
    "4.1.3 Status Messages": [
        ("Worked example: search results", [
            "A learner enters 'contrast' and activates Search. The results list changes, and a sentence above it becomes '8 results found'. The input retains focus. A sighted user can notice the change, but a screen reader user may continue at the input without knowing a new result count is available. The message conveys the outcome of an action and is a candidate status message.",
            "Place an initially empty status element in the page before the search runs, and update its text when results arrive. A native element with role='status' is a common polite live-region pattern. Ensure the text reflects the actual completed request, such as '8 results found' or 'No results found'. Leave focus where the user's workflow expects it; the status announcement does not require focus.",
            "Test repeated searches as well as the first. Trigger a second query with a different count and verify that the updated message is announced and matches the visible results. Check a slow request, no results, and an error. Avoid repeatedly announcing a loading message while the user types, and prevent an older response from announcing a stale count after a newer search completes."
        ]),
        ("Worked example: save and error feedback", [
            "An editor has a Save button. A successful save displays 'Changes saved', while a failed save displays 'Could not save. Check your connection and try again.' Both outcomes can appear without moving focus. A polite status is appropriate for the routine success; an urgent failure may warrant alert semantics when prompt attention is needed. Decide based on impact, not because a louder announcement sounds more noticeable.",
            "The message should explain the result and a sensible next action. Showing only a red icon or the word 'Error' leaves important information unclear. Confirm that the announcement reflects the result that actually occurred, that it is not duplicated by multiple live regions, and that the person can still continue working. If the save failure triggers a dialog or focus is intentionally moved to an error summary, analyze that workflow separately and apply its related requirements."
        ]),
        ("Implementation details that affect reliability", [
            "The live region generally needs to be present before its text changes. Assistive technology observes changes to content exposed through accessibility APIs, and implementation timing can vary across browser and screen reader combinations. An element inserted with both role and final text at the same moment may be missed in some environments. A persistent region updated after creation is a practical pattern, not a substitute for testing.",
            "Use a single coherent message rather than fragmented updates when possible. If an application rapidly replaces 'Searching' with '8 results found', check which announcement a person receives. Provide information in the page as well as through the status region, and avoid hiding essential instructions inside a transient notification. Semantics must align with the message's urgency and should not overwhelm other content."
        ]),
        ("Differentiate status from navigation", [
            "A message announcing 'Item added to cart' while focus remains on Add is a status message. Opening the cart as a dialog and moving focus into it is a change of context and requires a different focus and dialog strategy. A form validation error may include a status message, individual field errors, or an error summary; decide what each part communicates and apply the other relevant requirements as well.",
            "During review, document the trigger, expected message, focus location, assistive technology and browser used, and observed announcement. Ask whether a user can discover the result without finding the changed region manually. If the message is delayed, missing, duplicated, or interrupts vital content, revise the implementation and repeat the task."
        ]),
    ],
}

additional_questions = {
    "4.1.1 Parsing (Obsolete and removed)": [
        ("A validator reports a duplicate ID that has no demonstrated impact. What is the best next step?", "Investigate whether it affects relationships or user experience under current criteria", ["Automatically report a WCAG 2.2 4.1.1 failure", "Assume the entire site conforms", "Ignore all markup diagnostics"], "A finding needs context and evaluation against applicable current requirements."),
        ("A malformed interactive structure behaves differently after browser parsing. What should you inspect?", "The rendered DOM, accessibility tree, and actual interaction", ["Only the screenshot", "Only the color palette", "Whether the file name ends in HTML"], "Browser repair can change the rendered structure; inspect behavior and exposed semantics."),
    ],
    "4.1.2 Name, Role, Value": [
        ("A disclosure's visible panel closes but aria-expanded remains true. What is wrong?", "The programmatic state conflicts with the visible state", ["The control has too many visible labels", "The page needs a status alert for every click", "The control is automatically correct if it looks closed"], "The exposed state must reflect the current component state."),
        ("A custom checkbox uses role='checkbox'. What else must its author provide?", "A name, synchronized checked state, and appropriate interaction", ["Only a background image", "Only a mouse pointer", "No further behavior because ARIA adds it"], "ARIA semantics do not implement interaction or maintain state automatically."),
    ],
    "4.1.3 Status Messages": [
        ("A routine save succeeds. Which message is most useful?", "Changes saved", ["A color change alone", "An assertive alert on every keystroke", "An unrelated page title"], "A concise status confirms the result without unnecessary interruption."),
        ("What is a useful way to improve reliability of a live region?", "Create the region before updating its content and test it", ["Insert and remove many competing regions", "Assume every visual update is announced", "Move focus on every routine update"], "A persistent live region is a practical pattern, but behavior must still be tested."),
    ],
}

lessons = []
for title, objective, sections, questions in lessons_data:
    activity_index = next(i for i, (heading, _) in enumerate(sections) if heading == "Required practical activity")
    expanded_sections = sections[:activity_index] + additional_sections[title] + sections[activity_index:]
    lessons.append({"title": title, "objective": objective, "content": document(title, expanded_sections), "assessment": assessment(f"{title} mini-assessment", questions + additional_questions[title])})

pre_questions = [lessons_data[0][3][0], lessons_data[1][3][1], lessons_data[1][3][0], lessons_data[2][3][0], lessons_data[2][3][1]]
post_questions = [lessons_data[0][3][1], lessons_data[0][3][2], lessons_data[1][3][2], lessons_data[2][3][2], lessons_data[2][3][0]]
result = {"principle": "Robust", "lessons": lessons, "pre": assessment("Robust pre-assessment", pre_questions), "post": assessment("Robust post-assessment", post_questions)}
Path(__file__).with_name("robust.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
