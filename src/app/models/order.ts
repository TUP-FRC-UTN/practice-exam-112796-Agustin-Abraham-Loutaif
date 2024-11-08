import { PostProduct } from "./postProduct";

export interface Order {
    id: string,
    customerName: string,
    email: string,
    products: PostProduct[],
    total: number,
    orderCode?: string,
    timestamp?: string
}
