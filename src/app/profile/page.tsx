"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getUserInfo, logout } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUserInfo()
      if (!user) return router.push("/")
      setUserInfo(user)
      setLoading(false)
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  if (loading) return <p className="text-center mt-10">Cargando...</p>

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Perfil de Usuario</CardTitle>
          <CardDescription>Bienvenido a tu perfil personal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>Nombre:</strong> {userInfo.name}</p>
          <p><strong>Correo:</strong> {userInfo.email}</p>
          <p><strong>Rol:</strong> {userInfo.role}</p>
          <p><strong>Fecha de Registro:</strong> {userInfo.joinDate}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={handleLogout}>Cerrar Sesión</Button>
        </CardFooter>
      </Card>
    </div>
  )
}