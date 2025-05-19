"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getUserInfo, logout } from "@/lib/auth"

type UserInfo = {
  name: string
  email: string
  cedula: string
  role: string
  joinDate: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getUserInfo()
        if (!user) return router.push("/")
        setUserInfo(user)
      } catch (error) {
        console.error("Error obteniendo usuario:", error)
        router.push("/")
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Error cerrando sesión:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 animate-pulse">Cargando perfil...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Perfil de Usuario</CardTitle>
          <CardDescription>Bienvenido a tu perfil personal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p><strong>Nombre:</strong> {userInfo?.name || "No disponible"}</p>
          <p><strong>Correo:</strong> {userInfo?.email || "No disponible"}</p>
          <p><strong>Cédula:</strong> {userInfo?.cedula || "No disponible"}</p>
          <p><strong>Rol:</strong> {userInfo?.role || "No disponible"}</p>
          <p><strong>Fecha de Registro:</strong> {userInfo?.joinDate || "No disponible"}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
