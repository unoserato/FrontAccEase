import ErrorOne from "@/components/error-1"

export default function Unauthorized() {
  return (
    <div className="h-full w-full">
      <ErrorOne code="401" title="Unauthorized Response" />
    </div>
  )
}
