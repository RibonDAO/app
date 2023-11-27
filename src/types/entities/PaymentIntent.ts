export default interface PaymentIntent {
  id?: string;
  clientSecret?: string;
  nextAction?: {
    pixDisplayQrCode?: {
      imageUrSvg?: string;
      imageUrlPng?: string;
      expiresAt?: Date;
      data?: string;
    };
  };
}
