<script setup lang="ts">
import type { CategoryModel } from '@/models/category.model';
import { CategoryService } from '@/services/category.service';
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = Number.parseInt(route.params.id as any);
const category = ref<CategoryModel>();
CategoryService.getCategory(id).then(rsp => category.value = rsp.data);

function updateCategory() {
    CategoryService.updateCategory(id, category.value).then(rsp => {
        router.push({
            path: '/category'
        });
    });
}

</script>

<template>
    <div v-if="category">
        <h3 class="h3">Edit category</h3>
        <div class="mb-3">
            <label for="id" class="form-label">Id:</label>
            <input type="number" class="form-control" id="id" :value="category.categoryId" disabled>
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="category.categoryName">
        </div>
        <div class="mb-3">
            <label for="created" class="form-label">Created at:</label>
            <input type="text" class="form-control" id="created" :value="formatDate(category.categoryCreatedAt)" disabled>
        </div>
        <div class="mb-4">
            <label for="updated" class="form-label">Updated at:</label>
            <input type="text" class="form-control" id="updated" :value="formatDate(category.categoryUpdatedAt)" disabled>
        </div>
        <RouterLink class="btn btn-danger mb-2" to="/category">
            <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <button class="btn btn-success mb-2 ms-2" @click="updateCategory()">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </div>
    <div v-else>Loading category...</div>
</template>