<script setup lang="ts">
import { StateService } from '@/services/state.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const state = ref<any>({
    stateName: ''
});

function saveState() {
    StateService.saveState(state.value).then(rsp => {
        router.push({
            path: '/state'
        });
    });
}
</script>

<template>
    <div v-if="state">
        <h3 class="h3">Create state</h3>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="state.stateName">
        </div>
        <RouterLink class="btn btn-danger mb-2" to="/state">
            <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <button class="btn btn-success mb-2 ms-2" @click="saveState()">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </div>
    <div v-else>Loading state...</div>
</template>