import { useAxios } from "./main.service";

export class RestaurantService {

    static async getAllRestaurants() {
        return await useAxios('/restaurant');
    }

    static async getRestaurant(id: number) {
        return await useAxios(`/restaurant/${id}`);
    }

    static async saveRestaurant(data: any) {
        return await useAxios(`/restaurant`, 'post', data);
    }

    static async updateRestaurant(id: number, data: any) {
        return await useAxios(`/restaurant/${id}`, 'put', data);
    }

    static async deleteRestaurant(id: number) {
        return await useAxios(`/restaurant/${id}`, 'delete');
    }

}