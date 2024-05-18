import { useAxios } from "./main.service";

export class CategoryService {

    static async getAllCategories() {
        return await useAxios('/category');
    }

    static async getCategory(id: number) {
        return await useAxios(`/category/${id}`);
    }

    static async saveCategory(data: any) {
        return await useAxios(`/category`, 'post', data);
    }

    static async updateCategory(id: number, data: any) {
        return await useAxios(`/category/${id}`, 'put', data);
    }

    static async deleteCategory(id: number) {
        return await useAxios(`/category/${id}`, 'delete');
    }

}