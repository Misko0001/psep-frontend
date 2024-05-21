import type { FoodModel } from "./food.model";
import type { OrderModel } from "./order.model";

export interface FoodOrderModel {
    foodOrderId: number;
    foodOrderCreatedAt: string;
    foodOrderUpdatedAt: string;
    foodOrderFoodId: number;
    foodOrderFood: FoodModel;
    foodOrderOrderId: number;
    foodOrderOrder: OrderModel;
    foodOrderAmount: number;
}