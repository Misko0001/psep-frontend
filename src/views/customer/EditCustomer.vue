<script setup lang="ts">
import type { CustomerModel } from '@/models/customer.model';
import { CustomerService } from '@/services/customer.service';
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = Number.parseInt(route.params.id as any);
const customer = ref<CustomerModel>();
CustomerService.getCustomer(id).then(rsp => customer.value = rsp.data);

function updateCustomer() {
    CustomerService.updateCustomer(id, customer.value).then(rsp => {
        router.push({
            path: '/customer'
        });
    });
}

</script>

<template>
    <div v-if="customer" class="new-edit">
        <h3 class="h3">Edit customer</h3>
        <div class="mb-3">
            <label for="id" class="form-label">Id:</label>
            <input type="number" class="form-control" id="id" :value="customer.customerId" disabled>
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="customer.customerName">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="text" class="form-control" id="email" v-model="customer.customerEmail">
        </div>
        <div class="mb-3">
            <label for="phone" class="form-label">Phone:</label>
            <input type="text" class="form-control" id="phone" v-model="customer.customerPhone">
        </div>
        <div class="mb-3">
            <label for="address" class="form-label">Address:</label>
            <input type="text" class="form-control" id="address" v-model="customer.customerAddress">
        </div>
        <div class="mb-3">
            <label for="created" class="form-label">Created at:</label>
            <input type="text" class="form-control" id="created" :value="formatDate(customer.customerCreatedAt)" disabled>
        </div>
        <div class="mb-4">
            <label for="updated" class="form-label">Updated at:</label>
            <input type="text" class="form-control" id="updated" :value="formatDate(customer.customerUpdatedAt)" disabled>
        </div>
        <RouterLink class="btn btn-danger mb-2" to="/customer">
            <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <button class="btn btn-success mb-2 ms-2" @click="updateCustomer()">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </div>
    <div v-else>Loading customer...</div>
</template>