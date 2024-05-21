<script setup lang="ts">
import type { FoodModel } from '@/models/food.model';
import { FoodService } from '@/services/food.service';
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';

const foods = ref<FoodModel[]>();
FoodService.getAllFoods().then(rsp => foods.value = rsp.data);

async function removeFood(model: FoodModel) {
    await FoodService.deleteFood(model.foodId);
    foods.value = foods.value?.filter(obj => obj.foodId !== model.foodId);
}
</script>

<template>
    <div v-if="foods">
        <h3 class="h3">Foods</h3>
        <RouterLink class="btn btn-sm btn-success mb-2" to="/food/new">
            <i class="fa-solid fa-plus"></i> Add new food
        </RouterLink>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Restaurant</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Updated at</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in foods">
                    <th scope="row">{{ obj.foodId }}</th>
                    <td>{{ obj.foodName }}</td>
                    <td>{{ obj.foodCategory.categoryName }}</td>
                    <td>{{ obj.foodRestaurant.restaurantName }}</td>
                    <td>{{ formatDate(obj.foodCreatedAt) }}</td>
                    <td>{{ formatDate(obj.foodUpdatedAt) }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink class="btn btn-sm btn-primary" :to="`/food/${obj.foodId}`">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </RouterLink>
                            <button class="btn btn-sm btn-danger" @click="removeFood(obj)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>Loading foods...</div>
</template>