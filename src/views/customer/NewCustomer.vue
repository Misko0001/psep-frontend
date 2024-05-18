<script setup lang="ts">
import { CustomerService } from '@/services/customer.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const customer = ref<any>({
    name: '',
    email: '',
    phone: '',
    address: ''
});

function saveCustomer() {
    CustomerService.saveCustomer(customer.value).then(rsp => {
        router.push({
            path: '/customer'
        });
    });
}
</script>

<template>
    <div v-if="customer">
        <h3 class="h3">Create customer</h3>
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
        <RouterLink class="btn btn-danger mb-2" to="/customer">
            <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <button class="btn btn-success mb-2 ms-2" @click="saveCustomer()">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </div>
    <div v-else>Loading customer...</div>
</template>