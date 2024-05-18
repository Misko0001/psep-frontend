<script setup lang="ts">
import { RestaurantService } from '@/services/restaurant.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const restaurant = ref<any>({
    name: ''
});

function saveRestaurant() {
    RestaurantService.saveRestaurant(restaurant.value).then(rsp => {
        router.push({
            path: '/restaurant'
        });
    });
}
</script>

<template>
    <div v-if="restaurant">
        <h3 class="h3">Create restaurant</h3>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="restaurant.restaurantName">
        </div>
        <RouterLink class="btn btn-danger mb-2" to="/restaurant">
            <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <button class="btn btn-success mb-2 ms-2" @click="saveRestaurant()">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </div>
    <div v-else>Loading restaurant...</div>
</template>