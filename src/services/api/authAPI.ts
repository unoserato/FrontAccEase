const api = import.meta.env.VITE_API_URL

export async function meAPI() {
  const response = await fetch(`${api}/auth/me`)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || "No User")
  }

  return response.json()
}

export async function loginAPI(credentials: {
  email: string
  password: string
}) {
  const response = await fetch(`${api}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || "Error Logging in")
  }

  return response.json()
}

export async function logoutAPI() {}
export async function signupAPI() {}
