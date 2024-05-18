<script setup lang="ts">
import type { CategoryModel } from '@/models/category.model';
import { CategoryService } from '@/services/category.service';
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';

const categories = ref<CategoryModel[]>();
CategoryService.getAllCategories().then(rsp => categories.value = rsp.data);

async function removeCategory(model: CategoryModel) {
    await CategoryService.deleteCategory(model.categoryId);
    categories.value = categories.value?.filter(obj => obj.categoryId !== model.categoryId);
}
</script>

<template>
    <div v-if="categories">
        <h3 class="h3">Categories</h3>
        <RouterLink class="btn btn-sm btn-success mb-2" to="/category/new">
            <i class="fa-solid fa-plus"></i> Add new category
        </RouterLink>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Updated at</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in categories">
                    <th scope="row">{{ obj.categoryId }}</th>
                    <td>{{ obj.categoryName }}</td>
                    <td>{{ formatDate(obj.categoryCreatedAt) }}</td>
                    <td>{{ formatDate(obj.categoryUpdatedAt) }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink class="btn btn-sm btn-primary" :to="`/category/${obj.categoryId}`">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </RouterLink>
                            <button class="btn btn-sm btn-danger" @click="removeCategory(obj)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>Loading categories...</div>
</template>