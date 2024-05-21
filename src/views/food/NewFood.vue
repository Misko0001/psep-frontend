<script setup lang="ts">
import type { CategoryModel } from '@/models/category.model';
import type { RestaurantModel } from '@/models/restaurant.model';
import { CategoryService } from '@/services/category.service';
import { FoodService } from '@/services/food.service';
import { RestaurantService } from '@/services/restaurant.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const food = ref<any>({
    foodName: '',
    foodCategoryId: 0,
    foodRestaurantId: 0
});

const categories = ref<CategoryModel[]>();
CategoryService.getAllCategories().then(rsp => {
    categories.value = rsp.data;
    food.value.foodCategoryId = rsp.data[0].foodCategoryId;
});

const restaurants = ref<RestaurantModel[]>();
RestaurantService.getAllRestaurants().then(rsp => {
    restaurants.value = rsp.data;
    food.value.foodRestaurantId = rsp.data[0].foodRestaurantId;
});

function saveFood() {
    FoodService.saveFood(food.value).then(rsp => {
        router.push({
            path: '/food'
        });
    });
}
</script>

<template>
    <div v-if="food">
        <h3 class="h3">Create food</h3>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="food.foodName">
        </div>
        <div class="mb-3" v-if="categories">
            <label for="category" class="form-label">Category:</label>
            <select class="form-select" v-model="food.foodCategoryId" id="categorie">
                <option v-for="obj in categories" :value="obj.categoryId">
                    {{ obj.categoryName }}
                </option>
            </select>
        </div>
        <div class="mb-3" v-if="restaurants">
            <label for="restaurant" class="form-label">Restaurant:</label>
            <select class="form-select" v-model="food.foodRestaurantId" id="restaurant">
                <option v-for="obj in restaurants" :value="obj.restaurantId">
                    {{ obj.restaurantName }}
                </option>
            </select>
        </div>
        <RouterLink class="btn btn-danger mb-2" to="/food">
            <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <button class="btn btn-success mb-2 ms-2" @click="saveFood()">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </div>
    <div v-else>Loading food...</div>
</template>