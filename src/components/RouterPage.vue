<template>
  <div>


    <MainPage :admin="adminMode" v-if="pageNum===0"/>

    <AdminAuthPage :on-auth="()=>{ pageNum.value = 2 }" v-else-if="pageNum===1"/>

    <AdminPage v-else-if="pageNum===2"/>

    <div v-else>
      <h1>Something went wrong</h1>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import storage from "@/storage";
import MainPage from "@/components/MainPage.vue";
import AdminAuthPage from "@/components/AdminAuthPage.vue";
import AdminPage from "@/components/AdminPage.vue";

const pageNum = ref(0)

const isAdmin = ref(false)
const adminAuthorized = ref(false)

const authPage = ref(false)

let hash = window.location.hash;

const adminMode = ref(false)

if (hash === '#admin') {
  isAdmin.value = true
  pageNum.value = 2

}

if (hash === '#adminAuth') {
  authPage.value = true
  pageNum.value = 1
}


if (storage.getToken() !== "") {
  adminAuthorized.value = true
}

console.log('hash - ', hash, adminAuthorized.value)
if (hash === '#adminMode') {
  //if(adminAuthorized.value){
  if (true) {
    adminMode.value = true
  }
}


</script>

<style scoped>

</style>
