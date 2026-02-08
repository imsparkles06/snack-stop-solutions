import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function ProductCard({ product, quantity, onAdd, onRemove }: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-lg card-shadow animate-fade-in">
      {/* Emoji Background */}
      <div className="absolute -right-4 -top-4 text-7xl opacity-10 transition-transform duration-300 group-hover:scale-110">
        {product.emoji}
      </div>

      <div className="relative z-10">
        {/* Product Icon */}
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-4xl mx-auto">
          {product.emoji}
        </div>

        {/* Product Info */}
        <div className="text-center">
          <h3 className="mb-1 font-semibold text-foreground">{product.name}</h3>
          <p className="text-xl font-bold text-primary">₹{product.price}</p>
        </div>

        {/* Add to Cart */}
        <div className="mt-4">
          {quantity === 0 ? (
            <Button
              variant="default"
              className="w-full"
              onClick={onAdd}
            >
              <Plus className="h-4 w-4" />
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={onRemove}
                className="h-9 w-9"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center text-lg font-bold">{quantity}</span>
              <Button
                variant="default"
                size="icon"
                onClick={onAdd}
                className="h-9 w-9"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
