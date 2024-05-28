<script setup lang="ts">
import type { FoodModel } from '@/models/food.model';
import { FoodOrderService } from '@/services/food-order.service';
import { FoodService } from '@/services/food.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const id = Number.parseInt(route.params.id as any);
const foodOrder = ref<any>({
    foodOrderOrderId: id,
    foodOrderFoodId: 0,
    foodOrderAmount: 1
});

const foods = ref<FoodModel[]>();
FoodService.getAllFoods().then(rsp => {
    foods.value = rsp.data;
    foodOrder.value.foodOrderFoodId = rsp.data[0].foodOrderFoodId;
});

function saveFoodOrder() {
    FoodOrderService.saveFoodOrder(foodOrder.value).then(rsp => {
        router.push({
            path: `/order/${id}/food-order`
        });
    });
}
</script>

<template>
    <div v-if="foodOrder && foods" class="new-edit">
        <h3 class="h3">Add to order {{ id }}</h3>
        <div class="mb-3">
            <label for="order" class="form-label">Order:</label>
            <input type="text" class="form-control" id="name" v-model="id" disabled>
        </div>
        <div class="mb-3">
            <label for="food" class="form-label">Food:</label>
            <select class="form-select" v-model="foodOrder.foodOrderFoodId" id="food">
                <option v-for="obj in foods" :value="obj.foodId">
                    {{ obj.foodName }}
                </option>
            </select>
        </div>
        <div class="mb-3">
            <label for="amount" class="form-label">Amount:</label>
            <input type="number" min="1" class="form-control" id="amount" v-model="foodOrder.foodOrderAmount">
        </div>
        <RouterLink class="btn btn-danger mb-2" :to="`/order/${id}/food-order`">
            <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <button class="btn btn-success mb-2 ms-2" @click="saveFoodOrder()">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </div>
    <div v-else>Loading order...</div>
</template>