'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Package, TrendingUp, Users, Clipboard, Map, Edit } from 'lucide-react'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const warehouseData = {
  id: "ALM001",
  name: "Almacén Central",
  location: "Calle Principal 123, Ciudad Ejemplo",
  capacity: 10000,
  currentStock: 7500,
  manager: "Ana García",
  lastUpdated: "2023-11-15T14:30:00Z",
  status: "Activo",
  efficiency: 85,
}

const stockData = [
  { category: "Motocicletas", stock: 150 },
  { category: "Repuestos", stock: 3000 },
  { category: "Accesorios", stock: 2000 },
  { category: "Herramientas", stock: 1000 },
  { category: "Equipamiento", stock: 1350 },
]

const monthlyMovement = [
  { month: "Ene", entrada: 500, salida: 450 },
  { month: "Feb", entrada: 600, salida: 550 },
  { month: "Mar", entrada: 750, salida: 700 },
  { month: "Abr", entrada: 800, salida: 750 },
  { month: "May", entrada: 900, salida: 850 },
  { month: "Jun", entrada: 1000, salida: 950 },
]

export default function WarehouseDetailsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{warehouseData.name}</h1>
          <p className="text-muted-foreground">ID: {warehouseData.id}</p>
        </div>
        <Badge variant={warehouseData.status === "Activo" ? "success" : "destructive"}>
          {warehouseData.status}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="inventario">Inventario</TabsTrigger>
          <TabsTrigger value="movimientos">Movimientos</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Capacidad Total</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{warehouseData.capacity.toLocaleString()} unidades</div>
                <Progress
                  value={(warehouseData.currentStock / warehouseData.capacity) * 100}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {warehouseData.currentStock.toLocaleString()} en stock
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eficiencia</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{warehouseData.efficiency}%</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Basado en tiempo de procesamiento
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gerente</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{warehouseData.manager}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ubicación</CardTitle>
                <Map className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-md font-medium">{warehouseData.location}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inventario" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Inventario</CardTitle>
              <CardDescription>Desglose por categoría de producto</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="stock" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="movimientos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Movimientos Mensuales</CardTitle>
              <CardDescription>Entradas y salidas de inventario</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyMovement}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="entrada" fill="#10b981" name="Entradas" />
                  <Bar dataKey="salida" fill="#ef4444" name="Salidas" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline">
          <Clipboard className="mr-2 h-4 w-4" />
          Generar Reporte
        </Button>
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Editar Información
        </Button>
      </div>
    </div>
  )
}