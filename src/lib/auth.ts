import { setCookie, getCookie, deleteCookie } from "./session"

const MOCK_CREDENTIALS = { email: "usuario@ejemplo.com", password: "contraseña123" }
const MOCK_USER = { id: "usr_123456", name: "Usuario de Prueba", email: "usuario@ejemplo.com", role: "Usuario", joinDate: "01/01/2023" }

export async function loginUser(email: string, password: string) {
  await new Promise((r) => setTimeout(r, 1000))
  if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
    const token = "token_simulado"
    setCookie("auth_token", token, 7)
    return true
  }
  return false
}

export async function getUserInfo() {
  const token = getCookie("auth_token")
  if (!token) return null
  await new Promise((r) => setTimeout(r, 500))
  return MOCK_USER
}

export async function logout() {
  deleteCookie("auth_token")
}