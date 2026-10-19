import type { InstrumentProps } from "./props/miscellaneousProps"

export const instrumentsData: InstrumentProps[] = [
  {
    id: 1,
    principle: "Perceivable",
    title: "1.1.1 Non-text Content",
    content:
      "(Level A)\nAll non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.\n\nControls, Input\nIf non-text content is a control or accepts user input, then it has a name that describes its purpose. (Refer to Success Criterion 4.1.2 for additional requirements for controls and content that accepts user input.)\n\nTime-Based Media\nIf non-text content is time-based media, then text alternatives at least provide descriptive identification of the non-text content. (Refer to Guideline 1.2 for additional requirements for media.)\n\nTest\nIf non-text content is a test or exercise that would be invalid if presented in text, then text alternatives at least provide descriptive identification of the non-text content.\n\nSensory\nIf non-text content is primarily intended to create a specific sensory experience, then text alternatives at least provide descriptive identification of the non-text content.\n\nCAPTCHA\nIf the purpose of non-text content is to confirm that content is being accessed by a person rather than a computer, then text alternatives that identify and describe the purpose of the non-text content are provided, and alternative forms of CAPTCHA using output modes for different types of sensory perception are provided to accommodate different disabilities.\n\nDecoration, Formatting, Invisible\nIf non-text content is pure decoration, is used only for visual formatting, or is not presented to users, then it is implemented in a way that it can be ignored by assistive technology.",
  },
  {
    id: 2,
    principle: "Perceivable",
    title: "1.2.1 Audio-only and Video-only (Prerecorded)",
    content:
      "(Level A)\nFor prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such:\n\nPrerecorded Audio-only\nAn alternative for time-based media is provided that presents equivalent information for prerecorded audio-only content.\n\nPrerecorded Video-only\nEither an alternative for time-based media or an audio track is provided that presents equivalent information for prerecorded video-only content.",
  },
  {
    id: 3,
    principle: "Perceivable",
    title: "1.2.2 Captions (Prerecorded)",
    content:
      "(Level A)\n    (Level A)\nCaptions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.",
  },
  {
    id: 4,
    principle: "Perceivable",
    title: "1.2.3 Audio Description or Media Alternative (Prerecorded)",
    content:
      "(Level A)\nAn alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.",
  },
  {
    id: 5,
    principle: "Perceivable",
    title: "1.2.4 Captions (Live)",
    content:
      "(Level AA)\nCaptions are provided for all live audio content in synchronized media.",
  },
  {
    id: 6,
    principle: "Perceivable",
    title: "1.2.5 Audio Description (Prerecorded)",
    content:
      "(Level AA)\nAudio description is provided for all prerecorded video content in synchronized media.",
  },
  {
    id: 7,
    principle: "Perceivable",
    title: "1.2.6 Sign Language (Prerecorded)",
    content:
      "(Level AAA)\nSign language interpretation is provided for all prerecorded audio content in synchronized media.",
  },
  {
    id: 8,
    principle: "Perceivable",
    title: "1.2.7 Extended Audio Description (Prerecorded)",
    content:
      "(Level AAA)\nWhere pauses in foreground audio are insufficient to allow audio descriptions to convey the sense of the video, extended audio description is provided for all prerecorded video content in synchronized media.",
  },
  {
    id: 9,
    principle: "Perceivable",
    title: "1.2.8 Media Alternative (Prerecorded)",
    content:
      "(Level AAA)\nAn alternative for time-based media is provided for all prerecorded synchronized media and for all prerecorded video-only media.",
  },
  {
    id: 10,
    principle: "Perceivable",
    title: "1.2.9 Audio-only (Live)",
    content:
      "(Level AAA)\nAn alternative for time-based media that presents equivalent information for live audio-only content is provided.",
  },
  {
    id: 11,
    principle: "Perceivable",
    title: "1.3.1 Info and Relationships",
    content:
      "(Level A)\nInformation, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.",
  },
  {
    id: 12,
    principle: "Perceivable",
    title: "1.3.2 Meaningful Sequence",
    content:
      "(Level A)\nWhen the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.",
  },
  {
    id: 13,
    principle: "Perceivable",
    title: "1.3.3 Sensory Characteristics",
    content:
      "(Level A)\nInstructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, color, size, visual location, orientation, or sound.\n\nNote:\nFor requirements related to color, refer to Guideline 1.4.",
  },
  {
    id: 14,
    principle: "Perceivable",
    title: "1.3.4 Orientation",
    content:
      "(Level AA)\nContent does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.\n\nExamples where a particular display orientation may be essential are a bank check, a piano application, slides for a projector or television, or virtual reality content.",
  },
  {
    id: 15,
    principle: "Perceivable",
    title: "1.3.5 Identify Input Purpose",
    content:
      "(Level AA)\nThe purpose of each input field collecting information about the user can be programmatically determined when:\n\n- The input field serves a purpose identified in the Input Purposes for user interface components section.\n- The content is implemented using technologies with support for identifying the expected meaning for form input data.",
  },
  {
    id: 16,
    principle: "Perceivable",
    title: "1.3.6 Identify Purpose",
    content:
      "(Level AAA)\nIn content implemented using markup languages, the purpose of user interface components, icons, and regions can be programmatically determined.",
  },
  {
    id: 17,
    principle: "Perceivable",
    title: "1.4.1 Use of Color",
    content:
      "(Level A)\nColor is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.",
  },
  {
    id: 18,
    principle: "Perceivable",
    title: "1.4.2 Audio Control",
    content:
      "(Level A)\nIf any audio on a web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.",
  },
  {
    id: 19,
    principle: "Perceivable",
    title: "1.4.3 Contrast (Minimum)",
    content:
      "(Level AA)\nThe visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except:\n\nLarge Text:\nLarge-scale text and images of large-scale text require at least 3:1.\n\nIncidental:\nInactive UI components, pure decoration, invisible text, or text in pictures with significant visual content have no contrast requirement.\n\nLogotypes:\nText that is part of a logo or brand name has no contrast requirement.",
  },
  {
    id: 20,
    principle: "Perceivable",
    title: "1.4.4 Resize Text",
    content:
      "(Level AA)\nExcept for captions and images of text, text can be resized up to 200 percent without loss of content or functionality.",
  },
  {
    id: 21,
    principle: "Perceivable",
    title: "1.4.5 Images of Text",
    content:
      "(Level AA)\nText is used to convey information rather than images of text except when:\n\nCustomizable:\nThe image of text can be visually customized.\n\nEssential:\nA particular presentation of text is essential.\n\nNote:\nLogotypes are considered essential.",
  },
  {
    id: 22,
    principle: "Perceivable",
    title: "1.4.6 Contrast (Enhanced)",
    content:
      "(Level AAA)\nThe visual presentation of text and images of text has a contrast ratio of at least 7:1, except:\n\nLarge Text:\nAt least 4.5:1.\n\nIncidental:\nNo contrast requirement.\n\nLogotypes:\nNo contrast requirement.",
  },
  {
    id: 23,
    principle: "Perceivable",
    title: "1.4.7 Low or No Background Audio",
    content:
      "(Level AAA)\nFor prerecorded audio-only content containing speech, at least one of the following is true:\n\n- No background sounds.\n- Background sounds can be turned off.\n- Background sounds are at least 20 decibels lower than foreground speech.",
  },
  {
    id: 24,
    principle: "Perceivable",
    title: "1.4.8 Visual Presentation",
    content:
      "(Level AAA)\nA mechanism is available to achieve the following:\n\n- Foreground and background colors can be selected by the user.\n- Width is no more than 80 characters (40 for CJK).\n- Text is not justified.\n- Line spacing is at least 1.5 within paragraphs.\n- Paragraph spacing is at least 1.5 times line spacing.\n- Text can be resized up to 200% without horizontal scrolling.",
  },
  {
    id: 25,
    principle: "Perceivable",
    title: "1.4.9 Images of Text (No Exception)",
    content:
      "(Level AAA)\nImages of text are only used for pure decoration or where a particular presentation of text is essential.\n\nNote:\nLogotypes are considered essential.",
  },
  {
    id: 26,
    principle: "Perceivable",
    title: "1.4.10 Reflow",
    content:
      "(Level AA)\nContent can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:\n\n- Vertical scrolling content at 320 CSS pixels width.\n- Horizontal scrolling content at 256 CSS pixels height.\n\nException:\nContent requiring two-dimensional layout.",
  },
  {
    id: 27,
    principle: "Perceivable",
    title: "1.4.11 Non-text Contrast",
    content:
      "(Level AA)\nThe visual presentation of the following has a contrast ratio of at least 3:1 against adjacent colors:\n\nUser Interface Components:\nVisual information required to identify components and states.\n\nGraphical Objects:\nParts of graphics required to understand content.",
  },
  {
    id: 28,
    principle: "Perceivable",
    title: "1.4.12 Text Spacing",
    content:
      "(Level AA)\nNo loss of content or functionality occurs when users set:\n\n- Line height to at least 1.5 times font size.\n- Paragraph spacing to at least 2 times font size.\n- Letter spacing to at least 0.12 times font size.\n- Word spacing to at least 0.16 times font size.",
  },
  {
    id: 29,
    principle: "Perceivable",
    title: "1.4.13 Content on Hover or Focus",
    content:
      "(Level AA)\nWhen hover or focus triggers additional content:\n\nDismissible:\nA mechanism is available to dismiss it.\n\nHoverable:\nPointer can move over the additional content without disappearing.\n\nPersistent:\nThe content remains visible until dismissed, hover/focus removed, or information becomes invalid.",
  },
  {
    id: 30,
    principle: "Operable",
    title: "2.1.1 Keyboard",
    content:
      "(Level A)\nAll functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints.\n\nNote 1\nThis exception relates to the underlying function, not the input technique. For example, if using handwriting to enter text, the input technique (handwriting) requires path-dependent input but the underlying function (text input) does not.\n\nNote 2\nThis does not forbid and should not discourage providing mouse input or other input methods in addition to keyboard operation.",
  },
  {
    id: 31,
    principle: "Operable",
    title: "2.1.2 No Keyboard Trap",
    content:
      "(Level A)\nIf keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.\n\nNote\nSince any content that does not meet this success criterion can interfere with a user's ability to use the whole page, all content on the web page (whether it is used to meet other success criteria or not) must meet this success criterion. See Conformance Requirement 5: Non-Interference.",
  },
  {
    id: 32,
    principle: "Operable",
    title: "2.1.3 Keyboard (No Exception)",
    content:
      "(Level AAA)\nAll functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.",
  },
  {
    id: 33,
    principle: "Operable",
    title: "2.1.4 Character Key Shortcuts",
    content:
      "(Level A)\nIf a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:\n\nTurn off\nA mechanism is available to turn the shortcut off;\n\nRemap\nA mechanism is available to remap the shortcut to include one or more non-printable keyboard keys (e.g., Ctrl, Alt);\n\nActive only on focus\nThe keyboard shortcut for a user interface component is only active when that component has focus.",
  },
  {
    id: 34,
    principle: "Operable",
    title: "2.2.1 Timing Adjustable",
    content:
      '(Level A)\nFor each time limit that is set by the content, at least one of the following is true:\n\nTurn off\nThe user is allowed to turn off the time limit before encountering it; or\n\nAdjust\nThe user is allowed to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting; or\n\nExtend\nThe user is warned before time expires and given at least 20 seconds to extend the time limit with a simple action (for example, "press the space bar"), and the user is allowed to extend the time limit at least ten times; or\n\nReal-time Exception\nThe time limit is a required part of a real-time event (for example, an auction), and no alternative to the time limit is possible; or\n\nEssential Exception\nThe time limit is essential and extending it would invalidate the activity; or\n\n20 Hour Exception\nThe time limit is longer than 20 hours.\n\nNote\nThis success criterion helps ensure that users can complete tasks without unexpected changes in content or context that are a result of a time limit. This success criterion should be considered in conjunction with Success Criterion 3.2.1, which puts limits on changes of content or context as a result of user action.',
  },
  {
    id: 35,
    principle: "Operable",
    title: "2.2.2 Pause, Stop, Hide",
    content:
      "(Level A)\nFor moving, blinking, scrolling, or auto-updating information, all of the following are true:\n\nMoving, blinking, scrolling\nFor any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it unless the movement, blinking, or scrolling is part of an activity where it is essential; and\n\nAuto-updating\nFor any auto-updating information that (1) starts automatically and (2) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it or to control the frequency of the update unless the auto-updating is part of an activity where it is essential.\n\nNote 1\nFor requirements related to flickering or flashing content, refer to Guideline 2.3.\n\nNote 2\nSince any content that does not meet this success criterion can interfere with a user's ability to use the whole page, all content on the web page (whether it is used to meet other success criteria or not) must meet this success criterion. See Conformance Requirement 5: Non-Interference.\n\nNote 3\nContent that is updated periodically by software or that is streamed to the user agent is not required to preserve or present information that is generated or received between the initiation of the pause and resuming presentation, as this may not be technically possible, and in many situations could be misleading to do so.\n\nNote 4\nAn animation that occurs as part of a preload phase or similar situation can be considered essential if interaction cannot occur during that phase for all users and if not indicating progress could confuse users or cause them to think that content was frozen or broken.",
  },
  {
    id: 36,
    principle: "Operable",
    title: "2.2.3 No Timing",
    content:
      "(Level AAA)\nTiming is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.",
  },
  {
    id: 37,
    principle: "Operable",
    title: "2.2.4 Interruptions",
    content:
      "(Level AAA)\nInterruptions can be postponed or suppressed by the user, except interruptions involving an emergency.",
  },
  {
    id: 38,
    principle: "Operable",
    title: "2.2.5 Re-authenticating",
    content:
      "(Level AAA)\nWhen an authenticated session expires, the user can continue the activity without loss of data after re-authenticating.",
  },
  {
    id: 39,
    principle: "Operable",
    title: "2.2.6 Timeouts",
    content:
      "(Level AAA)\nUsers are warned of the duration of any user inactivity that could cause data loss, unless the data is preserved for more than 20 hours when the user does not take any actions.\n\nNote\nPrivacy regulations may require explicit user consent before user identification has been authenticated and before user data is preserved. In cases where the user is a minor, explicit consent may not be solicited in most jurisdictions, countries or regions. Consultation with privacy professionals and legal counsel is advised when considering data preservation as an approach to satisfy this success criterion.",
  },
  {
    id: 40,
    principle: "Operable",
    title: "2.3.1 Three Flashes or Below Threshold",
    content:
      "(Level A)\nWeb pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.\n\nNote\nSince any content that does not meet this success criterion can interfere with a user's ability to use the whole page, all content on the web page (whether it is used to meet other success criteria or not) must meet this success criterion. See Conformance Requirement 5: Non-Interference.",
  },
  {
    id: 41,
    principle: "Operable",
    title: "2.3.2 Three Flashes",
    content:
      "(Level AAA)\nWeb pages do not contain anything that flashes more than three times in any one second period.",
  },
  {
    id: 42,
    principle: "Operable",
    title: "2.3.3 Animation from Interactions",
    content:
      "(Level AAA)\nMotion animation triggered by interaction can be disabled, unless the animation is essential to the functionality or the information being conveyed.",
  },
  {
    id: 43,
    principle: "Operable",
    title: "2.4.1 Bypass Blocks",
    content:
      "(Level A)\nA mechanism is available to bypass blocks of content that are repeated on multiple web pages.",
  },
  {
    id: 44,
    principle: "Operable",
    title: "2.4.2 Page Titled",
    content: "(Level A)\nWeb pages have titles that describe topic or purpose.",
  },
  {
    id: 45,
    principle: "Operable",
    title: "2.4.3 Focus Order",
    content:
      "(Level A)\nIf a web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.",
  },
  {
    id: 46,
    principle: "Operable",
    title: "2.4.4 Link Purpose (In Context)",
    content:
      "(Level A)\nThe purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.",
  },
  {
    id: 47,
    principle: "Operable",
    title: "2.4.5 Multiple Ways",
    content:
      "(Level AA)\nMore than one way is available to locate a web page within a set of web pages except where the web page is the result of, or a step in, a process.",
  },
  {
    id: 48,
    principle: "Operable",
    title: "2.4.6 Headings and Labels",
    content: "(Level AA)\nHeadings and labels describe topic or purpose.",
  },
  {
    id: 49,
    principle: "Operable",
    title: "2.4.7 Focus Visible",
    content:
      "(Level AA)\nAny keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.",
  },
  {
    id: 50,
    principle: "Operable",
    title: "2.4.8 Location",
    content:
      "(Level AAA)\nInformation about the user's location within a set of web pages is available.",
  },
  {
    id: 51,
    principle: "Operable",
    title: "2.4.9 Link Purpose (Link Only)",
    content:
      "(Level AAA)\nA mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general.",
  },
  {
    id: 52,
    principle: "Operable",
    title: "2.4.10 Section Headings",
    content:
      '(Level AAA)\nSection headings are used to organize the content.\n\nNote 1\n"Heading" is used in its general sense and includes titles and other ways to add a heading to different types of content.\n\nNote 2\nThis success criterion covers sections within writing, not user interface components. User interface components are covered under Success Criterion 4.1.2.',
  },
  {
    id: 53,
    principle: "Operable",
    title: "2.4.11 Focus Not Obscured (Minimum)",
    content:
      "(Level AA) New\nWhen a user interface component receives keyboard focus, the component is not entirely hidden due to author-created content.\n\nNote 1\nWhere content in a configurable interface can be repositioned by the user, then only the initial positions of user-movable content are considered for testing and conformance of this success criterion.\n\nNote 2\nContent opened by the user may obscure the component receiving focus. If the user can reveal the focused component without advancing the keyboard focus, the component with focus is not considered visually hidden due to author-created content.",
  },
  {
    id: 54,
    principle: "Operable",
    title: "2.4.12 Focus Not Obscured (Enhanced)",
    content:
      "(Level AAA) New\nWhen a user interface component receives keyboard focus, no part of the component is hidden by author-created content.",
  },
  {
    id: 55,
    principle: "Operable",
    title: "2.4.13 Focus Appearance",
    content:
      "(Level AAA) New\nWhen the keyboard focus indicator is visible, an area of the focus indicator meets all the following:\n\nis at least as large as the area of a 2 CSS pixel thick perimeter of the unfocused component or sub-component, and\nhas a contrast ratio of at least 3:1 between the same pixels in the focused and unfocused states.\n\nExceptions:\n\nThe focus indicator is determined by the user agent and cannot be adjusted by the author, or\nThe focus indicator and the indicator's background color are not modified by the author.\n\nNote 1\nWhat is perceived as the user interface component or sub-component (to determine the perimeter) depends on its visual presentation. The visual presentation includes the component's visible content, border, and component-specific background. It does not include shadow and glow effects outside the component's content, background, or border.\n\nNote 2\nExamples of sub-components that may receive a focus indicator are menu items in an opened drop-down menu, or focusable cells in a grid.\n\nNote 3\nContrast calculations can be based on colors defined within the technology (such as HTML, CSS, and SVG). Pixels modified by user agent resolution enhancements and anti-aliasing can be ignored.",
  },
  {
    id: 56,
    principle: "Operable",
    title: "2.5.1 Pointer Gestures",
    content:
      "(Level A)\nAll functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.\n\nNote\nThis requirement applies to web content that interprets pointer actions (i.e., this does not apply to actions that are required to operate the user agent or assistive technology).",
  },
  {
    id: 57,
    principle: "Operable",
    title: "2.5.2 Pointer Cancellation",
    content:
      "(Level A)\nFor functionality that can be operated using a single pointer, at least one of the following is true:\n\nNo Down-Event\nThe down-event of the pointer is not used to execute any part of the function;\n\nAbort or Undo\nCompletion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion;\n\nUp Reversal\nThe up-event reverses any outcome of the preceding down-event;\n\nEssential\nCompleting the function on the down-event is essential.\n\nNote 1\nFunctions that emulate a keyboard or numeric keypad key press are considered essential.\n\nNote 2\nThis requirement applies to web content that interprets pointer actions (i.e., this does not apply to actions that are required to operate the user agent or assistive technology).",
  },
  {
    id: 58,
    principle: "Operable",
    title: "2.5.3 Label in Name",
    content:
      "(Level A)\nFor user interface components with labels that include text or images of text, the name contains the text that is presented visually.\n\nNote\nA best practice is to have the text of the label at the start of the name.",
  },
  {
    id: 59,
    principle: "Operable",
    title: "2.5.4 Motion Actuation",
    content:
      "(Level A)\nFunctionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:\n\nSupported Interface\nThe motion is used to operate functionality through an accessibility supported interface;\n\nEssential\nThe motion is essential for the function and doing so would invalidate the activity.",
  },
  {
    id: 60,
    principle: "Operable",
    title: "2.5.5 Target Size (Enhanced)",
    content:
      "(Level AAA)\nThe size of the target for pointer inputs is at least 44 by 44 CSS pixels except when:\n\nEquivalent\nThe target is available through an equivalent link or control on the same page that is at least 44 by 44 CSS pixels;\n\nInline\nThe target is in a sentence or block of text;\n\nUser Agent Control\nThe size of the target is determined by the user agent and is not modified by the author;\n\nEssential\nA particular presentation of the target is essential to the information being conveyed.",
  },
  {
    id: 61,
    principle: "Operable",
    title: "2.5.6 Concurrent Input Mechanisms",
    content:
      "(Level AAA)\nWeb content does not restrict use of input modalities available on a platform except where the restriction is essential, required to ensure the security of the content, or required to respect user settings.",
  },
  {
    id: 62,
    principle: "Operable",
    title: "2.5.7 Dragging Movements",
    content:
      "(Level AA) New\nAll functionality that uses a dragging movement for operation can be achieved by a single pointer without dragging, unless dragging is essential or the functionality is determined by the user agent and not modified by the author.\n\nNote\nThis requirement applies to web content that interprets pointer actions (i.e., this does not apply to actions that are required to operate the user agent or assistive technology).",
  },
  {
    id: 63,
    principle: "Operable",
    title: "2.5.8 Target Size (Minimum)",
    content:
      "(Level AA) New\nThe size of the target for pointer inputs is at least 24 by 24 CSS pixels, except when:\n\nSpacing\nUndersized targets (those less than 24 by 24 CSS pixels) are positioned so that if a 24 CSS pixel diameter circle is centered on the bounding box of each, the circles do not intersect another target or the circle for another undersized target;\n\nEquivalent\nThe function can be achieved through a different control on the same page that meets this criterion;\n\nInline\nThe target is in a sentence or its size is otherwise constrained by the line-height of non-target text;\n\nUser Agent Control\nThe size of the target is determined by the user agent and is not modified by the author;\n\nEssential\nA particular presentation of the target is essential or is legally required for the information being conveyed.",
  },
  {
    id: 64,
    principle: "Understandable",
    title: "3.1.1 Language of Page",
    content:
      "(Level A)\nThe default human language of each web page can be programmatically determined.",
  },
  {
    id: 65,
    principle: "Understandable",
    title: "3.1.2 Language of Parts",
    content:
      "(Level AA)\nThe human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.",
  },
  {
    id: 66,
    principle: "Understandable",
    title: "3.1.3 Unusual Words",
    content:
      "(Level AAA)\nA mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.",
  },
  {
    id: 67,
    principle: "Understandable",
    title: "3.1.4 Abbreviations",
    content:
      "(Level AAA)\nA mechanism for identifying the expanded form or meaning of abbreviations is available.",
  },
  {
    id: 68,
    principle: "Understandable",
    title: "3.1.5 Reading Level",
    content:
      "(Level AAA)\nWhen text requires reading ability more advanced than the lower secondary education level after removal of proper names and titles, supplemental content, or a version that does not require reading ability more advanced than the lower secondary education level, is available.",
  },
  {
    id: 69,
    principle: "Understandable",
    title: "3.1.6 Pronunciation",
    content:
      "(Level AAA)\nA mechanism is available for identifying specific pronunciation of words where meaning of the words, in context, is ambiguous without knowing the pronunciation.",
  },
  {
    id: 70,
    principle: "Understandable",
    title: "3.2.1 On Focus",
    content:
      "(Level A)\nWhen any user interface component receives focus, it does not initiate a change of context.",
  },
  {
    id: 71,
    principle: "Understandable",
    title: "3.2.2 On Input",
    content:
      "(Level A)\nChanging the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.",
  },
  {
    id: 72,
    principle: "Understandable",
    title: "3.2.3 Consistent Navigation",
    content:
      "(Level AA)\nNavigational mechanisms that are repeated on multiple web pages within a set of web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.",
  },
  {
    id: 73,
    principle: "Understandable",
    title: "3.2.4 Consistent Identification",
    content:
      "(Level AA)\nComponents that have the same functionality within a set of web pages are identified consistently.",
  },
  {
    id: 74,
    principle: "Understandable",
    title: "3.2.5 Change on Request",
    content:
      "(Level AAA)\nChanges of context are initiated only by user request or a mechanism is available to turn off such changes.",
  },
  {
    id: 75,
    principle: "Understandable",
    title: "3.2.6 Consistent Help",
    content:
      '(Level A) New\nIf a web page contains any of the following help mechanisms, and those mechanisms are repeated on multiple web pages within a set of web pages, they occur in the same order relative to other page content, unless a change is initiated by the user:\n\nHuman contact details;\nHuman contact mechanism;\nSelf-help option;\nA fully automated contact mechanism.\n\nNote 1\nHelp mechanisms may be provided directly on the page, or may be provided via a direct link to a different page containing the information.\n\nNote 2\nFor this success criterion, "the same order relative to other page content" can be thought of as how the content is ordered when the page is serialized. The visual position of a help mechanism is likely to be consistent across pages for the same page variation (e.g., CSS break-point). The user can initiate a change, such as changing the page\'s zoom or orientation, which may trigger a different page variation. This criterion is concerned with relative order across pages displayed in the same page variation (e.g., same zoom level and orientation).',
  },
  {
    id: 76,
    principle: "Understandable",
    title: "3.3.1 Error Identification",
    content:
      "(Level A)\nIf an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.",
  },
  {
    id: 77,
    principle: "Understandable",
    title: "3.3.2 Labels or Instructions",
    content:
      "(Level A)\nLabels or instructions are provided when content requires user input.",
  },
  {
    id: 78,
    principle: "Understandable",
    title: "3.3.3 Error Suggestion",
    content:
      "(Level AA)\nIf an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.",
  },
  {
    id: 79,
    principle: "Understandable",
    title: "3.3.4 Error Prevention (Legal, Financial, Data)",
    content:
      "(Level AA)\nFor web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true:\n\nReversible\nSubmissions are reversible.\n\nChecked\nData entered by the user is checked for input errors and the user is provided an opportunity to correct them.\n\nConfirmed\nA mechanism is available for reviewing, confirming, and correcting information before finalizing the submission.",
  },
  {
    id: 80,
    principle: "Understandable",
    title: "3.3.5 Help",
    content: "(Level AAA)\nContext-sensitive help is available.",
  },
  {
    id: 81,
    principle: "Understandable",
    title: "3.3.6 Error Prevention (All)",
    content:
      "(Level AAA)\nFor web pages that require the user to submit information, at least one of the following is true:\n\nReversible\nSubmissions are reversible.\n\nChecked\nData entered by the user is checked for input errors and the user is provided an opportunity to correct them.\n\nConfirmed\nA mechanism is available for reviewing, confirming, and correcting information before finalizing the submission.",
  },
  {
    id: 82,
    principle: "Understandable",
    title: "3.3.7 Redundant Entry",
    content:
      "(Level A) New\nInformation previously entered by or provided to the user that is required to be entered again in the same process is either:\n\nauto-populated, or\navailable for the user to select.\n\nExcept when:\n\nre-entering the information is essential,\nthe information is required to ensure the security of the content, or\npreviously entered information is no longer valid.",
  },
  {
    id: 83,
    principle: "Understandable",
    title: "3.3.8 Accessible Authentication (Minimum)",
    content:
      '(Level AA) New\nA cognitive function test (such as remembering a password or solving a puzzle) is not required for any step in an authentication process unless that step provides at least one of the following:\n\nAlternative\nAnother authentication method that does not rely on a cognitive function test.\n\nMechanism\nA mechanism is available to assist the user in completing the cognitive function test.\n\nObject Recognition\nThe cognitive function test is to recognize objects.\n\nPersonal Content\nThe cognitive function test is to identify non-text content the user provided to the website.\n\nNote 1\n"Object recognition" and "Personal content" may be represented by images, video, or audio.\n\nNote 2\nExamples of mechanisms that satisfy this criterion include:\nsupport for password entry by password managers to reduce memory need, and\ncopy and paste to reduce the cognitive burden of re-typing.',
  },
  {
    id: 84,
    principle: "Understandable",
    title: "3.3.9 Accessible Authentication (Enhanced)",
    content:
      "(Level AAA) New\nA cognitive function test (such as remembering a password or solving a puzzle) is not required for any step in an authentication process unless that step provides at least one of the following:\n\nAlternative\nAnother authentication method that does not rely on a cognitive function test.\n\nMechanism\nA mechanism is available to assist the user in completing the cognitive function test.",
  },
  {
    id: 85,
    principle: "Robust",
    title: "4.1.1 Parsing (Obsolete and removed)",
    content:
      "Note\nThis criterion was originally adopted to address problems that assistive technology had directly parsing HTML. Assistive technology no longer has any need to directly parse HTML. Consequently, these problems either no longer exist or are addressed by other criteria. This criterion no longer has utility and is removed.",
  },
  {
    id: 86,
    principle: "Robust",
    title: "4.1.2 Name, Role, Value",
    content:
      "(Level A)\nFor all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.\n\nNote\nThis success criterion is primarily for web authors who develop or script their own user interface components. For example, standard HTML controls already meet this success criterion when used according to specification.",
  },
  {
    id: 87,
    principle: "Robust",
    title: "4.1.3 Status Messages",
    content:
      "(Level AA)\nIn content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.",
  },
]
