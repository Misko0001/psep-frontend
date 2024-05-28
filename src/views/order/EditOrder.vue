<script setup lang="ts">
import type { CustomerModel } from '@/models/customer.model';
import type { OrderModel } from '@/models/order.model';
import type { StateModel } from '@/models/state.model';
import { CustomerService } from '@/services/customer.service';
import { OrderService } from '@/services/order.service';
import { formatDate } from '@/services/main.service';
import { StateService } from '@/services/state.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = Number.parseInt(route.params.id as any);
const order = ref<OrderModel>();
OrderService.getOrder(id).then(rsp => order.value = rsp.data);

const categories = ref<CustomerModel[]>();
CustomerService.getAllCustomers().then(rsp => categories.value = rsp.data);

const states = ref<StateModel[]>();
StateService.getAllStates().then(rsp => states.value = rsp.data);

function updateOrder() {
    OrderService.updateOrder(id, order.value).then(rsp => {
        router.push({
            path: '/order'
        });
    });
}

</script>

<template>
    <div v-if="order" class="new-edit">
        <h3 class="h3">Edit order</h3>
        <div class="mb-3">
            <label for="id" class="form-label">Id:</label>
            <input type="number" class="form-control" id="id" :value="order.orderId" disabled>
        </div>
        <div class="mb-3" v-if="categories">
            <label for="customer" class="form-label">Customer:</label>
            <select class="form-select" v-model="order.orderCustomerId" id="categorie" disabled>
                <option v-for="obj in categories" :value="obj.customerId">
                    {{ obj.customerName }}
                </option>
            </select>
        </div>
        <div class="mb-3" v-if="states">
            <label for="state" class="form-label">State:</label>
            <select class="form-select" v-model="order.orderStateId" id="state">
                <option v-for="obj in states" :value="obj.stateId">
                    {{ obj.stateName }}
                </option>
            </select>
        </div>
        <div class="mb-3">
            <label for="created" class="form-label">Created at:</label>
            <input type="text" class="form-control" id="created" :value="formatDate(order.orderCreatedAt)" disabled>
        </div>
        <div class="mb-4">
            <label for="updated" class="form-label">Updated at:</label>
            <input type="text" class="form-control" id="updated" :value="formatDate(order.orderUpdatedAt)" disabled>
        </div>
        <RouterLink class="btn btn-danger mb-2" to="/order">
            <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <button class="btn btn-success mb-2 ms-2" @click="updateOrder()">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </div>
    <div v-else>Loading order...</div>
</template>