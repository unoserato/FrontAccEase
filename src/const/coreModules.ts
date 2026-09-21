import { Brain, Code, Eye, Keyboard } from "lucide-react"
import type { CoreModulesProps } from "./materialsProps"

export const coreModules: CoreModulesProps[] = [
  {
    id: "perceivable",
    principle: "Perceivable",
    description:
      "Information and user interface components must be presentable to users in ways they can perceive.",
    topics: [
      {
        id: "topic-1-1",
        name: "1.1 Text Alternatives",
        description:
          "Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.",
        lessons: [
          {
            id: "lesson-1-1-1",
            name: "1.1.1 Non-Text Content",
            description:
              "All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    {
                      type: "text",
                      text: "Understanding 1.1.1 Non-text Content",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "The intent of this Success Criterion is to make information conveyed by non-text content accessible through the use of a text alternative. Text alternatives are a primary way to make information accessible because they can be rendered through any sensory modality (for example, visual, auditory or tactile).",
                    },
                  ],
                },
                {
                  type: "heading",
                  attrs: { level: 3 },
                  content: [{ type: "text", text: "Key Requirements" }],
                },
                {
                  type: "bulletList",
                  content: [
                    {
                      type: "listItem",
                      content: [
                        {
                          type: "paragraph",
                          content: [
                            {
                              type: "text",
                              marks: [{ type: "bold" }],
                              text: "Controls & Input: ",
                            },
                            {
                              type: "text",
                              text: "Controls and inputs have a name describing their purpose.",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: "listItem",
                      content: [
                        {
                          type: "paragraph",
                          content: [
                            {
                              type: "text",
                              marks: [{ type: "bold" }],
                              text: "Decorative Content: ",
                            },
                            {
                              type: "text",
                              text: "Purely decorative content is implemented so that it can be ignored by assistive technology.",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
        ],
      },
      {
        id: "topic-1-2",
        name: "1.2 Time-based Media",
        description: "Provide alternatives for time-based media.",
        lessons: [
          {
            id: "lesson-1-2-1",
            name: "1.2.1 Audio-only and Video-only",
            description:
              "For prerecorded audio-only and prerecorded video-only media, alternatives are provided.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    {
                      type: "text",
                      text: "1.2.1 Audio-only and Video-only (Prerecorded)",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Provide an alternative for time-based media that presents equivalent information for prerecorded audio-only content such as podcasts or recorded speeches.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-1-2-2",
            name: "1.2.2 Captions (Prerecorded)",
            description:
              "Captions are provided for all prerecorded audio content in synchronized media.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "1.2.2 Captions (Prerecorded)" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Ensure synchronized captions exist for video content containing spoken audio so deaf or hard-of-hearing users can comprehend it.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-1-2-3",
            name: "1.2.3 Audio Description or Media Alternative",
            description:
              "An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    {
                      type: "text",
                      text: "1.2.3 Audio Description or Media Alternative",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Provide an audio description or full text description of visual actions in prerecorded video content.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
        ],
      },
      {
        id: "topic-1-3",
        name: "1.3 Adaptable",
        description:
          "Create content that can be presented in different ways without losing information or structure.",
        lessons: [
          {
            id: "lesson-1-3-1",
            name: "1.3.1 Info and Relationships",
            description:
              "Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "1.3.1 Info and Relationships" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Use semantic HTML elements (headings, lists, tables, landmarks) so assistive technologies understand structural relationships.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-1-3-2",
            name: "1.3.2 Meaningful Sequence",
            description:
              "When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "1.3.2 Meaningful Reading Sequence" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Ensure DOM order matches visual reading order so screen reader linear navigation remains coherent.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-1-3-3",
            name: "1.3.3 Sensory Characteristics",
            description:
              "Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "1.3.3 Sensory Characteristics" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Do not rely exclusively on shape, size, visual location, or sound in instructions (e.g. avoid 'Click the green circle on the right').",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-1-3-4",
            name: "1.3.4 Orientation",
            description:
              "Content does not restrict its view and operation to a single display orientation, such as portrait or landscape.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "1.3.4 Display Orientation" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Support both portrait and landscape orientation without requiring users to rotate their mobile device.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-1-3-5",
            name: "1.3.5 Identify Input Purpose",
            description:
              "The purpose of each input field collecting information about the user can be programmatically determined.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "1.3.5 Identify Input Purpose" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Use appropriate autocomplete attributes on form inputs (e.g., autocomplete='given-name' or autocomplete='email').",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
        ],
      },
      {
        id: "topic-1-4",
        name: "1.4 Distinguishable",
        description:
          "Make it easier for users to see and hear content including separating foreground from background.",
        lessons: [
          {
            id: "lesson-1-4-1",
            name: "1.4.1 Use of Color",
            description:
              "Color is not used as the sole visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [{ type: "text", text: "1.4.1 Use of Color" }],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Combine color with text labels, icons, or patterns so color-blind users can differentiate status or link targets.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-1-4-2",
            name: "1.4.2 Audio Control",
            description:
              "If any audio on a Web page plays automatically for more than 3 seconds, a mechanism is available to pause or stop the audio.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [{ type: "text", text: "1.4.2 Audio Control" }],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Provide accessible controls to mute or pause auto-playing audio elements.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-1-4-3",
            name: "1.4.3 Contrast (Minimum)",
            description:
              "The visual presentation of text and images of text has a contrast ratio of at least 4.5:1.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "1.4.3 Minimum Color Contrast" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Ensure text has adequate contrast against its background so users with low vision or color vision deficiencies can read it easily.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-1-4-4",
            name: "1.4.4 Resize Text",
            description:
              "Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [{ type: "text", text: "1.4.4 Text Resizing" }],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Use relative font units (rem, em) so content scales cleanly when browser font zoom is increased to 200%.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-1-4-10",
            name: "1.4.10 Reflow",
            description:
              "Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [{ type: "text", text: "1.4.10 Responsive Reflow" }],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Support viewport widths down to 320px without forcing horizontal scrolling.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-1-4-11",
            name: "1.4.11 Non-text Contrast",
            description:
              "The visual presentation of user interface components and graphical objects has a contrast ratio of at least 3:1 against adjacent colors.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [{ type: "text", text: "1.4.11 Non-Text Contrast" }],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Ensure UI boundaries, focus rings, and essential chart icons maintain at least 3:1 contrast against nearby surfaces.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-1-4-12",
            name: "1.4.12 Text Spacing",
            description:
              "No loss of content or functionality occurs by setting line height, paragraph spacing, letter spacing, and word spacing.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "1.4.12 Text Spacing Support" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Avoid hardcoded line heights or fixed element heights that clip text when custom CSS spacing is applied by users.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-1-4-13",
            name: "1.4.13 Content on Hover or Focus",
            description:
              "Where receiving and then dismissing hover or focus triggers additional content to become visible and then hidden, mechanisms are available to dismiss or keep hoverable.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    {
                      type: "text",
                      text: "1.4.13 Tooltips & Popovers on Hover",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Ensure tooltips or popups revealed on hover/focus are dismissible with Escape and hoverable without vanishing immediately.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
        ],
      },
    ],
    icon: Eye,
  },
  {
    id: "operable",
    principle: "Operable",
    description: "User interface components and navigation must be operable.",
    topics: [
      {
        id: "topic-2-1",
        name: "2.1 Keyboard Accessible",
        description: "Make all functionality available from a keyboard.",
        lessons: [
          {
            id: "lesson-2-1-1",
            name: "2.1.1 Keyboard",
            description:
              "All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "2.1.1 Keyboard Operability" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Ensure every interactive control (buttons, links, form fields, modals) can be triggered using standard Tab, Shift+Tab, Enter, and Spacebar keystrokes.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-2-1-2",
            name: "2.1.2 No Keyboard Trap",
            description:
              "If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "2.1.2 Avoiding Keyboard Traps" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Prevent custom widgets or modal dialogs from trapping focus permanently without an accessible exit key like Escape.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-2-1-4",
            name: "2.1.4 Character Key Shortcuts",
            description:
              "If a keyboard shortcut is implemented in content using only letter, punctuation, number, or symbol characters, then a mechanism is available to turn it off or remap it.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "2.1.4 Single Character Shortcuts" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Allow single-letter hotkeys to be remapped or disabled so speech recognition users do not trigger accidental actions.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
        ],
      },
      {
        id: "topic-2-2",
        name: "2.2 Enough Time",
        description: "Provide users enough time to read and use content.",
        lessons: [
          {
            id: "lesson-2-2-1",
            name: "2.2.1 Timing Adjustable",
            description:
              "For each time limit that is set by the content, the user is provided options to turn off, adjust, or extend the time limit.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "2.2.1 Session Time Limits" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Allow users to extend or turn off timeouts before sessions expire.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-2-2-2",
            name: "2.2.2 Pause, Stop, Hide",
            description:
              "For moving, blinking, scrolling, or auto-updating information, mechanisms are available to pause, stop, or hide it.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    {
                      type: "text",
                      text: "2.2.2 Controlling Moving & Auto-updating Content",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Provide visible pause or stop buttons for carousels, tickers, or auto-updating data feeds.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
        ],
      },
      {
        id: "topic-2-3",
        name: "2.3 Seizures and Physical Reactions",
        description:
          "Do not design content in a way that is known to cause seizures or physical reactions.",
        lessons: [
          {
            id: "lesson-2-3-1",
            name: "2.3.1 Three Flashes or Below Threshold",
            description:
              "Web pages do not contain anything that flashes more than three times in any one second period.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "2.3.1 Flashing Content Hazards" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Never use rapid flashing animations or strobing lights that can trigger photosensitive seizures.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
        ],
      },
      {
        id: "topic-2-4",
        name: "2.4 Navigable",
        description:
          "Provide ways to help users navigate, find content, and determine where they are.",
        lessons: [
          {
            id: "lesson-2-4-1",
            name: "2.4.1 Bypass Blocks",
            description:
              "A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "2.4.1 Skip Navigation Links" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Provide a 'Skip to main content' link as the first focusable element on every page.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-2-4-2",
            name: "2.4.2 Page Titled",
            description:
              "Web pages have titles that describe topic or purpose.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [{ type: "text", text: "2.4.2 Unique Page Titles" }],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Update document.title dynamically on single-page application route transitions.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-2-4-3",
            name: "2.4.3 Focus Order",
            description:
              "If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "2.4.3 Logical Tab Focus Order" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Ensure keyboard tab order follows logical reading order and does not jump unexpectedly across sections.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-2-4-4",
            name: "2.4.4 Link Purpose (In Context)",
            description:
              "The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "2.4.4 Descriptive Link Text" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Avoid generic link text like 'Click Here' or 'Read More' without aria-label or accessible context.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-2-4-6",
            name: "2.4.6 Headings and Labels",
            description: "Headings and labels describe topic or purpose.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    {
                      type: "text",
                      text: "2.4.6 Clear Headings & Input Labels",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Ensure section headings and form input labels clearly describe their purpose.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-2-4-7",
            name: "2.4.7 Focus Visible",
            description:
              "Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "2.4.7 Visible Focus Indicators" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Never remove default outline styles without providing an equally prominent custom focus style.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
        ],
      },
      {
        id: "topic-2-5",
        name: "2.5 Input Modalities",
        description:
          "Make it easier for users to operate functionality through various inputs beyond keyboard.",
        lessons: [
          {
            id: "lesson-2-5-1",
            name: "2.5.1 Pointer Gestures",
            description:
              "All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "2.5.1 Single-Pointer Alternatives" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Provide simple single-tap button alternatives for complex pinch-to-zoom or multi-touch gestures.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-2-5-2",
            name: "2.5.2 Pointer Cancellation",
            description:
              "For functionality that can be operated using a single pointer, at least one mechanism allows cancellation or aborting.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    {
                      type: "text",
                      text: "2.5.2 Accidental Pointer Click Prevention",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Trigger actions on pointerup/mouseup rather than pointerdown so users can move their pointer away to cancel.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-2-5-3",
            name: "2.5.3 Label in Name",
            description:
              "For user interface components with labels that include text or images of text, the name contains the text that is presented visually.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    {
                      type: "text",
                      text: "2.5.3 Visible Label Matches Accessible Name",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Ensure aria-label attributes include the exact visible text displayed on buttons or links.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-2-5-7",
            name: "2.5.7 Dragging Movements",
            description:
              "All functionality that uses a dragging movement for operation can be achieved by a single pointer without dragging.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "2.5.7 Dragging Alternatives" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Provide click-to-move or up/down button controls as alternative to drag-and-drop sorting.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-2-5-8",
            name: "2.5.8 Target Size (Minimum)",
            description:
              "The size of the target for pointer inputs is at least 24 by 24 CSS pixels.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [{ type: "text", text: "2.5.8 Touch Target Size" }],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Ensure buttons and tap targets have minimum dimensions of 24x24px (preferably 44x44px for touch readability).",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
        ],
      },
    ],
    icon: Keyboard,
  },
  {
    id: "understandable",
    principle: "Understandable",
    description:
      "Information and the operation of user interface must be understandable.",
    topics: [
      {
        id: "topic-3-1",
        name: "3.1 Readable",
        description: "Make text content readable and understandable.",
        lessons: [
          {
            id: "lesson-3-1-1",
            name: "3.1.1 Language of Page",
            description:
              "The default human language of each Web page can be programmatically determined.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "3.1.1 Document Language Attribute" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Always declare the primary language on the root html element (e.g., <html lang='en'>).",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-3-1-2",
            name: "3.1.2 Language of Parts",
            description:
              "The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediate surrounding text.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    {
                      type: "text",
                      text: "3.1.2 Inline Foreign Phrase Language",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Wrap phrases written in another language in <span lang='es'> or similar elements so speech synthesis uses correct pronunciation.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
        ],
      },
      {
        id: "topic-3-2",
        name: "3.2 Predictable",
        description: "Make Web pages appear and operate in predictable ways.",
        lessons: [
          {
            id: "lesson-3-2-1",
            name: "3.2.1 On Focus",
            description:
              "When any component receives focus, it does not initiate a change of context.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "3.2.1 Predictable Focus Behavior" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Receiving focus should never automatically submit forms, launch popups, or change page layout unexpectedly.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-3-2-2",
            name: "3.2.2 On Input",
            description:
              "Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "3.2.2 Predictable Form Input" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Selecting a dropdown option or checking a box should not submit the form automatically without prior warning.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-3-2-3",
            name: "3.2.3 Consistent Navigation",
            description:
              "Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages occur in the same relative order each time they are repeated.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "3.2.3 Consistent Site Navigation" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Keep global navigation headers and footers in the same order across all application pages.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-3-2-4",
            name: "3.2.4 Consistent Identification",
            description:
              "Components that have the same functionality within a set of Web pages are identified consistently.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    {
                      type: "text",
                      text: "3.2.4 Consistent Component Icons & Labels",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Use identical icons, button labels, and alt text for repeating elements (e.g., search or save buttons).",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-3-2-6",
            name: "3.2.6 Consistent Help",
            description:
              "If a Web page contains help mechanisms, they occur in the same relative order across pages.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "3.2.6 Consistent Help Location" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Place help contacts, chat widgets, and support links in a predictable location across all pages.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
        ],
      },
      {
        id: "topic-3-3",
        name: "3.3 Input Assistance",
        description: "Help users avoid and correct mistakes.",
        lessons: [
          {
            id: "lesson-3-3-1",
            name: "3.3.1 Error Identification",
            description:
              "If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "3.3.1 Form Error Identification" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Form validation messages must clearly state what went wrong and how to correct it.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-3-3-2",
            name: "3.3.2 Labels or Instructions",
            description:
              "Labels or instructions are provided when content requires user input.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "3.3.2 Input Labels & Helper Text" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Provide visible labels and explicit format instructions (e.g. date format MM/DD/YYYY) for input fields.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-3-3-3",
            name: "3.3.3 Error Suggestion",
            description:
              "If an input error is automatically detected and suggestions for correction are known, then the suggestion is provided to the user.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    {
                      type: "text",
                      text: "3.3.3 Error Correction Suggestions",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Offer constructive suggestions when validation fails (e.g., 'Enter email format user@domain.com').",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-3-3-4",
            name: "3.3.4 Error Prevention (Legal, Financial, Data)",
            description:
              "For Web pages that cause legal commitments or financial transactions, submissions are reversible, checked, or confirmed.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "3.3.4 Reversible Submissions" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Provide confirmation dialogs or review screens before executing irreversible data actions or payments.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-3-3-7",
            name: "3.3.7 Redundant Entry",
            description:
              "Information previously entered by or provided to the user that is required to be entered again in the same process is either auto-populated or available for the user to select.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "3.3.7 Preventing Redundant Entry" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Auto-fill previously entered form information (e.g. 'Same as billing address' checkbox) so users don't type redundant data.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-3-3-8",
            name: "3.3.8 Accessible Authentication (Minimum)",
            description:
              "A cognitive function test (such as remembering a password or solving a puzzle) is not required for any step in an authentication process unless an alternative or assistance mechanism is available.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    {
                      type: "text",
                      text: "3.3.8 Cognitive Authentication Alternatives",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Support password managers, copy-paste, WebAuthn, or passkeys rather than forcing complex memory tests or transcription CAPTCHAs.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
        ],
      },
    ],
    icon: Brain,
  },
  {
    id: "robust",
    principle: "Robust",
    description:
      "Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.",
    topics: [
      {
        id: "topic-4-1",
        name: "4.1 Compatible",
        description:
          "Maximize compatibility with current and future user agents, including assistive technologies.",
        lessons: [
          {
            id: "lesson-4-1-2",
            name: "4.1.2 Name, Role, Value",
            description:
              "For all user interface components, the name and role can be programmatically determined.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    {
                      type: "text",
                      text: "4.1.2 Accessible Name, Role, Value",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Use semantic HTML elements or correct ARIA roles and labels so screen readers can interpret elements.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
          {
            id: "lesson-4-1-3",
            name: "4.1.3 Status Messages",
            description:
              "In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.",
            content: {
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: { level: 2 },
                  content: [
                    { type: "text", text: "4.1.3 ARIA Live Status Messages" },
                  ],
                },
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Use aria-live='polite' or role='status' for toast alerts, search loading indicators, or background updates so screen readers announce changes without stealing focus.",
                    },
                  ],
                },
              ],
            },
            lastModified: "Sep 21 2026",
          },
        ],
      },
    ],
    icon: Code,
  },
]
