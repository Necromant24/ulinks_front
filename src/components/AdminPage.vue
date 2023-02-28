<template>
  <v-layout>
    <v-container>
      <v-row justify="center">
        <v-col sm="6">

          <v-card title="ULINK" text="Создать новую ulink" variant="outlined" style="padding: 20px;">


            <div style="padding: 10px;">

              <v-text-field
                clearable label="Название"
                v-model="ulink.heading"
                :rules="[min]"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                clearable label="Ссылка на ресурс"
                v-model="ulink.link"
                :rules="[isLink]"
                variant="outlined"
              ></v-text-field>

              <v-combobox
                v-model="selectedCategories"
                :items="categories"
                label="Категории"
                multiple
                chips
              ></v-combobox>

              <v-textarea
                          label="Описание"
                          variant="outlined"
                          v-model="ulink.description"
              ></v-textarea>


            </div>


            <v-card-actions>
              <v-btn @click="addUlink" color="info">Создать</v-btn>
            </v-card-actions>
          </v-card>

        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col sm="6">

          <v-card title="Tag" text="Создать новый тэг" variant="outlined" style="padding: 20px;">


            <div style="padding: 10px;">

              <v-text-field
                clearable label="Тэг"
                v-model="tag.name"
                :rules="[min]"
                variant="outlined"
              ></v-text-field>

            </div>


            <v-card-actions>
              <v-btn @click="addTag" color="info">Создать</v-btn>
            </v-card-actions>
          </v-card>

        </v-col>
      </v-row>

    </v-container>
  </v-layout>
</template>

<script setup>
import {reactive, ref} from "vue";
import restClient from "@/restClient";
import {da} from "vuetify/locale";

const categories = ref(['test1', 'c#', 'c++'])
const selectedCategories = ref([])


restClient.Get('/tags').then(data=>{

  let tags = []

  data.model.forEach(tag=>{
    tags.push(tag.name)
  })

  categories.value= tags

  console.log(tags)
})



const ulink = reactive({
  heading: '',
  link: '',
  description: '',
  tagList: []
})

const tag = reactive({
  name: ''
})



var httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;


const isLink = (v) => httpRegex.test(v) || 'The text is not a link!';
const min = (v) => v.length >= 3 || 'Min 3 characters';


const addUlink = ()=>{
  console.log(selectedCategories.value)

  ulink.tagList = selectedCategories.value

  restClient.Post('/admin/ulinks', ulink).then(data=>console.log(data))

}


const addTag = ()=>{

  restClient.Post('/admin/tags', tag).then(data=>console.log(data))

}



</script>

<style scoped>

</style>
