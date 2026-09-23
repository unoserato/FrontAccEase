import HeaderTemplate from "@/components/common/PageTemplate"
import { ContinueLearningCard } from "./Modules"
import { EarnedBagdes } from "./CoreModulesView"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, FileQuestion } from "lucide-react"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import { classroomQuizzes } from "./Classroom"
import LearnerQuizCardTemplate from "@/components/common/LearnerQuizCardTemplate"

const progress = [
  { name: "Perceivable", value: 80 },
  { name: "Operable", value: 80 },
  { name: "Understandable", value: 80 },
  { name: "Robust", value: 80 },
]

export default function Dashboard() {
  return (
    <section className="p-responsive capitalize">
      <HeaderTemplate title={`Dashboard`} />
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2 space-y-6">
          <div className="space-y-4">
            <ContinueLearningCard />
          </div>
          {classroomQuizzes.length > 0 ? (
            <LearnerQuizCardTemplate quizzes={classroomQuizzes} />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-10 text-center">
              <FileQuestion className="mb-2 size-8 text-muted-foreground/50" />
              <p className="text-sm font-medium text-muted-foreground">
                No quizzes stored in this classroom.
              </p>
            </div>
          )}
        </div>
        <aside className="col-span-1 space-y-4">
          <EarnedBagdes />
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-foreground">
                <Award className="size-5" />
                <CardTitle className="text-base font-bold sm:text-lg">
                  Earned Badges
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 p-4 pt-0 sm:p-5 sm:pt-0">
              {progress.map((principle) => (
                <div className="space-y-2">
                  <Progress value={principle.value} className={`w-full`}>
                    <ProgressLabel>{principle.name}</ProgressLabel>
                    <ProgressValue />
                  </Progress>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </section>
    </section>
  )
}
