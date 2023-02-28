<template>
  <v-layout>
    <v-container>
      <v-row justify="center">
        <v-col sm="6">

          <v-card title="Авторизация" text="Введите логин и пароль" variant="outlined" style="padding: 20px;">

            <div style="padding: 10px;">
              <v-text-field
                :rules="[required, min]"
                clearable label="Логин"
                v-model="login"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[required, min]"
                :type="show ? 'text' : 'password'"
                name="input-10-1"
                label="Пароль"
                hint="Минимум 8 символов"
                counter
                @click:append="()=>{show.value = !show.value}"
              ></v-text-field>
            </div>

            <v-card-actions>
              <v-btn @click="authentificate" color="info">Авторизоваться</v-btn>
            </v-card-actions>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script setup>
import {ref} from "vue";
import restClient from "@/restClient";
import storage from "@/storage";
import router from "@/router";

const props = defineProps(['onAuth'])

const login = ref('')
const password = ref('')
const show = ref(false)

const required = (value) => !!value || 'Required.';
const min = (v) => v.length >= 4 || 'Min 4 characters';


const authentificate = () => {

  restClient.Post('/authAdmin', {
    login: login.value,
    password: password.value
  }).then(data => {
    console.log(data)

    if (data.token !== '') {
      storage.setToken(data.token)

      //router.push({path: '/adminPage'})

      //window.location.href = "/adminPage"

      props.onAuth()

      alert('success! return to main page')

      console.log(storage.getToken())
    }

  })


}


</script>

<style scoped>

</style>
