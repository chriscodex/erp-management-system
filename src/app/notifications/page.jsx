import NotificationsSection from "@/app/notifications/_components/notifications-sections"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Notificaciones</h1>
          <p className="text-gray-600">Mantente al día con las notificaciones</p>
        </div>

        <div className="grid grid-cols-1">
          <div className="flex justify-center">
            <NotificationsSection />
          </div>
        </div>
      </div>
    </div>
  )
}
