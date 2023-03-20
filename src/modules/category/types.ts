export interface ICategory {
  id: number;
  name: string;
  subcategories: ISubCategory[];
}
export interface ISubCategory {
  id: number;
  image_url: string;
  name: string;
}
