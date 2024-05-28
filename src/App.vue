<script setup lang="ts">
import { useRouter } from 'vue-router';
import { AuthService } from './services/auth.service';

const router = useRouter();
function logout() {
  AuthService.clearAuth();
  router.push({
    path: '/login'
  });
}
</script>

<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">
          <i class="fa-solid fa-pizza-slice"></i> Pizzeria
        </RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse mt-1" id="navbarText" v-if="AuthService.hasAuth()">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/order">Orders</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/customer">Customers</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/food">Food</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/category">Categories</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/restaurant">Restaurants</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/state">States</RouterLink>
            </li>
          </ul>
          <button type="button" class="nav-link me-3" @click="logout">Logout</button>
          <span class="navbar-text"><i class="fa-solid fa-user"></i> {{ AuthService.getUsername() }}</span>
        </div>
      </div>
    </nav>
    <RouterView ::key="$route.fullPath" />
    <footer>
      <p>Miloš Stanković</p>
      <div>
        <a href="https://github.com/Misko0001" target="_blank" class="text-body-secondary git-hub"><i class="fa-brands fa-github"></i></a>
        <a href="" target="_blank" class="text-body-secondary"><i class="fa-brands fa-linkedin"></i></a>
      </div>
    </footer>
  </div>
</template>