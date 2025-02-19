interface PayPalButtonConfig {
  createOrder: () => Promise<string>;
  onApprove: (data: any) => Promise<void>;
  onCancel?: () => void;
  onError?: (error: any) => void;
}

interface PayPalNamespace {
  Buttons: (config: PayPalButtonConfig) => {
    render: (element: HTMLElement) => Promise<void>;
  };
}

declare global {
  interface Window {
    paypal: PayPalNamespace;
  }
}
