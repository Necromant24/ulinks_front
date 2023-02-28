
import {createRouter, createWebHistory} from 'vue-router'
import MainPage from './../components/MainPage.vue'
import Test from './../components/Test.vue'
import AdminAuthPage from "@/components/AdminAuthPage.vue";
import AdminPage from "@/components/AdminPage.vue";



const routes = [
  { path: '/', component: MainPage },
  { path: '/main', component: MainPage },
  {path: '/main/:admin', component: MainPage, props: true},
  {path: '/test', component: Test},
  // {path: '/adminAuth', component: AdminAuthPage},
  {path: '/adminPage', component: AdminPage}

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
