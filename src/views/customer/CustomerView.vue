<script setup lang="ts">
import type { CustomerModel } from '@/models/customer.model';
import { CustomerService } from '@/services/customer.service';
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';

const customers = ref<CustomerModel[]>();
CustomerService.getAllCustomers().then(rsp => customers.value = rsp.data);

async function removeCustomer(model: CustomerModel) {
    await CustomerService.deleteCustomer(model.customerId);
    customers.value = customers.value?.filter(obj => obj.customerId !== model.customerId);
}
</script>

<template>
    <div v-if="customers">
        <h3 class="h3">Customers</h3>
        <RouterLink class="btn btn-sm btn-success mb-2" to="/customer/new">
            <i class="fa-solid fa-plus"></i> Add new customer
        </RouterLink>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Updated at</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in customers">
                    <th scope="row">{{ obj.customerId }}</th>
                    <td>{{ obj.customerName }}</td>
                    <td>{{ obj.customerEmail }}</td>
                    <td>{{ obj.customerPhone }}</td>
                    <td>{{ obj.customerAddress }}</td>
                    <td>{{ formatDate(obj.customerCreatedAt) }}</td>
                    <td>{{ formatDate(obj.customerUpdatedAt) }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink class="btn btn-sm btn-primary" :to="`/customer/${obj.customerId}`">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </RouterLink>
                            <button class="btn btn-sm btn-danger" @click="removeCustomer(obj)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>Loading customers...</div>
</template>