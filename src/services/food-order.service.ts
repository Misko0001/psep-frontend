import { useAxios } from "./main.service";

export class FoodOrderService {

    static async getAllFoodOrders() {
        return await useAxios('/food-order');
    }

    static async getFoodOrder(id: number) {
        return await useAxios(`/food-order/${id}`);
    }

    static async getFoodOrdersByOrder(id: number) {
        return await useAxios(`/food-order/order/${id}`);
    }

    static async saveFoodOrder(data: any) {
        return await useAxios(`/food-order`, 'post', data);
    }

    static async updateFoodOrder(id: number, data: any) {
        return await useAxios(`/food-order/${id}`, 'put', data);
    }

    static async deleteFoodOrder(id: number) {
        return await useAxios(`/food-order/${id}`, 'delete');
    }

}