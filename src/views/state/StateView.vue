<script setup lang="ts">
import type { StateModel } from '@/models/state.model';
import { StateService } from '@/services/state.service';
import { formatDate } from '@/services/main.service';
import { ref } from 'vue';

const states = ref<StateModel[]>();
StateService.getAllStates().then(rsp => states.value = rsp.data);

async function removeState(model: StateModel) {
    await StateService.deleteState(model.stateId);
    states.value = states.value?.filter(obj => obj.stateId !== model.stateId);
}
</script>

<template>
    <div v-if="states">
        <h3 class="h3">States</h3>
        <RouterLink class="btn btn-sm btn-success mb-2" to="/state/new">
            <i class="fa-solid fa-plus"></i> Add new state
        </RouterLink>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Updated at</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in states">
                    <th scope="row">{{ obj.stateId }}</th>
                    <td>{{ obj.stateName }}</td>
                    <td>{{ formatDate(obj.stateCreatedAt) }}</td>
                    <td>{{ formatDate(obj.stateUpdatedAt) }}</td>
                    <td>
                        <div class="btn-group">
                            <RouterLink class="btn btn-sm btn-primary" :to="`/state/${obj.stateId}`">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </RouterLink>
                            <button class="btn btn-sm btn-danger" @click="removeState(obj)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>Loading states...</div>
</template>