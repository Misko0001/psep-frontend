import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '@/views/category/CategoryView.vue'
import EditCategory from '@/views/category/EditCategory.vue'
import NewCategory from '@/views/category/NewCategory.vue'
import StateView from '@/views/state/StateView.vue'
import NewState from '@/views/state/NewState.vue'
import EditState from '@/views/state/EditState.vue'
import RestaurantView from '@/views/restaurant/RestaurantView.vue'
import NewRestaurant from '@/views/restaurant/NewRestaurant.vue'
import EditRestaurant from '@/views/restaurant/EditRestaurant.vue'
import CustomerView from '@/views/customer/CustomerView.vue'
import NewCustomer from '@/views/customer/NewCustomer.vue'
import EditCustomer from '@/views/customer/EditCustomer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/category',
      name: 'category',
      component: CategoryView
    },
    {
      path: '/category/new',
      name: 'new-category',
      component: NewCategory
    },
    {
      path: '/category/:id',
      name: 'edit-category',
      component: EditCategory
    },
    {
      path: '/state',
      name: 'state',
      component: StateView
    },
    {
      path: '/state/new',
      name: 'new-state',
      component: NewState
    },
    {
      path: '/state/:id',
      name: 'edit-state',
      component: EditState
    },
    {
      path: '/restaurant',
      name: 'restaurant',
      component: RestaurantView
    },
    {
      path: '/restaurant/new',
      name: 'new-restaurant',
      component: NewRestaurant
    },
    {
      path: '/restaurant/:id',
      name: 'edit-restaurant',
      component: EditRestaurant
    },
    {
      path: '/customer',
      name: 'customer',
      component: CustomerView
    },
    {
      path: '/customer/new',
      name: 'new-customer',
      component: NewCustomer
    },
    {
      path: '/customer/:id',
      name: 'edit-customer',
      component: EditCustomer
    }
  ]
})

export default router
