<script setup lang="ts">
import type { OrderModel } from '@/models/order.model';
import type { FoodOrderModel } from '@/models/food-order.model';
import type { FoodModel } from '@/models/food.model';
import { OrderService } from '@/services/order.service';
import { FoodOrderService } from '@/services/food-order.service';
import { formatDate } from '@/services/main.service';
import { FoodService } from '@/services/food.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = Number.parseInt(route.params.id as any);
const foodOrder = ref<FoodOrderModel>();
FoodOrderService.getFoodOrder(id).then(rsp => foodOrder.value = rsp.data);

const orders = ref<OrderModel[]>();
OrderService.getAllOrders().then(rsp => orders.value = rsp.data);

const foods = ref<FoodModel[]>();
FoodService.getAllFoods().then(rsp => foods.value = rsp.data);

function updateFoodOrder() {
    FoodOrderService.updateFoodOrder(id, foodOrder.value).then(rsp => {
        router.push({
            path: `/order/${foodOrder.value?.foodOrderOrderId}/food-order`
        });
    });
}

</script>

<template>
    <div v-if="foodOrder && foods">
        <h3 class="h3">Edit order {{ foodOrder.foodOrderOrderId }}</h3>
        <div class="mb-3">
            <label for="order" class="form-label">Order id:</label>
            <input type="text" class="form-control" id="order" v-model="foodOrder.foodOrderOrderId" disabled>
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
        <div class="mb-3">
            <label for="created" class="form-label">Created at:</label>
            <input type="text" class="form-control" id="created" :value="formatDate(foodOrder.foodOrderCreatedAt)" disabled>
        </div>
        <div class="mb-4">
            <label for="updated" class="form-label">Updated at:</label>
            <input type="text" class="form-control" id="updated" :value="formatDate(foodOrder.foodOrderUpdatedAt)" disabled>
        </div>
        <RouterLink class="btn btn-danger mb-2" :to="`/order/${foodOrder.foodOrderOrderId}/food-order`">
            <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <button class="btn btn-success mb-2 ms-2" @click="updateFoodOrder()">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </div>
    <div v-else>Loading foodOrder...</div>
</template>