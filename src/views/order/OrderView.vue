<script setup lang="ts">
import type { OrderModel } from '@/models/order.model';
import { OrderService } from '@/services/order.service';
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';

const orders = ref<OrderModel[]>();
OrderService.getAllOrders().then(rsp => orders.value = rsp.data);

async function removeOrder(model: OrderModel) {
    await OrderService.deleteOrder(model.orderId);
    orders.value = orders.value?.filter(obj => obj.orderId !== model.orderId);
}
</script>

<template>
    <div v-if="orders">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Orders</li>
            </ol>
        </nav>
        <h3 class="h3">Orders</h3>
        <RouterLink class="btn btn-sm btn-success mb-2" to="/order/new">
            <i class="fa-solid fa-plus"></i> Add new order
        </RouterLink>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Customer</th>
                    <th scope="col">State</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Updated at</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in orders">
                    <th scope="row">{{ obj.orderId }}</th>
                    <td>{{ obj.orderCustomer.customerName }}</td>
                    <td>{{ obj.orderState.stateName }}</td>
                    <td>{{ formatDate(obj.orderCreatedAt) }}</td>
                    <td>{{ formatDate(obj.orderUpdatedAt) }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink class="btn btn-sm btn-info" :to="`/order/${obj.orderId}/food-order`">
                                <i class="fa-solid fa-circle-info"></i>
                            </RouterLink>
                            <RouterLink class="btn btn-sm btn-primary" :to="`/order/${obj.orderId}`">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </RouterLink>
                            <button class="btn btn-sm btn-danger" @click="removeOrder(obj)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>Loading orders...</div>
</template>