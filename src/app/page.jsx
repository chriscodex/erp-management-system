// 'use client';

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import {
//   Bike,
//   DollarSign,
//   Package,
//   TrendingUp,
//   Users,
//   Building,
//   Tag,
//   List,
// } from 'lucide-react';
// import { RiHome2Line } from '@remixicon/react';

// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { NavbarSimple } from '@/components/navbar/NavbarSimple';
// import { Label } from '@/components/ui/label';

// // Datos simulados para los gráficos
// const salesData = [
//   { name: 'Ene', ventas: 4000 },
//   { name: 'Feb', ventas: 3000 },
//   { name: 'Mar', ventas: 5000 },
//   { name: 'Abr', ventas: 4500 },
//   { name: 'May', ventas: 6000 },
//   { name: 'Jun', ventas: 5500 },
// ];

// const inventoryData = [
//   { name: 'Motos', cantidad: 120 },
//   { name: 'Prod.', cantidad: 300 },
//   { name: 'Rep.', cantidad: 500 },
// ];

// export default function HomePage() {
//   return (
//     <NavbarSimple title="Inicio">
//       <div className="container mx-auto p-4">
//         <div className="flex items-center gap-2 my-4">
//           <RiHome2Line className="h-9 w-9" />
//           <Label className="sm:text-4xl text-xl font-bold">Inicio</Label>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <StatCard title="Total Motos" value="1,234" icon={<Bike />} />
//           <StatCard
//             title="Ingresos Mensuales"
//             value="$123,456"
//             icon={<DollarSign />}
//           />
//           <StatCard
//             title="Productos en Stock"
//             value="5,678"
//             icon={<Package />}
//           />
//           <StatCard
//             title="Crecimiento Anual"
//             value="12.3%"
//             icon={<TrendingUp />}
//           />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           <Card>
//             <CardHeader>
//               <CardTitle>Ventas Mensuales</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={salesData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="ventas" fill="#3b82f6" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>

//           <Card className="col-span-2">
//             <CardHeader>
//               <CardTitle>Distribución de Inventario</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={inventoryData} layout="vertical">
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis type="number" />
//                   <YAxis dataKey="name" type="category" />
//                   <Tooltip />
//                   <Bar dataKey="cantidad" fill="#10b981" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           <QuickAccessCard
//             title="Gestión de Usuarios"
//             description="Administra usuarios y permisos"
//             icon={<Users className="h-6 w-6" />}
//             linkText="Ver Usuarios"
//             linkHref="/usuarios"
//           />
//           <QuickAccessCard
//             title="Empresas"
//             description="Gestiona las sub empresas"
//             icon={<Building className="h-6 w-6" />}
//             linkText="Sub Empresas"
//             linkHref="/empresas"
//           />
//           <QuickAccessCard
//             title="Marcas"
//             description="Administra las marcas de los productos"
//             icon={<Tag className="h-6 w-6" />}
//             linkText="Gestionar"
//             linkHref="/inventario/marcas"
//           />
//           <QuickAccessCard
//             title="Inventario de Motos"
//             description="Gestiona el inventario de motos"
//             icon={<Bike className="h-6 w-6" />}
//             linkText="Ver Inventario"
//             linkHref="/inventario/motos"
//           />
//           <QuickAccessCard
//             title="Productos Generales"
//             description="Administra otros productos y accesorios"
//             icon={<Package className="h-6 w-6" />}
//             linkText="Ver Productos"
//             linkHref="/inventario/productos"
//           />
//           <QuickAccessCard
//             title="Movimientos de Inventario"
//             description="Registra entradas y salidas de productos"
//             icon={<List className="h-6 w-6" />}
//             linkText="Ver Movimientos"
//             linkHref="/movimientos"
//           />
//         </div>
//       </div>
//     </NavbarSimple>
//   );
// }

// function StatCard({ title, value, icon }) {
//   return (
//     <Card>
//       <CardContent className="flex items-center p-6">
//         <div className="text-primary p-3 bg-primary/10 rounded-full mr-4">
//           {icon}
//         </div>
//         <div>
//           <p className="text-sm font-medium text-muted-foreground">{title}</p>
//           <h3 className="text-2xl font-bold">{value}</h3>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// function QuickAccessCard({ title, description, icon, linkText, linkHref }) {
//   return (
//     <Card>
//       <CardContent className="p-6">
//         <div className="flex items-center mb-4">
//           <div className="text-primary p-2 bg-primary/10 rounded-full mr-3">
//             {icon}
//           </div>
//           <h3 className="font-semibold">{title}</h3>
//         </div>
//         <p className="text-sm text-muted-foreground mb-4">{description}</p>
//         <a
//           href={linkHref}
//           className="text-sm font-medium text-primary hover:underline"
//         >
//           {linkText} →
//         </a>
//       </CardContent>
//     </Card>
//   );
// }

export default function Home() {
  return (
    <div className="container mx-auto p-6">
      <p>Cargando...</p>
    </div>
  );
}