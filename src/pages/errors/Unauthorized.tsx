import ErrorOne from "@/components/error-1"

export default function Unauthorized() {
  return (
    <div className="h-full w-full">
      <ErrorOne
        code="401"
        title="Unauthorized Response"
        description="This is a 401 page. And you are not allowed here, no matter what your password says."
      />
    </div>
  )
}
