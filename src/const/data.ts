import type {
  ClassroomProps,
  Classwork,
  ModuleProps,
  QuizProps,
} from "./materialsProps"

export interface UserProps {
  id: string
  name: string
  role: "learner" | "instructor" | "admin"
  img: string
}

export const user: UserProps = {
  id: "0223-2127",
  name: "John Mark Boragay",
  role: "instructor",
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
]

export const classrooms: ClassroomProps[] = [
  {
    id: "1",
    classroom_code: "PUP Baskbetballers",
    name: "Swimming Lesson Swimming Lesson Swimming Lesson",
    join_code: "jasd81",
    learners: ["1234-1234", "1233-1233"],
  },
  {
    id: "2",
    classroom_code: "PUP Baskbetballers",
    name: "Swimming Lesson",
    join_code: "jasd81",
    learners: ["1234-1234", "1233-1233"],
  },
  {
    id: "3",
    classroom_code: "PUP Baskbetballers",
    name: "Swimming Lesson",
    join_code: "jasd81",
    learners: ["1234-1234", "1233-1233"],
  },
  {
    id: "4",
    classroom_code: "PUP Baskbetballers",
    name: "Swimming Lesson",
    join_code: "jasd81",
    learners: ["1234-1234", "1233-1233"],
  },
  {
    id: "5",
    classroom_code: "PUP Baskbetballers",
    name: "Swimming Lesson",
    join_code: "jasd81",
    learners: ["1234-1234", "1233-1233"],
  },
  {
    id: "6",
    classroom_code: "PUP Baskbetballers",
    name: "Swimming Lesson",
    join_code: "jasd81",
    learners: ["1234-1234", "1233-1233"],
  },
]

export const modules: ModuleProps[] = [
  {
    id: "1",
    name: "Life and Works of Rene Baterbonia",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Introduction & Overview" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This module explores the life, achievements, and contributions of ",
            },
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: "Rene Clert Baterbonia",
            },
            {
              type: "text",
              text: " in web development and digital accessibility.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [{ type: "text", text: "Key Learning Objectives" }],
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
                      text: "Understand the principles of Perceivable design (WCAG 2.1).",
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
                      text: "Analyze non-text content alternatives and text equivalents.",
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
                      text: "Apply semantic markup techniques in React applications.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [{ type: "italic" }],
              text: "Note: Always test screen reader compatibility using ARIA labels and alt text.",
            },
          ],
        },
      ],
    },
    created_at: "Aug 31 2026 17:00:00 GMT+0800",
    principle: "Perceivable",
    tags: ["1.1.1 Non-Text Content"],
    classrooms: ["1"],
  },
  {
    id: "2",
    name: "Mushoku Tensei",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            {
              type: "text",
              text: "Module Overview: Media & Audio-Visual Accessibility",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "In this section, we examine media content handling and ",
            },
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: "WCAG 1.2.1 Guidelines",
            },
            {
              type: "text",
              text: " for audio-only and video-only media playback.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [{ type: "text", text: "Core Concepts" }],
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
                      text: "Providing full text transcripts for pre-recorded audio.",
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
                      text: "Adding audio descriptions for silent video-only media.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    created_at: "Aug 31 2026 17:00:00 GMT+0800",
    principle: "Perceivable",
    tags: ["1.1.1 Non-Text Content"],
    classrooms: ["1"],
  },
  {
    id: "3",
    name: "Life and Works of Divine General Adili",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Historical & Strategic Analysis" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "A comprehensive study on " },
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: "Divine General Adili",
            },
            {
              type: "text",
              text: " detailing strategic execution, leadership frameworks, and accessible content presentation.",
            },
          ],
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
                      text: "Leadership principles and systemic design patterns.",
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
                      text: "Ensuring proper contrast ratios for text readability.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    created_at: "Aug 31 2026 17:00:00 GMT+0800",
    principle: "Perceivable",
    tags: ["1.1.1 Non-Text Content"],
    classrooms: ["1"],
  },
  {
    id: "4",
    name: "That time I got reincarnated as a slime.",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [
            { type: "text", text: "Perceivable Media & Multimedia Guidelines" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "This module breaks down " },
            {
              type: "text",
              marks: [{ type: "bold" }],
              text: "WCAG 1.1.1 & 1.2.1",
            },
            {
              type: "text",
              text: " compliance requirements for multimedia, animations, and image alternatives.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 3 },
          content: [{ type: "text", text: "Implementation Checklist" }],
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
                      text: "Informative images must have concise, descriptive alt attributes.",
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
                      text: "Decorative images must use empty alt='' or role='presentation'.",
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
                      text: "Video controls must be keyboard operable and screen-reader accessible.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    created_at: "Aug 31 2026 17:00:00 GMT+0800",
    principle: "Perceivable",
    tags: [
      "1.2.1 Audio-only and Video-only ",
      "1.1.1 Non-Text Content",
      "1.2.1 Audio-only and Video-only ",
    ],
    classrooms: ["1"],
  },
]

export const classworks: Classwork[] = [
  {
    id: "1",
    classroom_id: "1",
    name: "Quiz about Bobet Mr. MVP",
    due: "Sep 01 2026 19:41:18 GMT+0800",
    submissions: [
      {
        user_id: "1234-1234",
        content: "",
        score: 0,
      },
      {
        user_id: "1233-1233",
        content: "",
        score: 0,
      },
    ],
  },
  {
    id: "2",
    classroom_id: "1",
    name: "Quiz about Bobet Mr. MVP",
    due: "",
    submissions: [
      {
        user_id: "1234-1234",
        content: "",
        score: 0,
      },
    ],
  },
]

export const quizzes: QuizProps[] = [
  {
    id: "1",
    name: "UI Quiz 1",
    author: "You",
    status: "Open",
    passing_rate: 92,
    avg_score: 84,
    submissions_count: 35,
    total_submissions: 59,
    due_date: "Aug 27, 2026",
    availability: "Everyone",
    created_at: "Aug 31 2026 17:00:00 GMT+0800",
    principle: "Perceivable",
    questions_count: 10,
    time_limit: 20,
    total_points: 50,
    tags: ["1.1.1 Non-Text Content", "1.2.1 Audio-only and Video-only"],
  },
  {
    id: "2",
    name: "Operable & Keyboard Navigation Evaluation",
    author: "You",
    status: "Open",
    passing_rate: 88,
    avg_score: 79,
    submissions_count: 42,
    total_submissions: 59,
    due_date: "Sep 10, 2026",
    availability: "Everyone",
    created_at: "Sep 05 2026 14:30:00 GMT+0800",
    principle: "Operable",
    questions_count: 15,
    time_limit: 30,
    total_points: 75,
    tags: ["2.1.1 Keyboard", "2.4.7 Focus Visible"],
  },
]
