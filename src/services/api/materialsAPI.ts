const api = import.meta.env.VITE_API_URL

export async function getModulesAPI(): Promise<
  { title: string; principle: string; content: object }[]
> {
  const response = await fetch(`${api}/helper/get-all-module`)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || "Error fetching modules")
  }

  const data = await response.json()
  return data.data
}

export async function createModuleAPI(module: {
  title: string
  principle: string
  content: object
}) {
  const response = await fetch(`${api}/helper/create-module`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(module),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || "Error creating module")
  }

  return response.json()
}
