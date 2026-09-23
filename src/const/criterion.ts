export type WCAGLevel = "Level A" | "Level AA" | "Level AAA"

export type WCAGPrinciple =
  | "Perceivable"
  | "Operable"
  | "Understandable"
  | "Robust"

export interface WCAGTechnique {
  id: string
  title: string
  description?: string
  url?: string
}

export interface WCAGCriterion {
  id: string
  num: string
  name: string
  principle: WCAGPrinciple
  guidelineId: string
  guidelineName: string
  level: WCAGLevel
  description: string
  techniques?: WCAGTechnique[]
  referenceUrl: string
}

export interface WCAGGuideline {
  id: string
  num: string
  name: string
  principle: WCAGPrinciple
}

export const wcagGuidelines: WCAGGuideline[] = [
  // Perceivable
  {
    id: "1.1",
    num: "1.1",
    name: "1.1 Text alternatives",
    principle: "Perceivable",
  },
  {
    id: "1.2",
    num: "1.2",
    name: "1.2 Time-based media",
    principle: "Perceivable",
  },
  {
    id: "1.3",
    num: "1.3",
    name: "1.3 Adaptable",
    principle: "Perceivable",
  },
  {
    id: "1.4",
    num: "1.4",
    name: "1.4 Distinguishable",
    principle: "Perceivable",
  },

  // Operable
  {
    id: "2.1",
    num: "2.1",
    name: "2.1 Keyboard accessible",
    principle: "Operable",
  },
  {
    id: "2.2",
    num: "2.2",
    name: "2.2 Enough time",
    principle: "Operable",
  },
  {
    id: "2.3",
    num: "2.3",
    name: "2.3 Seizures and physical reactions",
    principle: "Operable",
  },
  {
    id: "2.4",
    num: "2.4",
    name: "2.4 Navigable",
    principle: "Operable",
  },
  {
    id: "2.5",
    num: "2.5",
    name: "2.5 Input modalities",
    principle: "Operable",
  },

  // Understandable
  {
    id: "3.1",
    num: "3.1",
    name: "3.1 Readable",
    principle: "Understandable",
  },
  {
    id: "3.2",
    num: "3.2",
    name: "3.2 Predictable",
    principle: "Understandable",
  },
  {
    id: "3.3",
    num: "3.3",
    name: "3.3 Input assistance",
    principle: "Understandable",
  },

  // Robust
  {
    id: "4.1",
    num: "4.1",
    name: "4.1 Compatible",
    principle: "Robust",
  },
]

export const wcagCriteria: WCAGCriterion[] = [
  // -------------------------------------------------------------
  // 1.1 Text Alternatives
  // -------------------------------------------------------------
  {
    id: "1.1.1",
    num: "1.1.1",
    name: "1.1.1 Non-text Content",
    principle: "Perceivable",
    guidelineId: "1.1",
    guidelineName: "1.1 Text alternatives",
    level: "Level A",
    description:
      "All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#non-text-content",
    techniques: [
      {
        id: "G94",
        title: "Providing short text alternative for non-text content",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G94",
      },
      {
        id: "ARIA6",
        title: "Using aria-label to provide an accessible name for an image",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6",
      },
      {
        id: "H37",
        title: "Using alt attributes on img elements",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H37",
      },
    ],
  },

  // -------------------------------------------------------------
  // 1.2 Time-based Media (All 9 Criteria)
  // -------------------------------------------------------------
  {
    id: "1.2.1",
    num: "1.2.1",
    name: "1.2.1 Audio-only and Video-only (Prerecorded)",
    principle: "Perceivable",
    guidelineId: "1.2",
    guidelineName: "1.2 Time-based media",
    level: "Level A",
    description:
      "For prerecorded audio-only and prerecorded video-only media, an alternative for time-based media or audio description is provided.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#audio-only-and-video-only-prerecorded",
    techniques: [
      {
        id: "G158",
        title:
          "Providing an alternative for time-based media for audio-only content",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G158",
      },
    ],
  },
  {
    id: "1.2.2",
    num: "1.2.2",
    name: "1.2.2 Captions (Prerecorded)",
    principle: "Perceivable",
    guidelineId: "1.2",
    guidelineName: "1.2 Time-based media",
    level: "Level A",
    description:
      "Captions are provided for all prerecorded audio content in synchronized media.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#captions-prerecorded",
    techniques: [
      {
        id: "G87",
        title: "Providing closed captions for video content",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G87",
      },
    ],
  },
  {
    id: "1.2.3",
    num: "1.2.3",
    name: "1.2.3 Audio Description or Media Alternative (Prerecorded)",
    principle: "Perceivable",
    guidelineId: "1.2",
    guidelineName: "1.2 Time-based media",
    level: "Level A",
    description:
      "An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#audio-description-or-media-alternative-prerecorded",
  },
  {
    id: "1.2.4",
    num: "1.2.4",
    name: "1.2.4 Captions (Live)",
    principle: "Perceivable",
    guidelineId: "1.2",
    guidelineName: "1.2 Time-based media",
    level: "Level AA",
    description:
      "Captions are provided for all live audio content in synchronized media.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#captions-live",
  },
  {
    id: "1.2.5",
    num: "1.2.5",
    name: "1.2.5 Audio Description (Prerecorded)",
    principle: "Perceivable",
    guidelineId: "1.2",
    guidelineName: "1.2 Time-based media",
    level: "Level AA",
    description:
      "Audio description is provided for all prerecorded video content in synchronized media.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#audio-description-prerecorded",
  },
  {
    id: "1.2.6",
    num: "1.2.6",
    name: "1.2.6 Sign Language (Prerecorded)",
    principle: "Perceivable",
    guidelineId: "1.2",
    guidelineName: "1.2 Time-based media",
    level: "Level AAA",
    description:
      "Sign language interpretation is provided for all prerecorded audio content in synchronized media.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#sign-language-prerecorded",
  },
  {
    id: "1.2.7",
    num: "1.2.7",
    name: "1.2.7 Extended Audio Description (Prerecorded)",
    principle: "Perceivable",
    guidelineId: "1.2",
    guidelineName: "1.2 Time-based media",
    level: "Level AAA",
    description:
      "Where pauses in foreground audio are insufficient to convey the sense of the video, extended audio description is provided for all prerecorded video content in synchronized media.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#extended-audio-description-prerecorded",
  },
  {
    id: "1.2.8",
    num: "1.2.8",
    name: "1.2.8 Media Alternative (Prerecorded)",
    principle: "Perceivable",
    guidelineId: "1.2",
    guidelineName: "1.2 Time-based media",
    level: "Level AAA",
    description:
      "An alternative for time-based media is provided for all prerecorded synchronized media and for all prerecorded video-only media.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#media-alternative-prerecorded",
  },
  {
    id: "1.2.9",
    num: "1.2.9",
    name: "1.2.9 Audio-only (Live)",
    principle: "Perceivable",
    guidelineId: "1.2",
    guidelineName: "1.2 Time-based media",
    level: "Level AAA",
    description:
      "An alternative for time-based media that presents equivalent information for live audio-only content is provided.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#audio-only-live",
  },

  // -------------------------------------------------------------
  // 1.3 Adaptable
  // -------------------------------------------------------------
  {
    id: "1.3.1",
    num: "1.3.1",
    name: "1.3.1 Info and Relationships",
    principle: "Perceivable",
    guidelineId: "1.3",
    guidelineName: "1.3 Adaptable",
    level: "Level A",
    description:
      "Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships",
    techniques: [
      {
        id: "H42",
        title: "Using h1-h6 to identify headings",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H42",
      },
      {
        id: "H44",
        title: "Using label elements to associate text labels with form controls",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H44",
      },
    ],
  },
  {
    id: "1.3.2",
    num: "1.3.2",
    name: "1.3.2 Meaningful Sequence",
    principle: "Perceivable",
    guidelineId: "1.3",
    guidelineName: "1.3 Adaptable",
    level: "Level A",
    description:
      "When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence",
  },
  {
    id: "1.3.3",
    num: "1.3.3",
    name: "1.3.3 Sensory Characteristics",
    principle: "Perceivable",
    guidelineId: "1.3",
    guidelineName: "1.3 Adaptable",
    level: "Level A",
    description:
      "Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, color, visual size, visual location, orientation, or sound.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#sensory-characteristics",
  },
  {
    id: "1.3.4",
    num: "1.3.4",
    name: "1.3.4 Orientation",
    principle: "Perceivable",
    guidelineId: "1.3",
    guidelineName: "1.3 Adaptable",
    level: "Level AA",
    description:
      "Content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#orientation",
  },
  {
    id: "1.3.5",
    num: "1.3.5",
    name: "1.3.5 Identify Input Purpose",
    principle: "Perceivable",
    guidelineId: "1.3",
    guidelineName: "1.3 Adaptable",
    level: "Level AA",
    description:
      "The purpose of each input field collecting information about the user can be programmatically determined when the input field serves a purpose identified in the Input Purposes for User Interface Components section.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#identify-input-purpose",
  },
  {
    id: "1.3.6",
    num: "1.3.6",
    name: "1.3.6 Identify Purpose",
    principle: "Perceivable",
    guidelineId: "1.3",
    guidelineName: "1.3 Adaptable",
    level: "Level AAA",
    description:
      "In content implemented using markup languages, the purpose of User Interface Components, icons, and regions can be programmatically determined.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#identify-purpose",
  },

  // -------------------------------------------------------------
  // 1.4 Distinguishable
  // -------------------------------------------------------------
  {
    id: "1.4.1",
    num: "1.4.1",
    name: "1.4.1 Use of Color",
    principle: "Perceivable",
    guidelineId: "1.4",
    guidelineName: "1.4 Distinguishable",
    level: "Level A",
    description:
      "Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#use-of-color",
  },
  {
    id: "1.4.2",
    num: "1.4.2",
    name: "1.4.2 Audio Control",
    principle: "Perceivable",
    guidelineId: "1.4",
    guidelineName: "1.4 Distinguishable",
    level: "Level A",
    description:
      "If any audio plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#audio-control",
  },
  {
    id: "1.4.3",
    num: "1.4.3",
    name: "1.4.3 Contrast (Minimum)",
    principle: "Perceivable",
    guidelineId: "1.4",
    guidelineName: "1.4 Distinguishable",
    level: "Level AA",
    description:
      "The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for large-scale text (3:1).",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum",
    techniques: [
      {
        id: "G18",
        title:
          "Ensuring that a contrast ratio of at least 4.5:1 exists between text and background",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G18",
      },
    ],
  },
  {
    id: "1.4.4",
    num: "1.4.4",
    name: "1.4.4 Resize Text",
    principle: "Perceivable",
    guidelineId: "1.4",
    guidelineName: "1.4 Distinguishable",
    level: "Level AA",
    description:
      "Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#resize-text",
  },
  {
    id: "1.4.5",
    num: "1.4.5",
    name: "1.4.5 Images of Text",
    principle: "Perceivable",
    guidelineId: "1.4",
    guidelineName: "1.4 Distinguishable",
    level: "Level AA",
    description:
      "If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#images-of-text",
  },
  {
    id: "1.4.10",
    num: "1.4.10",
    name: "1.4.10 Reflow",
    principle: "Perceivable",
    guidelineId: "1.4",
    guidelineName: "1.4 Distinguishable",
    level: "Level AA",
    description:
      "Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#reflow",
  },
  {
    id: "1.4.11",
    num: "1.4.11",
    name: "1.4.11 Non-text Contrast",
    principle: "Perceivable",
    guidelineId: "1.4",
    guidelineName: "1.4 Distinguishable",
    level: "Level AA",
    description:
      "The visual presentation of user interface components and graphical objects has a contrast ratio of at least 3:1 against adjacent colors.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast",
  },
  {
    id: "1.4.12",
    num: "1.4.12",
    name: "1.4.12 Text Spacing",
    principle: "Perceivable",
    guidelineId: "1.4",
    guidelineName: "1.4 Distinguishable",
    level: "Level AA",
    description:
      "No loss of content or functionality occurs by setting text spacing properties (line height, paragraph spacing, letter spacing, word spacing).",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#text-spacing",
  },
  {
    id: "1.4.13",
    num: "1.4.13",
    name: "1.4.13 Content on Hover or Focus",
    principle: "Perceivable",
    guidelineId: "1.4",
    guidelineName: "1.4 Distinguishable",
    level: "Level AA",
    description:
      "Where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, mechanisms are available to dismiss or hover over content.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus",
  },

  // -------------------------------------------------------------
  // 2.1 Keyboard Accessible
  // -------------------------------------------------------------
  {
    id: "2.1.1",
    num: "2.1.1",
    name: "2.1.1 Keyboard",
    principle: "Operable",
    guidelineId: "2.1",
    guidelineName: "2.1 Keyboard accessible",
    level: "Level A",
    description:
      "All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#keyboard",
    techniques: [
      {
        id: "G202",
        title: "Ensuring keyboard control for all interactive elements",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G202",
      },
    ],
  },
  {
    id: "2.1.2",
    num: "2.1.2",
    name: "2.1.2 No Keyboard Trap",
    principle: "Operable",
    guidelineId: "2.1",
    guidelineName: "2.1 Keyboard accessible",
    level: "Level A",
    description:
      "If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#no-keyboard-trap",
  },
  {
    id: "2.1.4",
    num: "2.1.4",
    name: "2.1.4 Character Key Shortcuts",
    principle: "Operable",
    guidelineId: "2.1",
    guidelineName: "2.1 Keyboard accessible",
    level: "Level A",
    description:
      "If a keyboard shortcut is implemented in content using only letter, punctuation, number, or symbol characters, a mechanism is available to turn it off, remap it, or activate it only on focus.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#character-key-shortcuts",
  },

  // -------------------------------------------------------------
  // 2.2 Enough Time
  // -------------------------------------------------------------
  {
    id: "2.2.1",
    num: "2.2.1",
    name: "2.2.1 Timing Adjustable",
    principle: "Operable",
    guidelineId: "2.2",
    guidelineName: "2.2 Enough time",
    level: "Level A",
    description:
      "For each time limit that is set by the content, the user can turn off, adjust, or extend the time limit.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#timing-adjustable",
  },
  {
    id: "2.2.2",
    num: "2.2.2",
    name: "2.2.2 Pause, Stop, Hide",
    principle: "Operable",
    guidelineId: "2.2",
    guidelineName: "2.2 Enough time",
    level: "Level A",
    description:
      "For moving, blinking, scrolling, or auto-updating information, mechanisms are provided for the user to pause, stop, or hide it.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#pause-stop-hide",
  },

  // -------------------------------------------------------------
  // 2.3 Seizures and Physical Reactions
  // -------------------------------------------------------------
  {
    id: "2.3.1",
    num: "2.3.1",
    name: "2.3.1 Three Flashes or Below Threshold",
    principle: "Operable",
    guidelineId: "2.3",
    guidelineName: "2.3 Seizures and physical reactions",
    level: "Level A",
    description:
      "Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#three-flashes-or-below-threshold",
  },

  // -------------------------------------------------------------
  // 2.4 Navigable
  // -------------------------------------------------------------
  {
    id: "2.4.1",
    num: "2.4.1",
    name: "2.4.1 Bypass Blocks",
    principle: "Operable",
    guidelineId: "2.4",
    guidelineName: "2.4 Navigable",
    level: "Level A",
    description:
      "A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#bypass-blocks",
  },
  {
    id: "2.4.2",
    num: "2.4.2",
    name: "2.4.2 Page Titled",
    principle: "Operable",
    guidelineId: "2.4",
    guidelineName: "2.4 Navigable",
    level: "Level A",
    description:
      "Web pages have titles that describe topic or purpose.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#page-titled",
  },
  {
    id: "2.4.3",
    num: "2.4.3",
    name: "2.4.3 Focus Order",
    principle: "Operable",
    guidelineId: "2.4",
    guidelineName: "2.4 Navigable",
    level: "Level A",
    description:
      "If a Web page can be navigated sequentially and navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#focus-order",
  },
  {
    id: "2.4.4",
    num: "2.4.4",
    name: "2.4.4 Link Purpose (In Context)",
    principle: "Operable",
    guidelineId: "2.4",
    guidelineName: "2.4 Navigable",
    level: "Level A",
    description:
      "The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#link-purpose-in-context",
  },
  {
    id: "2.4.6",
    num: "2.4.6",
    name: "2.4.6 Headings and Labels",
    principle: "Operable",
    guidelineId: "2.4",
    guidelineName: "2.4 Navigable",
    level: "Level AA",
    description:
      "Headings and labels describe topic or purpose.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#headings-and-labels",
  },
  {
    id: "2.4.7",
    num: "2.4.7",
    name: "2.4.7 Focus Visible",
    principle: "Operable",
    guidelineId: "2.4",
    guidelineName: "2.4 Navigable",
    level: "Level AA",
    description:
      "Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#focus-visible",
  },
  {
    id: "2.4.11",
    num: "2.4.11",
    name: "2.4.11 Focus Appearance",
    principle: "Operable",
    guidelineId: "2.4",
    guidelineName: "2.4 Navigable",
    level: "Level AA",
    description:
      "When a user interface component has keyboard focus, the focus indicator has sufficient size and contrast.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance",
  },

  // -------------------------------------------------------------
  // 2.5 Input Modalities
  // -------------------------------------------------------------
  {
    id: "2.5.1",
    num: "2.5.1",
    name: "2.5.1 Pointer Gestures",
    principle: "Operable",
    guidelineId: "2.5",
    guidelineName: "2.5 Input modalities",
    level: "Level A",
    description:
      "All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#pointer-gestures",
  },
  {
    id: "2.5.2",
    num: "2.5.2",
    name: "2.5.2 Pointer Cancellation",
    principle: "Operable",
    guidelineId: "2.5",
    guidelineName: "2.5 Input modalities",
    level: "Level A",
    description:
      "For functionality that can be operated using a single pointer, completion of the function is on the up-event or can be aborted/reversed.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#pointer-cancellation",
  },
  {
    id: "2.5.3",
    num: "2.5.3",
    name: "2.5.3 Label in Name",
    principle: "Operable",
    guidelineId: "2.5",
    guidelineName: "2.5 Input modalities",
    level: "Level A",
    description:
      "For user interface components with labels that include text or images of text, the name contains the text that is presented visually.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#label-in-name",
  },
  {
    id: "2.5.7",
    num: "2.5.7",
    name: "2.5.7 Dragging Movements",
    principle: "Operable",
    guidelineId: "2.5",
    guidelineName: "2.5 Input modalities",
    level: "Level AA",
    description:
      "All functionality that uses a dragging movement for operation can be operated by a single pointer without dragging, unless dragging is essential.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#dragging-movements",
  },
  {
    id: "2.5.8",
    num: "2.5.8",
    name: "2.5.8 Target Size (Minimum)",
    principle: "Operable",
    guidelineId: "2.5",
    guidelineName: "2.5 Input modalities",
    level: "Level AA",
    description:
      "The size of the target for pointer inputs is at least 24 by 24 CSS pixels, except where offset or inline.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum",
  },

  // -------------------------------------------------------------
  // 3.1 Readable
  // -------------------------------------------------------------
  {
    id: "3.1.1",
    num: "3.1.1",
    name: "3.1.1 Language of Page",
    principle: "Understandable",
    guidelineId: "3.1",
    guidelineName: "3.1 Readable",
    level: "Level A",
    description:
      "The default human language of each Web page can be programmatically determined.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#language-of-page",
  },
  {
    id: "3.1.2",
    num: "3.1.2",
    name: "3.1.2 Language of Parts",
    principle: "Understandable",
    guidelineId: "3.1",
    guidelineName: "3.1 Readable",
    level: "Level AA",
    description:
      "The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#language-of-parts",
  },

  // -------------------------------------------------------------
  // 3.2 Predictable
  // -------------------------------------------------------------
  {
    id: "3.2.1",
    num: "3.2.1",
    name: "3.2.1 On Focus",
    principle: "Understandable",
    guidelineId: "3.2",
    guidelineName: "3.2 Predictable",
    level: "Level A",
    description:
      "When any user interface component receives focus, it does not initiate a change of context.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#on-focus",
  },
  {
    id: "3.2.2",
    num: "3.2.2",
    name: "3.2.2 On Input",
    principle: "Understandable",
    guidelineId: "3.2",
    guidelineName: "3.2 Predictable",
    level: "Level A",
    description:
      "Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#on-input",
  },
  {
    id: "3.2.3",
    num: "3.2.3",
    name: "3.2.3 Consistent Navigation",
    principle: "Understandable",
    guidelineId: "3.2",
    guidelineName: "3.2 Predictable",
    level: "Level AA",
    description:
      "Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#consistent-navigation",
  },
  {
    id: "3.2.4",
    num: "3.2.4",
    name: "3.2.4 Consistent Identification",
    principle: "Understandable",
    guidelineId: "3.2",
    guidelineName: "3.2 Predictable",
    level: "Level AA",
    description:
      "Components that have the same functionality within a set of Web pages are identified consistently.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#consistent-identification",
  },
  {
    id: "3.2.6",
    num: "3.2.6",
    name: "3.2.6 Consistent Help",
    principle: "Understandable",
    guidelineId: "3.2",
    guidelineName: "3.2 Predictable",
    level: "Level A",
    description:
      "If a Web page contains help mechanisms, they occur in the same relative order across pages.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#consistent-help",
  },

  // -------------------------------------------------------------
  // 3.3 Input Assistance
  // -------------------------------------------------------------
  {
    id: "3.3.1",
    num: "3.3.1",
    name: "3.3.1 Error Identification",
    principle: "Understandable",
    guidelineId: "3.3",
    guidelineName: "3.3 Input assistance",
    level: "Level A",
    description:
      "If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#error-identification",
  },
  {
    id: "3.3.2",
    num: "3.3.2",
    name: "3.3.2 Labels or Instructions",
    principle: "Understandable",
    guidelineId: "3.3",
    guidelineName: "3.3 Input assistance",
    level: "Level A",
    description:
      "Labels or instructions are provided when content requires user input.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#labels-or-instructions",
  },
  {
    id: "3.3.3",
    num: "3.3.3",
    name: "3.3.3 Error Suggestion",
    principle: "Understandable",
    guidelineId: "3.3",
    guidelineName: "3.3 Input assistance",
    level: "Level AA",
    description:
      "If an input error is automatically detected and suggestions for correction are known, then the suggestion is provided to the user, unless it would jeopardize the security or purpose of the content.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#error-suggestion",
  },
  {
    id: "3.3.4",
    num: "3.3.4",
    name: "3.3.4 Error Prevention (Legal, Financial, Data)",
    principle: "Understandable",
    guidelineId: "3.3",
    guidelineName: "3.3 Input assistance",
    level: "Level AA",
    description:
      "For Web pages that cause legal commitments or financial transactions, submissions are reversible, checked for errors, or confirmed before finalizing.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-legal-financial-data",
  },
  {
    id: "3.3.7",
    num: "3.3.7",
    name: "3.3.7 Redundant Entry",
    principle: "Understandable",
    guidelineId: "3.3",
    guidelineName: "3.3 Input assistance",
    level: "Level A",
    description:
      "Information previously entered by or provided to the user that is required to be entered again in the same process is auto-populated or available for selection.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#redundant-entry",
  },
  {
    id: "3.3.8",
    num: "3.3.8",
    name: "3.3.8 Accessible Authentication (Minimum)",
    principle: "Understandable",
    guidelineId: "3.3",
    guidelineName: "3.3 Input assistance",
    level: "Level AA",
    description:
      "A cognitive function test (such as remembering a password or solving a puzzle) is not required for any step in an authentication process unless an alternative or assistance mechanism is provided.",
    referenceUrl:
      "https://www.w3.org/WAI/WCAG22/quickref/#accessible-authentication-minimum",
  },

  // -------------------------------------------------------------
  // 4.1 Compatible
  // -------------------------------------------------------------
  {
    id: "4.1.2",
    num: "4.1.2",
    name: "4.1.2 Name, Role, Value",
    principle: "Robust",
    guidelineId: "4.1",
    guidelineName: "4.1 Compatible",
    level: "Level A",
    description:
      "For all user interface components, the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#name-role-value",
  },
  {
    id: "4.1.3",
    num: "4.1.3",
    name: "4.1.3 Status Messages",
    principle: "Robust",
    guidelineId: "4.1",
    guidelineName: "4.1 Compatible",
    level: "Level AA",
    description:
      "In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.",
    referenceUrl: "https://www.w3.org/WAI/WCAG22/quickref/#status-messages",
  },
]
