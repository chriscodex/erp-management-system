import { Card, CardContent } from '@/components/ui/card';

export function QuickAccessCard({
  title,
  description,
  icon,
  linkText,
  linkHref,
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="text-primary p-2 bg-primary/10 rounded-full mr-3">
            {icon}
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <a
          href={linkHref}
          className="text-sm font-medium text-primary hover:underline"
        >
          {linkText} →
        </a>
      </CardContent>
    </Card>
  );
}
