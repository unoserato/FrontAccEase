import HeaderTemplate from "@/components/common/PageTemplate"
import { useParams } from "react-router-dom"

export default function LearningMaterialsView() {
  const { principleId } = useParams()
  return (
    <section className="p-responsive">
      <HeaderTemplate title={principleId} backTo="/admin/learning-materials" />
    </section>
  )
}
