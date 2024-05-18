<script setup lang="ts">
import type { StateModel } from '@/models/state.model';
import { StateService } from '@/services/state.service';
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = Number.parseInt(route.params.id as any);
const state = ref<StateModel>();
StateService.getState(id).then(rsp => state.value = rsp.data);

function updateState() {
    StateService.updateState(id, state.value).then(rsp => {
        router.push({
            path: '/state'
        });
    });
}

</script>

<template>
    <div v-if="state">
        <h3 class="h3">Edit state</h3>
        <div class="mb-3">
            <label for="id" class="form-label">Id:</label>
            <input type="number" class="form-control" id="id" :value="state.stateId" disabled>
        </div>
        <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" v-model="state.stateName">
        </div>
        <div class="mb-3">
            <label for="created" class="form-label">Created at:</label>
            <input type="text" class="form-control" id="created" :value="formatDate(state.stateCreatedAt)" disabled>
        </div>
        <div class="mb-4">
            <label for="updated" class="form-label">Updated at:</label>
            <input type="text" class="form-control" id="updated" :value="formatDate(state.stateUpdatedAt)" disabled>
        </div>
        <RouterLink class="btn btn-danger mb-2" to="/state">
            <i class="fa-solid fa-arrow-left"></i> Back
        </RouterLink>
        <button class="btn btn-success mb-2 ms-2" @click="updateState()">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </div>
    <div v-else>Loading state...</div>
</template>