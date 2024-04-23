export interface ProductDto {
  name: string | null;
  ean: string | null;
  category_id: number | null;
  price: number | null;
  cost_price: number | null;
  description: string | null;
  purchase_date: string | undefined | null;
  quantity: number | null;
}
