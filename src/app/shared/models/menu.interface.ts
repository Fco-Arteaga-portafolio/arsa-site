export interface MenuResponse {
  code: number;
  status: string;
  data: MenuData;
  message: string;
}

export interface MenuData {
  branch: Branch;
  menus: Menu[];
}

export interface Branch {
  id: number;
  name: string;
  description: string;
  phone: string;
  url_image: string;
}

export interface Menu {
  id: number;
  name: string;
  description: string;
  sections: Section[];
}

export interface Section {
  category_id: number;
  category_name: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  offer_price: number | null;
  is_offer_active: boolean;
  url_image: string;
  images: { id: number; url_image: string }[];
}
