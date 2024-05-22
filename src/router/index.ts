import { createRouter, createWebHistory } from 'vue-router'
import CategoryView from '@/views/category/CategoryView.vue'
import NewCategory from '@/views/category/NewCategory.vue'
import EditCategory from '@/views/category/EditCategory.vue'
import StateView from '@/views/state/StateView.vue'
import NewState from '@/views/state/NewState.vue'
import EditState from '@/views/state/EditState.vue'
import RestaurantView from '@/views/restaurant/RestaurantView.vue'
import NewRestaurant from '@/views/restaurant/NewRestaurant.vue'
import EditRestaurant from '@/views/restaurant/EditRestaurant.vue'
import CustomerView from '@/views/customer/CustomerView.vue'
import NewCustomer from '@/views/customer/NewCustomer.vue'
import EditCustomer from '@/views/customer/EditCustomer.vue'
import OrderView from '@/views/order/OrderView.vue'
import NewOrder from '@/views/order/NewOrder.vue'
import EditOrder from '@/views/order/EditOrder.vue'
import FoodView from '@/views/food/FoodView.vue'
import NewFood from '@/views/food/NewFood.vue'
import EditFood from '@/views/food/EditFood.vue'
import FoodOrderView from '@/views/food-order/FoodOrderView.vue'
import NewFoodOrder from '@/views/food-order/NewFoodOrder.vue'
import EditFoodOrder from '@/views/food-order/EditFoodOrder.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/order'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
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
    },
    {
      path: '/food',
      name: 'food',
      component: FoodView
    },
    {
      path: '/food/new',
      name: 'new-food',
      component: NewFood
    },
    {
      path: '/food/:id',
      name: 'edit-food',
      component: EditFood
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView
    },
    {
      path: '/order/new',
      name: 'new-order',
      component: NewOrder
    },
    {
      path: '/order/:id',
      name: 'edit-order',
      component: EditOrder
    },
    {
      path: '/order/:id/food-order',
      name: 'food-order',
      component: FoodOrderView
    },
    {
      path: '/order/:id/food-order/new',
      name: 'new-food-order',
      component: NewFoodOrder
    },
    {
      path: '/food-order/:id',
      name: 'edit-food-order',
      component: EditFoodOrder
    }
  ]
})

export default router