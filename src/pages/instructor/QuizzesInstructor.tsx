import QuizCardTemplate from "@/components/common/QuizCardTemplate"
import HeaderTemplate from "@/components/common/PageTemplate"
import SearchTemplate from "@/components/common/SearchTemplate"
import TooltipButtonTemplate from "@/components/common/TooltipButtonTemplate"
import { buttonVariants } from "@/components/ui/button"
import { quizzes } from "@/const/data"
import { Archive, FileQuestion, Filter } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function QuizzesInstructor() {
  const [search, setSearch] = useState("")

  const filteredQuizzes = quizzes.filter((quiz) => {
    if (search.trim().length > 0) {
      return (
        quiz.name.toLowerCase().includes(search.toLowerCase()) ||
        quiz.principle?.toLowerCase().includes(search.toLowerCase())
      )
    }
    return true
  })

  return (
    <section className="p-responsive space-y-4 sm:space-y-6">
      <HeaderTemplate
        title="Quizzes"
        subtitle="Design, publish, and monitor student evaluations."
        cta={[
          <Link
            to={"./new"}
            key="new-quiz"
            className={`${buttonVariants({ variant: "default" })} w-full justify-start`}
          >
            <FileQuestion />
            New Quiz
          </Link>,
        ]}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full flex-1 sm:max-w-md md:max-w-lg">
          <SearchTemplate
            search={search}
            setSearch={(e) => setSearch(e)}
            title="quizzes or principle"
          />
        </div>
        <div className="flex shrink-0 items-center justify-end gap-2">
          <TooltipButtonTemplate
            triggerTextIcon={<Filter />}
            triggerVariant="outline"
            content="Filter"
            onClick={() => alert("Filter")}
          />
          <TooltipButtonTemplate
            triggerTextIcon={<Archive />}
            triggerVariant="outline"
            content="Archived Quizzes"
            onClick={() => alert("Archived Quizzes")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        {/* <Link
          to="./new"
          className="group flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card/40 p-4 text-muted-foreground transition-all hover:border-primary/50 hover:bg-muted/30 hover:text-foreground"
        >
          <Plus className="h-4 w-4" />
          <span className="text-xs font-medium sm:text-sm">
            Create New Quiz
          </span>
        </Link> */}
        {filteredQuizzes.map((quiz) => (
          <QuizCardTemplate quiz={quiz} />
        ))}
      </div>
    </section>
  )
}
