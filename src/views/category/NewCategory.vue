<script setup lang="ts">
import { CategoryService } from '@/services/category.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const category = ref<any>({
    categoryName: ''
});

function saveCategory() {
    CategoryService.saveCategory(category.value).then(rsp => {
        router.push({
            path: '/category'
        });
    });
}
</script>

<template>
    <div v-if="category">
        <h3 class="h3">Create category</h3>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="category.categoryName">
        </div>
        <RouterLink class="btn btn-danger mb-2" to="/category">
            <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <button class="btn btn-success mb-2 ms-2" @click="saveCategory()">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </div>
    <div v-else>Loading category...</div>
</template>