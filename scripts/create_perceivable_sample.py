"""Replace the specifically inspected Perceivable test draft with sample content.

Run from the backend project with its configured service-role connection.
This is a one-off fixture, not a migration and not a publishing operation.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path.cwd() / "app"))
from services.pourService import get_admin_curriculum, execute_activity_rpc, validate_draft
from services.pour_validation import validate_assessment


def rpc(name, **args):
    return execute_activity_rpc(name, args)


def doc(*paragraphs):
    return {"type": "doc", "content": [
        {"type": "paragraph", "content": [{"type": "text", "text": text}]} for text in paragraphs
    ]}


def quiz(items):
    questions, key, explanations = [], {}, {}
    for index, (title, choices, answer, feedback) in enumerate(items, 1):
        name = f"q{index}"
        questions.append({"name": name, "title": title, "type": "radiogroup", "isRequired": True, "choices": choices})
        key[name] = answer
        explanations[name] = feedback
    result = {"questions": {"pages": [{"name": "page1", "elements": questions}]},
              "answer_key": key, "explanations": explanations, "passing_percent": 70, "max_attempts": 3}
    errors = validate_assessment(result)
    if errors:
        raise ValueError(errors)
    return result


lessons = [
    {
        "title": "1.1 Text alternatives",
        "description": "Provide appropriate text alternatives for non-text content.",
        "objectives": ["Choose text alternatives that convey an image's purpose.", "Distinguish informative, functional, and decorative images."],
        "criteria": ["1.1.1"],
        "paragraphs": [
            "Text alternatives make information available as speech, braille, or enlarged text. Describe an informative image's purpose in context. A chart may need a concise label and a nearby table or longer description conveying its important data.",
            "For an image used as a control, give the control a name that describes the action, such as Search. A purely decorative image can use alt=\"\" so assistive technology skips it. Do not use an empty alternative for an image that conveys information.",
            "Example: a search icon inside a button named Search can have an empty alt attribute to avoid repeating the name. A data chart should also provide its meaningful values and trends in text or a table."
        ],
        "scenario": ("Name the search control", "A button contains only a magnifying-glass icon. Which accessible name is most useful?", ["Magnifying glass", "Search", "Image", "Button"], "Search", "A control's accessible name should describe its action."),
        "mini": [
            ("What alternative is appropriate for a purely decorative image?", ["An empty alt attribute", "Its file name", "A detailed color description", "No image element"], "An empty alt attribute", "Empty alt indicates that the image adds no information."),
            ("How should important values in a complex chart be made available?", ["Provide equivalent data in text or a table", "Use only the word chart", "Change the chart color", "Use a larger image"], "Provide equivalent data in text or a table", "A concise label alone may not communicate the chart's data.")
        ]
    },
    {
        "title": "1.2 Time-based media",
        "description": "Provide captions, transcripts, and descriptions appropriate to the media.",
        "objectives": ["Identify an alternative for prerecorded audio.", "Distinguish captions from audio description."],
        "criteria": ["1.2.1", "1.2.2", "1.2.3", "1.2.4", "1.2.5"],
        "paragraphs": [
            "Prerecorded audio-only content generally needs an equivalent text alternative. Prerecorded video-only content generally needs an equivalent text alternative or audio track. Exceptions apply where media is an identified alternative for text.",
            "Captions for prerecorded synchronized media convey speech and relevant sound information, including meaningful sound effects and speaker identity. Review automatic captions for accuracy. Live captions are a separate Level AA requirement.",
            "Audio description communicates important visual information missing from the main audio. WCAG 1.2.3 permits audio description or an appropriate media alternative; 1.2.5 requires audio description for prerecorded synchronized media at Level AA."
        ],
        "scenario": ("Describe visual information", "A recorded tutorial says 'choose this option' while silently highlighting a menu item. What addresses the missing visual information?", ["Captions only", "Audio description identifying the menu item", "An unrelated soundtrack", "Higher video resolution"], "Audio description identifying the menu item", "Audio description communicates meaningful visual information missing from the main audio."),
        "mini": [
            ("What should prerecorded captions include?", ["Speech and meaningful sound information", "Only the title", "Only visuals", "An unrelated summary"], "Speech and meaningful sound information", "Relevant non-speech audio can be necessary for understanding."),
            ("Which alternative can make a prerecorded audio-only interview accessible?", ["An equivalent text transcript", "A decorative image", "A larger media player", "A different background color"], "An equivalent text transcript", "A transcript communicates the interview's information in text.")
        ]
    },
    {
        "title": "1.3 Adaptable content",
        "description": "Preserve structure, sequence, and instructions across different presentations.",
        "objectives": ["Identify semantic headings and form labels.", "Preserve meaningful sequence and avoid sensory-only instructions."],
        "criteria": ["1.3.1", "1.3.2", "1.3.3", "1.3.4", "1.3.5"],
        "paragraphs": [
            "Information and relationships conveyed visually must also be programmatically determinable or available in text. Use semantic headings, lists, table headers, and associated form labels rather than relying only on visual styling.",
            "When sequence affects meaning, preserve a correct programmatic reading order. Check keyboard and screen-reader order when CSS rearranges content. Instructions must not rely solely on shape, color, position, orientation, or sound: use 'Select Continue' instead of only 'Select the button on the right.'",
            "At Level AA, do not restrict display orientation unless essential. For fields collecting information about the user, identify applicable input purposes programmatically, for example with supported HTML autocomplete tokens."
        ],
        "scenario": ("Identify required fields", "A form says required fields are red but provides no other indicator. What should the team add?", ["A darker red", "A text label and programmatic indication for each required field", "A sound only", "A right-aligned layout"], "A text label and programmatic indication for each required field", "Information about required fields should not depend only on sensory presentation."),
        "mini": [
            ("Which markup communicates a heading's role?", ["A semantic heading element", "A bold div alone", "A larger font alone", "A colored border"], "A semantic heading element", "Semantic headings expose structure to assistive technology."),
            ("Which instruction avoids relying only on location?", ["Select the Continue button", "Select the button on the right", "Select the round button", "Select the red one"], "Select the Continue button", "Naming the control avoids relying only on a sensory characteristic.")
        ]
    }
]

pre = [
    ("What is the purpose of alternative text on an informative image?", ["Communicate its information or purpose", "Repeat its filename", "Describe every visual detail regardless of context", "Replace all nearby text"], "Communicate its information or purpose", "Useful alternatives communicate the image's purpose in context."),
    ("What do captions primarily provide?", ["Speech and relevant audio information in text", "Descriptions of every visual action", "A replacement for page headings", "A keyboard shortcut"], "Speech and relevant audio information in text", "Captions communicate relevant audio information."),
    ("Which supports programmatic form relationships?", ["Associating a label with its input", "Placing a colored box near the field", "Adding spaces before the field", "Using a placeholder alone as a label"], "Associating a label with its input", "An associated label exposes the relationship.")
]
post = [
    ("An icon-only button opens search. Which accessible name is most useful?", ["Search", "Image", "Magnifying glass shape", "Button 1"], "Search", "The name should describe the control's purpose."),
    ("A narrated video shows an important silent action. What makes the action available to someone who cannot see it?", ["Audio description", "Captions alone", "Louder narration", "A decorative image"], "Audio description", "Audio description communicates important visual information."),
    ("A visually styled heading is a plain div. What exposes its structure?", ["Use an appropriate heading element", "Make it larger", "Change its color", "Center it"], "Use an appropriate heading element", "Semantic headings communicate structure programmatically."),
    ("Which instruction avoids relying only on location?", ["Select Save", "Select the button on the right", "Select the circle", "Select the green item"], "Select Save", "Naming the control avoids relying only on a sensory characteristic.")
]


def main():
    principle = next(item for item in get_admin_curriculum() if item["code"] == "perceivable")
    drafts = [item for item in principle["revisions"] if item["status"] == "draft"]
    if len(drafts) != 1:
        raise RuntimeError("Expected exactly one existing draft; no changes made.")
    revision = drafts[0]["id"]
    snapshot = rpc("pour_draft_snapshot", p_revision=revision)
    if (len(snapshot["lessons"]) != 1 or snapshot["lessons"][0]["title"] != "vcbn mbnvvbmnmbvjnmb,jnhjkllhijjhkl,m"
            or len(snapshot["activities"]) != 2 or len(snapshot["assessments"]) != 1):
        raise RuntimeError("The draft changed since inspection; no changes made.")
    for items in [pre, post, *(lesson["mini"] for lesson in lessons)]:
        quiz(items)
    rpc("pour_delete_assessment", p_revision=revision, p_activity=snapshot["assessments"][0]["activity_id"])
    rpc("pour_delete_lesson", p_revision=revision, p_lesson=snapshot["lessons"][0]["id"])
    revision_row = rpc("pour_draft_snapshot", p_revision=revision)["revision"]
    rpc("pour_update_draft", p_revision=revision, p_expected=revision_row, p_changes={
        "title": "Perceivable: WCAG 1.1–1.3",
        "description": "A test learning path covering text alternatives, time-based media, and adaptable content.",
        "introduction": doc("Perceivable information can be presented in ways users can access. This test module covers selected WCAG 2.2 success criteria in guidelines 1.1 through 1.3."),
        "learning_objectives": ["Select appropriate text alternatives.", "Identify suitable alternatives for time-based media.", "Apply semantic structure and accessible instructions."]
    })

    def add_assessment(kind, lesson_id, items):
        created = rpc("pour_create_assessment", p_revision=revision, p_kind=kind, p_lesson=lesson_id)
        rpc("pour_save_assessment", p_revision=revision, p_activity=created["activity"]["id"], p_expected=created["assessment"], p_changes=quiz(items))

    add_assessment("pre", None, pre)
    for lesson in lessons:
        row = rpc("pour_create_lesson", p_revision=revision, p_title=lesson["title"])
        rpc("pour_update_lesson", p_revision=revision, p_lesson=row["id"], p_expected=row, p_changes={
            "title": lesson["title"], "description": lesson["description"], "content": doc(*lesson["paragraphs"]),
            "learning_objectives": lesson["objectives"], "wcag_criteria": lesson["criteria"]
        })
        add_assessment("mini", row["id"], lesson["mini"])
        title, prompt, options, answer, feedback = lesson["scenario"]
        content = {"prompt": prompt, "choices": [{"value": str(i), "label": option} for i, option in enumerate(options)],
                   "correct_choice": str(options.index(answer)), "explanation": feedback}
        rpc("pour_save_scenario", p_revision=revision, p_activity=None, p_lesson=row["id"], p_title=title, p_content=content, p_expected=None)
    add_assessment("post", None, post)
    _, errors = validate_draft(revision)
    print("Revision:", revision)
    print("Created 3 lessons, 3 scenarios, 3 mini-assessments, a pre-assessment, and a post-assessment.")
    print("Publication validation:", "passed" if not errors else errors)
    print("Status: draft (not published).")


if __name__ == "__main__":
    main()
