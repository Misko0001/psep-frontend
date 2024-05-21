import type { CategoryModel } from "./category.model";
import type { RestaurantModel } from "./restaurant.model";

export interface FoodModel {
    foodId: number;
    foodName: string;
    foodCreatedAt: string;
    foodUpdatedAt: string;
    foodCategoryId: number;
    foodCategory: CategoryModel;
    foodRestaurantId: number;
    foodRestaurant: RestaurantModel;
}