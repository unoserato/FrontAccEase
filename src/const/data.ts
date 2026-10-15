import type { Classwork, QuizSubmissionProps } from "./materialsProps"

export type Role = "learner" | "instructor" | "admin"

export interface UserProps {
  id: string
  name: string
  role: Role
  img: string
}

export const user: UserProps = {
  id: "0223-2127",
  name: "John Mark Boragay",
  role: "learner",
  img: "",
}

export const learners: UserProps[] = [
  {
    id: "1234-1234",
    name: "Rene Clert Baterbonia",
    role: "learner",
    img: "https://cf-images.assettype.com/sunstar%2F2026-06-16%2Fg6llfxiy%2FRENE-CLERT-BATERBONIA?w=640&auto=format%2Ccompress",
  },
  {
    id: "1233-1233",
    name: "Divine Adili",
    role: "learner",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuiUj56VGtklGJA3F-rc285WPO_MOs2wJ2ETva28DInPemGbQeKfkQf_w&s=10",
  },
  {
    id: "1235-1235",
    name: "Alyssa Nicole Santos",
    role: "learner",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "1236-1236",
    name: "Marc Ethan Villanueva",
    role: "learner",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "1237-1237",
    name: "Sophia Isabel Reyes",
    role: "learner",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "1238-1238",
    name: "Joshua Miguel Dela Cruz",
    role: "learner",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
]

export const instructors: UserProps[] = [
  {
    id: "inst-1",
    name: "Dr. Evelyn Reed",
    role: "instructor",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "inst-2",
    name: "Prof. Alan Turing",
    role: "instructor",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "inst-3",
    name: "Sarah Jenkins",
    role: "instructor",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  },
]

// export const classrooms: ClassroomProps[] = [
//   {
//     id: "1",
//     classroomCode: "WCAG-101",
//     name: "Web Accessibility Fundamentals",
//     joinCode: "wcag81",
//     learners: ["1234-1234"],
//     created_by: "inst-1",
//   },
//   {
//     id: "2",
//     classroomCode: "UIUX-202",
//     name: "Inclusive UI/UX Engineering",
//     joinCode: "uiux92",
//     learners: ["1233-1233"],
//     created_by: "inst-1",
//   },
//   {
//     id: "3",
//     classroomCode: "CS-401",
//     name: "Frontend Systems & Architecture",
//     joinCode: "cs401x",
//     learners: ["1235-1235"],
//     created_by: "inst-2",
//   },
//   {
//     id: "4",
//     classroomCode: "QA-102",
//     name: "Software Quality & Compliance Testing",
//     joinCode: "qa102p",
//     learners: ["1236-1236"],
//     created_by: "inst-2",
//   },
//   {
//     id: "5",
//     classroomCode: "MOB-301",
//     name: "Mobile Assistive Technology Lab",
//     joinCode: "mob301",
//     learners: ["1237-1237"],
//     created_by: "inst-3",
//   },
//   {
//     id: "6",
//     classroomCode: "DIGI-501",
//     name: "Digital Inclusivity Workshop",
//     joinCode: "digi50",
//     learners: ["1238-1238"],
//     created_by: "inst-3",
//   },
// ]

// export const modules: ModuleProps[] = [
//   {
//     id: "1",
//     name: "Life and Works of Rene Baterbonia",
//     content: {
//       type: "doc",
//       content: [
//         {
//           type: "heading",
//           attrs: { level: 2 },
//           content: [{ type: "text", text: "Introduction & Overview" }],
//         },
//         {
//           type: "paragraph",
//           content: [
//             {
//               type: "text",
//               text: "This module explores the life, achievements, and contributions of ",
//             },
//             {
//               type: "text",
//               marks: [{ type: "bold" }],
//               text: "Rene Clert Baterbonia",
//             },
//             {
//               type: "text",
//               text: " in web development and digital accessibility.",
//             },
//           ],
//         },
//         {
//           type: "heading",
//           attrs: { level: 3 },
//           content: [{ type: "text", text: "Key Learning Objectives" }],
//         },
//         {
//           type: "bulletList",
//           content: [
//             {
//               type: "listItem",
//               content: [
//                 {
//                   type: "paragraph",
//                   content: [
//                     {
//                       type: "text",
//                       text: "Understand the principles of Perceivable design (WCAG 2.1).",
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               type: "listItem",
//               content: [
//                 {
//                   type: "paragraph",
//                   content: [
//                     {
//                       type: "text",
//                       text: "Analyze non-text content alternatives and text equivalents.",
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               type: "listItem",
//               content: [
//                 {
//                   type: "paragraph",
//                   content: [
//                     {
//                       type: "text",
//                       text: "Apply semantic markup techniques in React applications.",
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: "paragraph",
//           content: [
//             {
//               type: "text",
//               marks: [{ type: "italic" }],
//               text: "Note: Always test screen reader compatibility using ARIA labels and alt text.",
//             },
//           ],
//         },
//       ],
//     },
//     created_at: "Aug 31 2026 17:00:00 GMT+0800",
//     principle: "Perceivable",
//     tags: ["1.1.1 Non-Text Content"],
//     classroom_id: ["1", "2", "3", "4"],
//     created_by: "inst-1",
//   },
//   {
//     id: "2",
//     name: "Mushoku Tensei",
//     content: {
//       type: "doc",
//       content: [
//         {
//           type: "heading",
//           attrs: { level: 2 },
//           content: [
//             {
//               type: "text",
//               text: "Module Overview: Media & Audio-Visual Accessibility",
//             },
//           ],
//         },
//         {
//           type: "paragraph",
//           content: [
//             {
//               type: "text",
//               text: "In this section, we examine media content handling and ",
//             },
//             {
//               type: "text",
//               marks: [{ type: "bold" }],
//               text: "WCAG 1.2.1 Guidelines",
//             },
//             {
//               type: "text",
//               text: " for audio-only and video-only media playback.",
//             },
//           ],
//         },
//         {
//           type: "heading",
//           attrs: { level: 3 },
//           content: [{ type: "text", text: "Core Concepts" }],
//         },
//         {
//           type: "bulletList",
//           content: [
//             {
//               type: "listItem",
//               content: [
//                 {
//                   type: "paragraph",
//                   content: [
//                     {
//                       type: "text",
//                       text: "Providing full text transcripts for pre-recorded audio.",
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               type: "listItem",
//               content: [
//                 {
//                   type: "paragraph",
//                   content: [
//                     {
//                       type: "text",
//                       text: "Adding audio descriptions for silent video-only media.",
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     created_at: "Aug 31 2026 17:00:00 GMT+0800",
//     principle: "Perceivable",
//     tags: ["1.1.1 Non-Text Content"],
//     classroom_id: ["1"],
//     created_by: "inst-2",
//   },
//   {
//     id: "3",
//     name: "Life and Works of Divine General Adili",
//     content: {
//       type: "doc",
//       content: [
//         {
//           type: "heading",
//           attrs: { level: 2 },
//           content: [{ type: "text", text: "Historical & Strategic Analysis" }],
//         },
//         {
//           type: "paragraph",
//           content: [
//             { type: "text", text: "A comprehensive study on " },
//             {
//               type: "text",
//               marks: [{ type: "bold" }],
//               text: "Divine General Adili",
//             },
//             {
//               type: "text",
//               text: " detailing strategic execution, leadership frameworks, and accessible content presentation.",
//             },
//           ],
//         },
//         {
//           type: "bulletList",
//           content: [
//             {
//               type: "listItem",
//               content: [
//                 {
//                   type: "paragraph",
//                   content: [
//                     {
//                       type: "text",
//                       text: "Leadership principles and systemic design patterns.",
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               type: "listItem",
//               content: [
//                 {
//                   type: "paragraph",
//                   content: [
//                     {
//                       type: "text",
//                       text: "Ensuring proper contrast ratios for text readability.",
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     created_at: "Aug 31 2026 17:00:00 GMT+0800",
//     principle: "Perceivable",
//     tags: ["1.1.1 Non-Text Content"],
//     classroom_id: ["1"],
//     created_by: "inst-1",
//   },
//   {
//     id: "4",
//     name: "That time I got reincarnated as a slime.",
//     content: {
//       type: "doc",
//       content: [
//         {
//           type: "heading",
//           attrs: { level: 2 },
//           content: [
//             { type: "text", text: "Perceivable Media & Multimedia Guidelines" },
//           ],
//         },
//         {
//           type: "paragraph",
//           content: [
//             { type: "text", text: "This module breaks down " },
//             {
//               type: "text",
//               marks: [{ type: "bold" }],
//               text: "WCAG 1.1.1 & 1.2.1",
//             },
//             {
//               type: "text",
//               text: " compliance requirements for multimedia, animations, and image alternatives.",
//             },
//           ],
//         },
//         {
//           type: "heading",
//           attrs: { level: 3 },
//           content: [{ type: "text", text: "Implementation Checklist" }],
//         },
//         {
//           type: "bulletList",
//           content: [
//             {
//               type: "listItem",
//               content: [
//                 {
//                   type: "paragraph",
//                   content: [
//                     {
//                       type: "text",
//                       text: "Informative images must have concise, descriptive alt attributes.",
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               type: "listItem",
//               content: [
//                 {
//                   type: "paragraph",
//                   content: [
//                     {
//                       type: "text",
//                       text: "Decorative images must use empty alt='' or role='presentation'.",
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               type: "listItem",
//               content: [
//                 {
//                   type: "paragraph",
//                   content: [
//                     {
//                       type: "text",
//                       text: "Video controls must be keyboard operable and screen-reader accessible.",
//                     },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     created_at: "Aug 31 2026 17:00:00 GMT+0800",
//     principle: "Perceivable",
//     tags: [
//       "1.2.1 Audio-only and Video-only ",
//       "1.1.1 Non-Text Content",
//       "1.2.1 Audio-only and Video-only ",
//     ],
//     classroom_id: ["1"],
//     created_by: "inst-3",
//   },
// ]

export const classworks: Classwork[] = [
  {
    id: "1",
    classroomId: "1",
    name: "Quiz about Bobet Mr. MVP",
    due: "Sep 01 2026 19:41:18 GMT+0800",
    submissions: [
      {
        userId: "1234-1234",
        content: "",
        score: 0,
      },
      {
        userId: "1233-1233",
        content: "",
        score: 0,
      },
    ],
  },
  {
    id: "2",
    classroomId: "1",
    name: "Quiz about Bobet Mr. MVP",
    due: "",
    submissions: [
      {
        userId: "1234-1234",
        content: "",
        score: 0,
      },
    ],
  },
]

// export const quizzes: QuizProps[] = [
//   {
//     id: "1",
//     name: "UI Quiz 1",
//     status: "Open",
//     submissionsCount: 35,
//     totalSubmissions: 59,
//     dueDate: "Aug 27, 2026",
//     classrooms: ["1", "2"],
//     theme: "FlatDark",
//     created_at: "Aug 31 2026 17:00:00 GMT+0800",
//     principle: "Perceivable",
//     questionsCount: 4,
//     maxAttempts: 3,
//     tags: ["1.1.1 Non-Text Content", "1.2.1 Audio-only and Video-only"],
//     content: {
//       title: "UI Quiz 1",
//       description:
//         "Assessment on WCAG 2.1 Perceivable guidelines including Non-Text Content and Media alternatives.",
//       showQuestionNumbers: "on",
//       showProgressBar: true,
//       timeLimit: 20,
//       showTimer: true,
//       pages: [
//         {
//           name: "page1",
//           title: "Section 1: Non-Text Content (1.1.1)",
//           elements: [
//             {
//               type: "radiogroup",
//               name: "q_1",
//               title:
//                 "What is the primary purpose of an alt attribute on an informative image?",
//               choices: [
//                 "To provide a text equivalent for screen readers and search engines",
//                 "To make the image load faster",
//                 "To change the background color of the web page",
//                 "To create a popup tooltip when hovered",
//               ],
//               correctAnswer:
//                 "To provide a text equivalent for screen readers and search engines",
//               isRequired: true,
//             },
//             {
//               type: "boolean",
//               name: "q_2",
//               title:
//                 "Decorative images should have an empty alt attribute (alt='') or role='presentation'.",
//               correctAnswer: true,
//               isRequired: true,
//             },
//             {
//               type: "checkbox",
//               name: "q_3",
//               title:
//                 "Which of the following are valid techniques for accessible images? (Select all that apply)",
//               choices: [
//                 "Using descriptive alt text for informative images",
//                 "Leaving alt attributes missing on essential icons",
//                 "Using aria-hidden='true' for purely decorative icons",
//                 "Writing image filenames into alt text",
//               ],
//               correctAnswer: [
//                 "Using descriptive alt text for informative images",
//                 "Using aria-hidden='true' for purely decorative icons",
//               ],
//               isRequired: true,
//             },
//           ],
//         },
//         {
//           name: "page2",
//           title: "Section 2: Audio & Video Media (1.2.1)",
//           elements: [
//             {
//               type: "radiogroup",
//               name: "q_4",
//               title:
//                 "What alternative is required for pre-recorded audio-only content under WCAG 1.2.1?",
//               choices: [
//                 "A full text transcript",
//                 "Sign language video only",
//                 "Audio description track",
//                 "Background music",
//               ],
//               correctAnswer: "A full text transcript",
//               isRequired: true,
//             },
//           ],
//         },
//       ],
//     },
//   },
//   {
//     id: "2",
//     name: "Operable & Keyboard Navigation Evaluation",
//     author: "Prof. Alan Turing",
//     created_by: "inst-2",
//     status: "Open",
//     passingRate: 88,
//     avgScore: 79,
//     submissionsCount: 42,
//     totalSubmissions: 59,
//     dueDate: "Sep 10, 2026",
//     classrooms: ["1"],
//     theme: "Soft",
//     created_at: "Sep 05 2026 14:30:00 GMT+0800",
//     principle: "Operable",
//     questionsCount: 4,
//     maxAttempts: 3,
//     tags: ["2.1.1 Keyboard", "2.4.7 Focus Visible"],
//     content: {
//       title: "Operable & Keyboard Navigation Evaluation",
//       description:
//         "Evaluation covering keyboard accessibility, focus management, and interactive element control.",
//       showQuestionNumbers: "on",
//       showProgressBar: true,
//       timeLimit: 30,
//       showTimer: true,
//       pages: [
//         {
//           name: "page1",
//           title: "Section 1: Keyboard Accessibility (2.1.1)",
//           elements: [
//             {
//               type: "radiogroup",
//               name: "q_1",
//               title:
//                 "Which key allows users to move forward through interactive elements on a web page?",
//               choices: ["Tab", "Enter", "Spacebar", "Escape"],
//               correctAnswer: "Tab",
//               isRequired: true,
//             },
//             {
//               type: "boolean",
//               name: "q_2",
//               title:
//                 "All functionality of the content must be operable through a keyboard interface without requiring specific timings for individual keystrokes.",
//               correctAnswer: true,
//               isRequired: true,
//             },
//             {
//               type: "dropdown",
//               name: "q_3",
//               title:
//                 "What happens if an interactive element causes a keyboard trap?",
//               choices: [
//                 "The user cannot move focus away using standard keyboard controls",
//                 "The browser closes automatically",
//                 "The element turns red",
//                 "Screen readers automatically skip the section",
//               ],
//               correctAnswer:
//                 "The user cannot move focus away using standard keyboard controls",
//               isRequired: true,
//             },
//           ],
//         },
//         {
//           name: "page2",
//           title: "Section 2: Focus Visible (2.4.7)",
//           elements: [
//             {
//               type: "radiogroup",
//               name: "q_4",
//               title:
//                 "Why is CSS outline: none on focused elements harmful to accessibility when not replaced?",
//               choices: [
//                 "It hides focus indicator for keyboard users",
//                 "It breaks screen reader voice synthesis",
//                 "It stops form submission",
//                 "It changes font sizing",
//               ],
//               correctAnswer: "It hides focus indicator for keyboard users",
//               isRequired: true,
//             },
//           ],
//         },
//       ],
//     },
//   },
// ]

export const quizSubmissions: QuizSubmissionProps[] = [
  // Submissions for UI Quiz 1 (totalPoints: 50)
  {
    id: "sub-101",
    quizId: "1",
    learnerId: "1234-1234",
    content: {
      q_1: "Web Content Accessibility Guidelines",
    },
    score: 48,
    submittedAt: "Aug 26, 2026 14:20 GMT+0800",
  },
  {
    id: "sub-102",
    quizId: "1",
    learnerId: "1233-1233",
    content: {
      q_1: "Web Content Accessibility Guidelines",
    },
    score: 44,
    submittedAt: "Aug 27, 2026 09:15 GMT+0800",
  },
  {
    id: "sub-103",
    quizId: "1",
    learnerId: "1235-1235",
    content: {
      q_1: "Web Content Accessibility Guidelines",
    },
    score: 50,
    submittedAt: "Aug 27, 2026 11:30 GMT+0800",
  },
  {
    id: "sub-104",
    quizId: "1",
    learnerId: "1237-1237",
    content: {
      q_1: "Web Content Accessibility Guidelines",
    },
    score: 38,
    submittedAt: "Aug 27, 2026 16:45 GMT+0800",
  },
  // Submissions for Operable & Keyboard Navigation Evaluation (totalPoints: 75)
  {
    id: "sub-201",
    quizId: "2",
    learnerId: "1234-1234",
    content: {
      q_1: "Keyboard navigation guidelines",
    },
    score: 70,
    submittedAt: "Sep 08, 2026 11:45 GMT+0800",
  },
  {
    id: "sub-202",
    quizId: "2",
    learnerId: "1233-1233",
    content: {
      q_1: "Keyboard navigation guidelines",
    },
    score: 65,
    submittedAt: "Sep 09, 2026 15:10 GMT+0800",
  },
  {
    id: "sub-203",
    quizId: "2",
    learnerId: "1235-1235",
    content: {
      q_1: "Keyboard navigation guidelines",
    },
    score: 72,
    submittedAt: "Sep 10, 2026 08:30 GMT+0800",
  },
]

export interface ClassLogItem {
  id: string
  scans: number
  className: string
  code: string
  enrolled: number
  passRate: string
  flaggedCount: number
  avgDuration: string
}

export const instructorClassLogs: ClassLogItem[] = [
  {
    id: "1",
    scans: 100,
    className: "ITEP 306 - UI / UX and Cross Platform Technologies",
    code: "ITEP-306",
    enrolled: 42,
    passRate: "82.4%",
    flaggedCount: 35,
    avgDuration: "9.8s",
  },
  {
    id: "2",
    scans: 120,
    className: "WCAG 101 - Web Accessibility Fundamentals",
    code: "WCAG-101",
    enrolled: 38,
    passRate: "76.5%",
    flaggedCount: 52,
    avgDuration: "10.4s",
  },
  {
    id: "3",
    scans: 85,
    className: "UIUX 202 - Inclusive UI/UX Engineering",
    code: "UIUX-202",
    enrolled: 45,
    passRate: "88.1%",
    flaggedCount: 22,
    avgDuration: "11.2s",
  },
  {
    id: "4",
    scans: 115,
    className: "CS 401 - Advanced Web Accessibility Auditing",
    code: "CS-401",
    enrolled: 29,
    passRate: "71.0%",
    flaggedCount: 64,
    avgDuration: "10.1s",
  },
  {
    id: "5",
    scans: 100,
    className: "ITEP 308 - Assistive Technology Integration",
    code: "ITEP-308",
    enrolled: 50,
    passRate: "79.8%",
    flaggedCount: 32,
    avgDuration: "10.6s",
  },
]
