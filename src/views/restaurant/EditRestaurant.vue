<script setup lang="ts">
import type { RestaurantModel } from '@/models/restaurant.model';
import { RestaurantService } from '@/services/restaurant.service';
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = Number.parseInt(route.params.id as any);
const restaurant = ref<RestaurantModel>();
RestaurantService.getRestaurant(id).then(rsp => restaurant.value = rsp.data);

function updateRestaurant() {
    RestaurantService.updateRestaurant(id, restaurant.value).then(rsp => {
        router.push({
            path: '/restaurant'
        });
    });
}

</script>

<template>
    <div v-if="restaurant">
        <h3 class="h3">Edit restaurant</h3>
        <div class="mb-3">
            <label for="id" class="form-label">Id:</label>
            <input type="number" class="form-control" id="id" :value="restaurant.restaurantId" disabled>
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="restaurant.restaurantName">
        </div>
        <div class="mb-3">
            <label for="created" class="form-label">Created at:</label>
            <input type="text" class="form-control" id="created" :value="formatDate(restaurant.restaurantCreatedAt)" disabled>
        </div>
        <div class="mb-4">
            <label for="updated" class="form-label">Updated at:</label>
            <input type="text" class="form-control" id="updated" :value="formatDate(restaurant.restaurantUpdatedAt)" disabled>
        </div>
        <RouterLink class="btn btn-danger mb-2" to="/restaurant">
            <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <button class="btn btn-success mb-2 ms-2" @click="updateRestaurant()">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </div>
    <div v-else>Loading restaurant...</div>
</template>