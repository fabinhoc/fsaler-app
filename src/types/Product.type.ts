import { CategoryType } from './Category.type';
import { InventoryType } from './Inventory.type';

export interface ProductType {
  id: number;
  uuid: string;
  name: string;
  ean: string;
  cost_price: number;
  price: number;
  purchase_date: string;
  description: string;
  category: CategoryType;
  inventory: InventoryType;
  image: string;
  created_at: Date;
  updated_at: Date;
}
