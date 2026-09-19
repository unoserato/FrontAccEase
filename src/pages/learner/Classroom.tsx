import PageTemplate from "@/components/common/PageTemplate"
import { Button } from "@/components/ui/button"
import { SiGoogleclassroom } from "react-icons/si"

export default function Classroom() {
  return (
    <section className="px-8 py-6">
      <PageTemplate
        cta={[
          <Button onClick={() => alert("Join Classroom")}>
            <SiGoogleclassroom />
            Join Classroom
          </Button>,
        ]}
      />
    </section>
  )
}
