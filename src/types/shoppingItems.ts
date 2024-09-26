export type ShoppingItems = {
  id:number,
  name:string,
  category:string,
  subcategory:string,
  createdAt:string,
  updatedAt:string,
  price:number,
  sale_price?:number | null
}