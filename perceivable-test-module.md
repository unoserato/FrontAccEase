# Perceivable test module: WCAG 2.2 guidelines 1.1–1.3

This sample covers selected success criteria in three guidelines; it is not a complete WCAG conformance course. Reference: [WCAG 2.2](https://www.w3.org/TR/WCAG22/#perceivable).

## Lesson 1: Text alternatives (1.1.1)

**Objectives:** Select useful alternatives for informative images; distinguish informative, functional, and decorative images.

Text alternatives make information available to people who cannot see an image and can be presented as speech, braille, or enlarged text. The alternative should communicate the image's purpose in its context. A product photograph may need a concise description of the product, while a chart needs the trend and important values available in nearby text or a longer description.

For an image used as a button, the accessible name should describe the action, such as “Search,” rather than the icon's appearance. An image that is purely decorative can use an empty alternative (`alt=""`) so it is ignored by assistive technology. Do not use an empty alternative for an image that communicates information or performs an action.

Example: `<img src="search.svg" alt="">` inside a button with the accessible name “Search” avoids repeating the button's name. For a chart, provide a concise label and equivalent information in a nearby table or text.

**Scenario:** A submit button contains only a picture of a magnifying glass. What is the best accessible name? Choices: “Magnifying glass”; “Search”; empty; “Image”. **Correct:** Search. **Feedback:** The name should communicate what the control does.

**Mini-assessment:**

1. What alternative is generally appropriate for a purely decorative image? A description of its colors / **An empty alt attribute** / The filename / No image element. Feedback: Empty alt indicates that the image adds no information.
2. A complex chart communicates important values. What should be provided? **A text or table equivalent of the relevant information** / Only “chart” as alt text / Only a different color / A caption that says “image.” Feedback: A short label alone may not convey the chart's data.

## Lesson 2: Time-based media (1.2)

**Objectives:** Identify suitable alternatives for prerecorded media and distinguish captions from audio description.

Prerecorded audio-only content generally needs a text alternative that conveys equivalent information. Prerecorded video-only content generally needs an equivalent text alternative or audio track. Exceptions apply when the media is itself an alternative for text and is clearly labeled as such (1.2.1).

Captions for prerecorded synchronized media (1.2.2) convey speech and relevant audio information, such as meaningful sound effects and speaker identity. They help users who cannot hear the audio. Automated captions should be reviewed and corrected.

When important information is presented visually but not in the main audio, audio description or an appropriate media alternative is needed for prerecorded synchronized media under 1.2.3; 1.2.5 requires audio description for Level AA. Captions and audio description address different information. Live captions (1.2.4) are a separate Level AA requirement.

**Scenario:** A prerecorded tutorial says “choose this option,” while the video silently highlights the correct menu item. Which addition addresses the missing visual information? Choices: captions only; **audio description identifying the menu item**; an unrelated soundtrack; a higher video resolution. **Feedback:** Audio description communicates meaningful visual action not present in the main audio.

**Mini-assessment:**

1. What should prerecorded captions include? **Speech and meaningful sound information** / Only the title / Only spoken words with no relevant sound cues / Only visuals. Feedback: Relevant non-speech audio can be necessary to understand the content.
2. Which alternative can make a prerecorded audio-only interview accessible? **An equivalent text transcript** / A decorative image / A larger video player / A color change. Feedback: An equivalent transcript communicates the interview's information in text.

## Lesson 3: Adaptable content (1.3)

**Objectives:** Identify semantic structure, meaningful reading order, and instructions that do not rely on sensory characteristics.

Information and relationships conveyed visually should also be available programmatically or in text (1.3.1). Use semantic headings, lists, table headers, and explicit form labels instead of relying only on visual styling. For example, associate `<label for="email">Email</label>` with `<input id="email" type="email" autocomplete="email">`.

When order affects meaning, the programmatic reading order must preserve a correct sequence (1.3.2). Check keyboard and screen reader order when CSS rearranges content. Instructions must not rely solely on shape, color, location, orientation, or sound (1.3.3): use “Select Continue” rather than only “Select the button on the right.”

For Level AA, do not restrict content to a single display orientation unless it is essential (1.3.4). For inputs collecting information about the user, identify applicable input purposes programmatically, for example with supported HTML autocomplete tokens (1.3.5).

**Scenario:** A form shows “Required fields are marked in red” without any other indicator. Which change helps communicate the instruction? Choices: make the red darker; **add a text label such as “required” and associate it with each required field**; move all fields to the right; play a sound. **Feedback:** Information must not depend solely on sensory presentation; identify required fields in text and programmatically.

**Mini-assessment:**

1. Which markup communicates a page heading's role? **A semantic heading element such as h2** / A bold div alone / A larger font alone / A colored border. Feedback: A heading element exposes structure to assistive technology.
2. Which instruction avoids relying only on location? **“Select the Continue button.”** / “Select the button on the right.” / “Select the round button.” / “Select the red one.” Feedback: A named control can be identified without relying only on a sensory characteristic.

## Pre-assessment

1. What is the main purpose of alternative text on an informative image? **Communicate its information or purpose** / Repeat its filename / Describe every visual detail regardless of context / Replace all nearby text. Feedback: Useful alternatives communicate the image's purpose in context.
2. What do captions primarily provide? **Speech and relevant audio information in text** / A description of every visual action / A replacement for page headings / A keyboard shortcut. Feedback: Captions communicate relevant audio information.
3. Which supports programmatic form relationships? **Associating a label with its input** / Placing a colored box near the field / Adding spaces before a field / Using a placeholder alone as a label. Feedback: A programmatic label association exposes the relationship.

## Post-assessment

1. An icon-only button opens search. Which accessible name is most useful? **Search** / Image / Magnifying glass shape / Button 1. Feedback: The accessible name should describe the control's purpose.
2. A narrated video shows an important silent action. What makes the visual action available to someone who cannot see it? **Audio description** / Captions alone / Louder narration / A decorative image. Feedback: Audio description communicates important visual information.
3. A visually styled heading is a plain div. Which change exposes its structure? **Use an appropriate heading element** / Make it larger / Change its color / Center it. Feedback: Semantic headings communicate the relationship programmatically.
4. Which instruction supports users who cannot identify a control by position? **“Select Save.”** / “Select the button on the right.” / “Select the circle.” / “Select the green item.” Feedback: Naming the control avoids relying only on location or appearance.
