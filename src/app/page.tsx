"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginUser } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const success = await loginUser(email, password)
      if (success) router.push("/profile")
      else setError("Credenciales inválidas. Inténtalo de nuevo.")
    } catch {
      setError("Error durante el inicio de sesión.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>Ingresa tus credenciales</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Procesando..." : "Iniciar Sesión"}</Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm">Usuario de prueba: usuario@ejemplo.com / contraseña123</p>
        </CardFooter>
      </Card>
    </div>
  )
}