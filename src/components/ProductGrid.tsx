import { ProductCard } from './ProductCard';
import { products } from '@/data/products';
import { Product } from '@/types/product';

interface ProductGridProps {
  getItemQuantity: (id: string) => number;
  onAdd: (product: Product) => void;
  onRemove: (productId: string) => void;
}

export function ProductGrid({ getItemQuantity, onAdd, onRemove }: ProductGridProps) {
  return (
    <section className="py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Tonight's Menu</h2>
        <p className="text-muted-foreground">Fresh snacks, delivered to your door</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={getItemQuantity(product.id)}
            onAdd={() => onAdd(product)}
            onRemove={() => onRemove(product.id)}
          />
        ))}
      </div>
    </section>
  );
}
