import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/types/product';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalAmount: number;
  onAdd: (productId: string) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
  storeIsOpen: boolean;
}

export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  totalAmount,
  onAdd,
  onRemove,
  onCheckout,
  storeIsOpen,
}: CartDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md animate-slide-in-right border-l border-border bg-background p-6 shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Your Cart</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 text-6xl">🛒</div>
                <p className="text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">
                  Add some late-night snacks!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-3"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl">
                      {item.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-primary">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onRemove(item.id)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="default"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onAdd(item.id)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="mt-6 border-t border-border pt-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{totalAmount}
                </span>
              </div>
              <Button
                variant="warm"
                size="xl"
                className="w-full"
                onClick={onCheckout}
                disabled={!storeIsOpen}
              >
                {storeIsOpen ? 'Proceed to Checkout' : 'Store Closed'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
