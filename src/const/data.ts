import type { ClassroomProps } from "./materialsProps"

export interface UserProps {
  name: string
  role: "learner" | "instructor" | "admin"
}

export const user: UserProps = {
  name: "John Mark Boragay",
  role: "instructor",
}

export const classrooms: ClassroomProps[] = [
  {
    id: "1",
    classroom_code: "PUP Baskbetballers",
    name: "Swimming Lesson",
    join_code: "jasd81",
    learners: [
      { name: "Rene Clert Baterbonia", role: "learner" },
      { name: "Divine Adili", role: "learner" },
    ],
  },
  {
    id: "2",
    classroom_code: "PUP Baskbetballers",
    name: "Swimming Lesson",
    join_code: "jasd81",
    learners: [
      { name: "Rene Clert Baterbonia", role: "learner" },
      { name: "Divine Adili", role: "learner" },
    ],
  },
  {
    id: "3",
    classroom_code: "PUP Baskbetballers",
    name: "Swimming Lesson",
    join_code: "jasd81",
    learners: [
      { name: "Rene Clert Baterbonia", role: "learner" },
      { name: "Divine Adili", role: "learner" },
    ],
  },
  {
    id: "4",
    classroom_code: "PUP Baskbetballers",
    name: "Swimming Lesson",
    join_code: "jasd81",
    learners: [
      { name: "Rene Clert Baterbonia", role: "learner" },
      { name: "Divine Adili", role: "learner" },
    ],
  },
  {
    id: "5",
    classroom_code: "PUP Baskbetballers",
    name: "Swimming Lesson",
    join_code: "jasd81",
    learners: [
      { name: "Rene Clert Baterbonia", role: "learner" },
      { name: "Divine Adili", role: "learner" },
    ],
  },
  {
    id: "6",
    classroom_code: "PUP Baskbetballers",
    name: "Swimming Lesson",
    join_code: "jasd81",
    learners: [
      { name: "Rene Clert Baterbonia", role: "learner" },
      { name: "Divine Adili", role: "learner" },
    ],
  },
]
