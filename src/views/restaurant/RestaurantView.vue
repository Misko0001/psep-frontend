<script setup lang="ts">
import type { RestaurantModel } from '@/models/restaurant.model';
import { RestaurantService } from '@/services/restaurant.service';
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';

const restaurants = ref<RestaurantModel[]>();
RestaurantService.getAllRestaurants().then(rsp => restaurants.value = rsp.data);

async function removeRestaurant(model: RestaurantModel) {
    await RestaurantService.deleteRestaurant(model.restaurantId);
    restaurants.value = restaurants.value?.filter(obj => obj.restaurantId !== model.restaurantId);
}
</script>

<template>
    <div v-if="restaurants">
        <h3 class="h3">Restaurants</h3>
        <RouterLink class="btn btn-sm btn-success mb-2" to="/restaurant/new">
            <i class="fa-solid fa-plus"></i> Add new restaurant
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
                <tr v-for="obj in restaurants">
                    <th scope="row">{{ obj.restaurantId }}</th>
                    <td>{{ obj.restaurantName }}</td>
                    <td>{{ formatDate(obj.restaurantCreatedAt) }}</td>
                    <td>{{ formatDate(obj.restaurantUpdatedAt) }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink class="btn btn-sm btn-primary" :to="`/restaurant/${obj.restaurantId}`">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </RouterLink>
                            <button class="btn btn-sm btn-danger" @click="removeRestaurant(obj)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>Loading restaurants...</div>
</template>