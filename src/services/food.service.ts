import { useAxios } from "./main.service";

export class FoodService {

    static async getAllFoods() {
        return await useAxios('/food');
    }

    static async getFood(id: number) {
        return await useAxios(`/food/${id}`);
    }

    static async saveFood(data: any) {
        return await useAxios(`/food`, 'post', data);
    }

    static async updateFood(id: number, data: any) {
        return await useAxios(`/food/${id}`, 'put', data);
    }

    static async deleteFood(id: number) {
        return await useAxios(`/food/${id}`, 'delete');
    }

}