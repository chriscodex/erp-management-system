import { Card, CardContent } from '@/components/ui/card';

export function StatCard({ title, value, icon }) {
  return (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className="text-primary p-3 bg-primary/10 rounded-full mr-4">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold">S/. {value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
