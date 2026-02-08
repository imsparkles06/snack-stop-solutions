import { Moon, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStoreHours } from '@/hooks/useStoreHours';

interface HeaderProps {
  totalItems: number;
  onCartClick: () => void;
}

export function Header({ totalItems, onCartClick }: HeaderProps) {
  const { isOpen } = useStoreHours();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-2xl">
            🌙
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">
              <span className="text-gradient">The Snack Stop</span>
            </h1>
            <p className="text-xs text-muted-foreground">Room 502</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${
                isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}
            />
            <span className="text-sm text-muted-foreground">
              {isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>

          <Button
            variant="cart"
            size="icon"
            onClick={onCartClick}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
