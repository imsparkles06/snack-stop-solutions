import { useState } from 'react';
import { X, User, Phone, Building, DoorOpen, QrCode, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CartItem } from '@/types/product';
import { orderFormSchema, OrderFormData } from '@/utils/validation';
import { toast } from 'sonner';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalAmount: number;
  onOrderComplete: () => void;
}

type CheckoutStep = 'form' | 'payment' | 'success';

export function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  totalAmount,
  onOrderComplete,
}: CheckoutModalProps) {
  const [step, setStep] = useState<CheckoutStep>('form');
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    hostel: '',
    room: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof OrderFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field: keyof OrderFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = orderFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof OrderFormData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof OrderFormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStep('payment');
  };

  const handlePaymentConfirm = async () => {
    setIsSubmitting(true);

    // Simulate API call - Replace with actual Firebase/EmailJS integration
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Here you would:
    // 1. Write to Firestore: collection('orders').add({ ...formData, cartItems, totalAmount, timestamp: new Date() })
    // 2. Send email via EmailJS: emailjs.send(SERVICE_ID, TEMPLATE_ID, { ... }, PUBLIC_KEY)

    console.log('Order submitted:', {
      ...formData,
      cartItems,
      totalAmount,
      paymentStatus: 'confirmed',
      timestamp: new Date(),
    });

    setIsSubmitting(false);
    setStep('success');
    toast.success('Order placed successfully!');
  };

  const handleClose = () => {
    if (step === 'success') {
      onOrderComplete();
    }
    setStep('form');
    setFormData({ name: '', phone: '', hostel: '', room: '' });
    setErrors({});
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 animate-scale-in rounded-2xl border border-border bg-background p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {step === 'form' && 'Checkout'}
            {step === 'payment' && 'Payment'}
            {step === 'success' && 'Order Confirmed!'}
          </h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Form Step */}
        {step === 'form' && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Full Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your name"
                className={errors.name ? 'border-destructive' : ''}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="10-digit mobile number"
                maxLength={10}
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hostel" className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                Hostel Name
              </Label>
              <Input
                id="hostel"
                value={formData.hostel}
                onChange={(e) => handleInputChange('hostel', e.target.value)}
                placeholder="e.g., Began Hostel"
                className={errors.hostel ? 'border-destructive' : ''}
              />
              {errors.hostel && (
                <p className="text-sm text-destructive">{errors.hostel}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="room" className="flex items-center gap-2">
                <DoorOpen className="h-4 w-4 text-muted-foreground" />
                Room Number
              </Label>
              <Input
                id="room"
                value={formData.room}
                onChange={(e) => handleInputChange('room', e.target.value)}
                placeholder="e.g., 301"
                className={errors.room ? 'border-destructive' : ''}
              />
              {errors.room && (
                <p className="text-sm text-destructive">{errors.room}</p>
              )}
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Order Total</span>
                <span className="text-lg font-bold text-primary">₹{totalAmount}</span>
              </div>
            </div>

            <Button type="submit" variant="warm" size="lg" className="w-full">
              Continue to Payment
            </Button>
          </form>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <div className="space-y-6">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
              <div className="mb-3 flex items-center justify-center gap-2 text-primary">
                <QrCode className="h-5 w-5" />
                <span className="font-semibold">Scan to Pay</span>
              </div>
              
              {/* QR Code Placeholder */}
              <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20">
                <div className="text-center">
                  <QrCode className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">UPI QR Code</p>
                  <p className="text-xs text-muted-foreground">(Configure in settings)</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="mb-2 text-center text-sm text-muted-foreground">Amount to Pay</p>
              <p className="text-center text-3xl font-bold text-primary">₹{totalAmount}</p>
            </div>

            <div className="space-y-3">
              <p className="text-center text-sm text-muted-foreground">
                After completing payment, click below to confirm
              </p>
              <Button
                variant="warm"
                size="lg"
                className="w-full"
                onClick={handlePaymentConfirm}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Payment Completed
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => setStep('form')}
                disabled={isSubmitting}
              >
                Go Back
              </Button>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-5xl">
              ✅
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                Order Placed Successfully!
              </h3>
              <p className="text-muted-foreground">
                Your snacks are on the way to <strong>Room {formData.room}</strong>
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">Order Summary</p>
              <div className="mt-2 space-y-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.emoji} {item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="mt-2 border-t border-border pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{totalAmount}</span>
                </div>
              </div>
            </div>
            <Button variant="default" size="lg" className="w-full" onClick={handleClose}>
              Done
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
