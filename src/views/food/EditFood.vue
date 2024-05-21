<script setup lang="ts">
import type { CategoryModel } from '@/models/category.model';
import type { FoodModel } from '@/models/food.model';
import type { RestaurantModel } from '@/models/restaurant.model';
import { CategoryService } from '@/services/category.service';
import { FoodService } from '@/services/food.service';
import { formatDate } from '@/services/main.service';
import { RestaurantService } from '@/services/restaurant.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = Number.parseInt(route.params.id as any);
const food = ref<FoodModel>();
FoodService.getFood(id).then(rsp => food.value = rsp.data);

const categories = ref<CategoryModel[]>();
CategoryService.getAllCategories().then(rsp => categories.value = rsp.data);

const restaurants = ref<RestaurantModel[]>();
RestaurantService.getAllRestaurants().then(rsp => restaurants.value = rsp.data);

function updateFood() {
    FoodService.updateFood(id, food.value).then(rsp => {
        router.push({
            path: '/food'
        });
    });
}

</script>

<template>
    <div v-if="food && categories && restaurants">
        <h3 class="h3">Edit food</h3>
        <div class="mb-3">
            <label for="id" class="form-label">Id:</label>
            <input type="number" class="form-control" id="id" :value="food.foodId" disabled>
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="food.foodName">
        </div>
        <div class="mb-3">
            <label for="category" class="form-label">Category:</label>
            <select class="form-select" v-model="food.foodCategoryId" id="categorie">
                <option v-for="obj in categories" :value="obj.categoryId">
                    {{ obj.categoryName }}
                </option>
            </select>
        </div>
        <div class="mb-3">
            <label for="restaurant" class="form-label">Restaurant:</label>
            <select class="form-select" v-model="food.foodRestaurantId" id="restaurant">
                <option v-for="obj in restaurants" :value="obj.restaurantId">
                    {{ obj.restaurantName }}
                </option>
            </select>
        </div>
        <div class="mb-3">
            <label for="created" class="form-label">Created at:</label>
            <input type="text" class="form-control" id="created" :value="formatDate(food.foodCreatedAt)" disabled>
        </div>
        <div class="mb-4">
            <label for="updated" class="form-label">Updated at:</label>
            <input type="text" class="form-control" id="updated" :value="formatDate(food.foodUpdatedAt)" disabled>
        </div>
        <RouterLink class="btn btn-danger mb-2" to="/food">
            <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <button class="btn btn-success mb-2 ms-2" @click="updateFood()">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </div>
    <div v-else>Loading food...</div>
</template>