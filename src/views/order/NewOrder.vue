<script setup lang="ts">
import type { CustomerModel } from '@/models/customer.model';
import { CustomerService } from '@/services/customer.service';
import { OrderService } from '@/services/order.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const order = ref<any>({
    orderName: '',
    orderCustomerId: 0
});

const customers = ref<CustomerModel[]>();
CustomerService.getAllCustomers().then(rsp => {
    customers.value = rsp.data;
    order.value.orderCustomerId = rsp.data[0].orderCustomerId;
});

function saveOrder() {
    OrderService.saveOrder(order.value).then(rsp => {
        router.push({
            path: '/order'
        });
    });
}
</script>

<template>
    <div v-if="order" class="new-edit">
        <h3 class="h3">Create order</h3>
        <div class="mb-3" v-if="customers">
            <label for="customer" class="form-label">Customer:</label>
            <select class="form-select" v-model="order.orderCustomerId" id="categorie">
                <option v-for="obj in customers" :value="obj.customerId">
                    {{ obj.customerName }}
                </option>
            </select>
        </div>
        <RouterLink class="btn btn-danger mb-2" to="/order">
            <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <button class="btn btn-success mb-2 ms-2" @click="saveOrder()">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </div>
    <div v-else>Loading order...</div>
</template>