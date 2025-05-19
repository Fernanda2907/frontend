export function setCookie(name: string, value: string, days: number) {
  const exp = new Date()
  exp.setDate(exp.getDate() + days)
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp.toUTCString()}; path=/; SameSite=Lax`
}

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";")
  for (let c of cookies) {
    const [k, v] = c.trim().split("=")
    if (k === name) return decodeURIComponent(v)
  }
  return null
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`
}