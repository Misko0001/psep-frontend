<script setup lang="ts">
import { AuthService } from '@/services/auth.service';
import { login } from '@/services/main.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref<string>('');
const password = ref<string>('');
const router = useRouter();
async function doLogin() {
    try {
       if (username.value == '' || password.value == '') return;
        const rsp = await login(username.value, password.value);
        AuthService.saveAuth(rsp.data);
        router.push({
            path: '/'
        }); 
    } catch(e) {
        alert(e);
    }
}
</script>

<template>
    <h3 class="h3">Login</h3>
    <form v-on:submit.prevent="doLogin">
        <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input type="text" class="form-control" id="username" v-model="username">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input type="password" class="form-control" id="password" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
    </form>
</template>