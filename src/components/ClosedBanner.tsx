import { Moon, Clock } from 'lucide-react';
import { useStoreHours } from '@/hooks/useStoreHours';

export function ClosedBanner() {
  const { getTimeUntilOpen } = useStoreHours();
  const hoursUntil = getTimeUntilOpen();

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center animate-fade-in">
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-5xl animate-float">
        🌙
      </div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        It's Late Night!
      </h2>
      <p className="mb-4 text-muted-foreground">
        Delivery is currently available <strong className="text-primary">in-room only</strong>.
      </p>
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary">
        <Moon className="h-4 w-4" />
        Visit Room 502 for snacks!
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        {hoursUntil && (
          <span>Opens in ~{hoursUntil} hour{hoursUntil > 1 ? 's' : ''} (5 PM)</span>
        )}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Store Hours: 5:00 PM – 1:00 AM
      </p>
    </div>
  );
}
