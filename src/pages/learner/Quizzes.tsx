import LearnerQuizCardTemplate from "@/components/common/LearnerQuizCardTemplate"
import HeaderTemplate from "@/components/common/PageTemplate"
import { quizzes } from "@/const/data"

export default function Quizzes() {
  return (
    <section className="p-responsive space-y-6">
      <HeaderTemplate
        title="Quizzes"
        subtitle="Access active quizzes and review archived assessments."
      />
      <LearnerQuizCardTemplate quizzes={quizzes} title="Due" />
    </section>
  )
}
