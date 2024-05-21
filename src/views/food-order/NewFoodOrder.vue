<script setup lang="ts">
import type { OrderModel } from '@/models/order.model';
import type { FoodModel } from '@/models/food.model';
import { OrderService } from '@/services/order.service';
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
    foodOrderAmountId: 0
});

const orders = ref<OrderModel[]>();
OrderService.getAllOrders().then(rsp => {
    orders.value = rsp.data;
    foodOrder.value.foodOrderOrderId = rsp.data[0].foodOrderOrderId;
});

const foods = ref<FoodModel[]>();
FoodService.getAllFoods().then(rsp => {
    foods.value = rsp.data;
    foodOrder.value.foodOrderFoodId = rsp.data[0].foodOrderFoodId;
});

function saveFoodOrder() {
    FoodOrderService.saveFoodOrder(foodOrder.value).then(rsp => {
        router.push({
            path: '/food-order'
        });
    });
}
</script>

<template>
    <div v-if="foodOrder && foods">
        <h3 class="h3">Add to order {{ id }}</h3>
        <div class="mb-3">
            <label for="order" class="form-label">Order:</label>
            <input type="text" class="form-control" id="name" v-model="id" disabled>
        </div>
        <div class="mb-3">
            <label for="food" class="form-label">Food:</label>
            <select class="form-select" v-model="foodOrder.foodOrderFoodName" id="food">
                <option v-for="obj in foods" :value="obj.foodId">
                    {{ obj.foodName }}
                </option>
            </select>
        </div>
        <div class="mb-3">
            <label for="amount" class="form-label">Amount:</label>
            <input type="number" min="1" class="form-control" id="amount" v-model="foodOrder.foodOrderAmount">
        </div>
        <RouterLink class="btn btn-danger mb-2" :to="`/food-order/order/${id}`">
            <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <button class="btn btn-success mb-2 ms-2" @click="saveFoodOrder()">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </div>
    <div v-else>Loading order...</div>
</template>