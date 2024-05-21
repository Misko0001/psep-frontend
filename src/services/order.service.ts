import { useAxios } from "./main.service";

export class OrderService {

    static async getAllOrders() {
        return await useAxios('/order');
    }

    static async getOrder(id: number) {
        return await useAxios(`/order/${id}`);
    }

    static async saveOrder(data: any) {
        return await useAxios(`/order`, 'post', data);
    }

    static async updateOrder(id: number, data: any) {
        return await useAxios(`/order/${id}`, 'put', data);
    }

    static async deleteOrder(id: number) {
        return await useAxios(`/order/${id}`, 'delete');
    }

}