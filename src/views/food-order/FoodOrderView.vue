<script setup lang="ts">
import type { FoodOrderModel } from '@/models/food-order.model';
import { FoodOrderService } from '@/services/food-order.service';
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = Number.parseInt(route.params.id as any);
const foodOrders = ref<FoodOrderModel[]>();
FoodOrderService.getFoodOrdersByOrder(id).then(rsp => foodOrders.value = rsp.data);

async function removeFoodOrder(model: FoodOrderModel) {
    await FoodOrderService.deleteFoodOrder(model.foodOrderId);
    foodOrders.value = foodOrders.value?.filter(obj => obj.foodOrderId !== model.foodOrderId);
}
</script>

<template>
    <div v-if="foodOrders">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item"><a href="/order">Orders</a></li>
                <li class="breadcrumb-item active" aria-current="page">{{ String(id).padStart(4, '0') }}</li>
            </ol>
        </nav>
        <h3 class="h3">Order {{ id }}</h3>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Food</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Updated at</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in foodOrders">
                    <th scope="row">{{ obj.foodOrderId }}</th>
                    <td>{{ obj.foodOrderFood.foodName }}</td>
                    <td>{{ obj.foodOrderAmount }}</td>
                    <td>{{ formatDate(obj.foodOrderCreatedAt) }}</td>
                    <td>{{ formatDate(obj.foodOrderUpdatedAt) }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink class="btn btn-sm btn-primary" :to="`/food-order/${obj.foodOrderId}`">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </RouterLink>
                            <button class="btn btn-sm btn-danger" @click="removeFoodOrder(obj)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <RouterLink class="btn btn-danger mb-2" to="/order">
            <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <RouterLink class="btn btn-success mb-2 ms-2" :to="`/order/${id}/food-order/new`">
            <i class="fa-solid fa-plus"></i> Add to order
        </RouterLink>
    </div>
    <div v-else>Loading order...</div>
</template>