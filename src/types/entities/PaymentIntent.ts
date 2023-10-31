export default interface PaymentIntent {
  id?: string;
  client_secret?: string;
  next_action?: {
    pix_display_qr_code?: {
      image_url_svg?: string;
      image_url_png?: string;
      expires_at?: Date;
      data?: string;
    };
  };
}
