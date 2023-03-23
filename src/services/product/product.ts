import http from 'src/utils/http';

export interface IProduct {
  id: number;
  image_url: string;
  measure: string;
  name: string;
  price: string;
  size: string;
}

export interface IEnegryValue {
  carbs: string;
  count: string;
  fats: string;
  protein: string;
}

export interface IProductInfo {
  id: number;
  full_image_url: string;
  manufacturer: string;
  measure: string;
  name: string;
  price: string;
  size: string;
  storage_conditions: string;
  energy_value: IEnegryValue;
  compounding: string;
  additional: [];
}

export const getProductsBySubCategory = async (
  subcategory_id: number,
): Promise<IProduct[] | undefined> => {
  try {
    const {data} = await http.get(`/subcategories/${subcategory_id}/products`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductInfoById = async (
  productId: number,
): Promise<IProductInfo | undefined> => {
  try {
    const {data} = await http.get(`/products/${productId}/info`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
