import HeaderTemplate from "@/components/common/PageTemplate"
import { coreModules } from "@/const/coreModules"
import { Link } from "react-router-dom"
import {
  CoreModuleCardTemplate,
  MOCK_MODULE_PROGRESS,
} from "../learner/Modules"

export default function LearningMaterials() {
  return (
    <section className="p-responsive">
      <HeaderTemplate
        title="Learning Materials"
        subtitle="Manage core learning modules and quizzes"
      />
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-foreground">Core Principles</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {coreModules.map((coreModule) => (
            <Link to={`./${coreModule.id}`} key={coreModule.id}>
              <CoreModuleCardTemplate
                module={coreModule}
                progress={MOCK_MODULE_PROGRESS[coreModule.id] ?? 0}
              />
            </Link>
          ))}
        </div>
      </section>
    </section>
  )
}
