import ErrorOne from "@/components/error-1"

export default function Forbidden() {
  return (
    <div className="h-full w-full">
      <ErrorOne
        code="403"
        title="Forbidden"
        description="You don't have permission to access this page."
      />
    </div>
  )
}
