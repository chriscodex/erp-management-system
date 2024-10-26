'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, Tag, DollarSign, Truck, BarChart } from 'lucide-react'

export default function AddProductPage() {
  const [product, setProduct] = useState({
    category: '',
    brand: '',
    name: '',
    description: '',
    supplier: '',
    unit: '',
    stock: '',
    minStock: '',
    purchasePrice: '',
    salePrice: ''
  })

  const handleChange = (field, value) => {
    setProduct(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Product data:', product)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Agregar Producto</CardTitle>
          <CardDescription>Complete los detalles del nuevo producto a continuación.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Detalles básicos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoría</Label>
                  <Select onValueChange={(value) => handleChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motos">Motos</SelectItem>
                      <SelectItem value="repuestos">Repuestos</SelectItem>
                      <SelectItem value="accesorios">Accesorios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Select onValueChange={(value) => handleChange('brand', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar marca" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="yamaha">Yamaha</SelectItem>
                      <SelectItem value="suzuki">Suzuki</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Producto</Label>
                <Input
                  id="name"
                  placeholder="Ingrese el nombre del producto"
                  value={product.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describa el producto"
                  value={product.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Inventario</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="unit">Unidades</Label>
                  <Select onValueChange={(value) => handleChange('unit', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar unidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unidad">Unidad</SelectItem>
                      <SelectItem value="par">Par</SelectItem>
                      <SelectItem value="litro">Litro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="Cantidad en stock"
                    value={product.stock}
                    onChange={(e) => handleChange('stock', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">Stock mínimo</Label>
                  <Input
                    id="minStock"
                    type="number"
                    placeholder="Stock mínimo"
                    value={product.minStock}
                    onChange={(e) => handleChange('minStock', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Precios y proveedor</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchasePrice">Precio de compra</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      id="purchasePrice"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={product.purchasePrice}
                      onChange={(e) => handleChange('purchasePrice', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salePrice">Precio de venta</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <Input
                      id="salePrice"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={product.salePrice}
                      onChange={(e) => handleChange('salePrice', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Proveedor</Label>
                <Select onValueChange={(value) => handleChange('supplier', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proveedor1">Proveedor 1</SelectItem>
                    <SelectItem value="proveedor2">Proveedor 2</SelectItem>
                    <SelectItem value="proveedor3">Proveedor 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full">
              <Package className="mr-2 h-4 w-4" /> Agregar Producto
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}