import { setCookie, getCookie, deleteCookie } from "./session"

const API_BASE_URL = "https://backend-production-6d35.up.railway.app" // <-- Ajusta con tu dominio real

export async function loginUser(email: string, password: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    console.log("Response:", response) // Debugging line

    if (!response.ok) return false

    const data = await response.json()
    const token = data.token
    setCookie("auth_token", token, 7) // Guardamos el token
    return true
  } catch (error) {
    console.error("Error en loginUser:", error)
    return false
  }
}

export async function getUserInfo(): Promise<any | null> {
  const token = getCookie("auth_token")
  if (!token) return null

  try {
    const response = await fetch(`${API_BASE_URL}/userinfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) return null

    const user = await response.json()
    return user
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error)
    return null
  }
}

export async function logout(): Promise<void> {
  deleteCookie("auth_token")
}