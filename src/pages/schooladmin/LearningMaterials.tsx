import HeaderTemplate from "@/components/common/PageTemplate"
import PourCurriculum from "./PourCurriculum"
// import { coreModules } from "@/const/coreModules"
// import { Link } from "react-router-dom"
// import { CoreModuleCardTemplate } from "../learner/Modules"

export default function LearningMaterials() {
  return (
    <section className="p-responsive">
      <HeaderTemplate
        title="Learning Materials"
        subtitle="Manage student learning modules and existing core materials"
      />
      <PourCurriculum />
      <section className="mt-12 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Existing Core Materials</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* {coreModules.map((coreModule) => (
            <Link to={`./${coreModule.id}`} key={coreModule.id}>
              <CoreModuleCardTemplate
                module={coreModule}
                progress={MOCK_MODULE_PROGRESS[coreModule.id] ?? 0}
              />
            </Link>
          ))} */}
        </div>
      </section>
    </section>
  )
}
