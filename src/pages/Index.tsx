import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { ClosedBanner } from '@/components/ClosedBanner';
import { ProductGrid } from '@/components/ProductGrid';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { useCart } from '@/hooks/useCart';
import { useStoreHours } from '@/hooks/useStoreHours';
import { products } from '@/data/products';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { isOpen: storeIsOpen } = useStoreHours();
  
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getItemQuantity,
    totalAmount,
    totalItems,
  } = useCart();

  const handleAddFromCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    clearCart();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header totalItems={totalItems} onCartClick={() => setIsCartOpen(true)} />

      <main className="container py-8">
        <HeroBanner />
        
        {!storeIsOpen && <ClosedBanner />}

        <ProductGrid
          getItemQuantity={getItemQuantity}
          onAdd={addToCart}
          onRemove={removeFromCart}
        />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        totalAmount={totalAmount}
        onAdd={handleAddFromCart}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
        storeIsOpen={storeIsOpen}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalAmount={totalAmount}
        onOrderComplete={handleOrderComplete}
      />

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        <p>Made with 🌙 for late-night snackers</p>
        <p className="mt-1">The Snack Stop • Room 502 • Began Hostel</p>
      </footer>
    </div>
  );
};

export default Index;
