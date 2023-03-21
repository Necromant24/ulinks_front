<template>
  <v-layout style="z-index: 0">

    <v-main>

      <!--      <v-container>-->

      <!--        <v-row>-->
      <!--          <v-col cols="4">-->
      <!--            <v-text-field-->
      <!--              v-model="search"-->
      <!--              clearable-->
      <!--              label="поиск по названию"-->
      <!--              variant="outlined"-->
      <!--            ></v-text-field>-->
      <!--          </v-col>-->
      <!--          <v-col cols="4">-->
      <!--            <v-autocomplete-->
      <!--              clearable-->
      <!--              chips-->
      <!--              label="Темы"-->
      <!--              :items="allTags"-->
      <!--              v-model="selectedTags"-->
      <!--              item-title="name"-->
      <!--              multiple-->
      <!--            ></v-autocomplete>-->
      <!--          </v-col>-->
      <!--          <v-col cols="2">-->
      <!--            <v-btn-->
      <!--              rounded="lg"-->
      <!--              color="info"-->
      <!--              style="height: 55px;"-->
      <!--              @click="requestUlinks"-->
      <!--            >-->
      <!--              Поиск-->
      <!--            </v-btn>-->
      <!--          </v-col>-->
      <!--        </v-row>-->


      <!--        <v-row>-->
      <!--          <v-col cols="1">-->
      <!--            <v-btn @click="previousPage" icon="mdi-arrow-left" color="primary"></v-btn>-->

      <!--          </v-col>-->
      <!--          <v-col cols="1">-->
      <!--            <div >-->
      <!--              <div class="page-nums-container" v-if="currentPage===1">-->
      <!--                <h4>1</h4> <div>.. {{ maxPage }}</div>-->
      <!--              </div>-->
      <!--              <div class="page-nums-container" v-else-if="currentPage > 1 && currentPage < maxPage">-->
      <!--                <div>1 ..</div>  <h4> {{ currentPage }}</h4> <div> .. {{ maxPage }}</div>-->
      <!--              </div>-->
      <!--              <div class="page-nums-container" v-else-if="currentPage === maxPage">-->
      <!--                <div> 1 .. </div> <h4>{{ maxPage }}</h4>-->
      <!--              </div>-->
      <!--              <div v-else>-->
      <!--                something wrong-->
      <!--              </div>-->
      <!--            </div>-->

      <!--          </v-col>-->
      <!--          <v-col cols="1">-->
      <!--            <v-btn @click="nextPage" icon="mdi-arrow-right" color="primary"></v-btn>-->
      <!--          </v-col>-->
      <!--          <v-col cols="2">-->
      <!--            <v-select-->

      <!--              label="Страница"-->
      <!--              :items="pageList"-->
      <!--              v-model="currentPage"-->
      <!--            ></v-select>-->
      <!--          </v-col>-->
      <!--          <v-col cols="2">-->
      <!--            <v-select-->

      <!--              label="Кол-во записей на странице"-->
      <!--              :items="['5', '10', '15', '25', '50', '100']"-->
      <!--              v-model="itemsOnPage"-->
      <!--            ></v-select>-->
      <!--          </v-col>-->
      <!--        </v-row>-->


      <!--        <hr style="margin-top: 20px; margin-bottom: 20px;"/>-->

      <!--        <v-row v-for="(data, i) in linksData" :key="i">-->

      <!--          <LinkCardElement style="width: 100%;padding: 10px; min-height: 100px;"-->
      <!--                           :data="data" :is-admin="isAdmin"/>-->

      <!--        </v-row>-->


      <!--      </v-container>-->

      <div class="main-container">


        <div class="settings-container">


          <div class="search">
            <v-text-field
              v-model="search"
              clearable
              label="поиск по названию"
              variant="outlined"
            ></v-text-field>
          </div>

          <div class="theme-selector">
            <v-autocomplete
              clearable
              chips
              label="Темы"
              :items="allTags"
              v-model="selectedTags"
              item-title="name"
              multiple
            ></v-autocomplete>
          </div>
            <v-btn

              class="search-btn"
              rounded="lg"
              color="info"
              @click="requestUlinks"
            >
              Поиск
            </v-btn>


          <div class="page-selector">

            <div>
              <v-btn @click="previousPage" icon="mdi-arrow-left" color="primary"></v-btn>
            </div>
            <div class="page-selector-display">
              <div>
                <div class="page-nums-container" v-if="currentPage===1">
                  <h4>1</h4>
                  <div>.. {{ maxPage }}</div>
                </div>
                <div class="page-nums-container" v-else-if="currentPage > 1 && currentPage < maxPage">
                  <div>1 ..</div>
                  <h4> {{ currentPage }}</h4>
                  <div> .. {{ maxPage }}</div>
                </div>
                <div class="page-nums-container" v-else-if="currentPage === maxPage">
                  <div> 1 ..</div>
                  <h4>{{ maxPage }}</h4>
                </div>
                <div v-else>
                  something wrong
                </div>
              </div>
            </div>
            <div>
              <v-btn @click="nextPage" icon="mdi-arrow-right" color="primary"></v-btn>
            </div>


          </div>


          <div class="page-select">
            <v-select

              label="Страница"
              :items="pageList"
              v-model="currentPage"
            ></v-select>
          </div>
          <div class="records-count-select">
            <v-select

              label="Кол-во записей на странице"
              :items="['5', '10', '15', '25', '50', '100']"
              v-model="itemsOnPage"
            ></v-select>
          </div>


        </div>

        <hr style="margin-top: 20px; margin-bottom: 20px;"/>

        <div class="cards-container">

          <div v-for="(data, i) in linksData" :key="i">

            <LinkCardElement style="width: 100%;padding: 10px; min-height: 100px;"
                             :data="data" :is-admin="isAdmin"/>

          </div>


        </div>


      </div>


    </v-main>


  </v-layout>


  <div>


  </div>

</template>

<script setup>
import {ref, defineProps} from "vue";
import LinkCardElement from "@/components/LinkCardElement";
import storage from "@/storage";
import restClient from "@/restClient";

const props = defineProps(['admin'])

console.log('prps admin - ', props.admin)

const isAdmin = ref(props.admin)


//TODO: как запрашивать с тагами
const allTags = ref([{name: 'California'}, {name: 'Colorado'}])
const selectedTags = ref([])


const search = ref("")
const itemsOnPage = ref(10)
const currentPage = ref(1)

const allCount = ref(0)
const maxPage = ref(0)

const pageList = ref([1])


const calcMaxPage = () => {
  maxPage.value =
    Math.floor(allCount.value / itemsOnPage.value) + (allCount.value % itemsOnPage.value > 0 ? 1 : 0)

  pageList.value = Array.from({length: maxPage.value}, (x, i) => i + 1);


  console.log("maxPage - ", maxPage.value)
  console.log("pageList - ", pageList.value)

}

calcMaxPage()


const itemsSkip = () => (currentPage.value - 1) * itemsOnPage.value


const linksData = ref([
  {
    heading: "c# asp net manual",
    link: "https://metanit.com/sharp/aspnet6/1.1.php",
    description: " short intro to c# asp net",
    tagList: [{name: "c#"}, {name: "asp.net"}]
  }
])

const requestUlinks = () => {
  restClient.Post('/ulinks', {
    itemsSkip: itemsSkip(),
    search: search.value ?? "",
    itemsTake: itemsOnPage.value,
    tags: selectedTags.value
  }).then(json => {
    console.log("json - ", json)
    allCount.value = json.model.allCount
    linksData.value = json.model.items

    console.log(linksData.value)


    console.log("all count - ", allCount.value)
    calcMaxPage()
    console.log("currentPage - ", currentPage.value)
    console.log("maxPage - ", maxPage.value)

  })
}

const requestTags = () => {

  restClient.Get('/tags').then(json => {
    //console.log(json.model)
    allTags.value = json.model.map(item => item.name)
  })

}


const nextPage = () => {

  if (currentPage.value < maxPage.value) {
    currentPage.value += 1
  }

  requestUlinks()
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }

  requestUlinks()
}


requestTags()

requestUlinks()


</script>

<style scoped>

.page-selector-display{
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;

}

.main-container {
  padding: 10px;
}


.settings-container {

  display: grid;

  grid-template:
    " search themeselector searchbtn "
    " pageselectorel  pageselect recordscountselect ";

  grid-column-gap: 20px;

}



.records-count-select{
  grid-area: recordscountselect;
}


.page-select{
  grid-area: pageselect;
}

.page-selector-el{
  grid-area: pageselectorel;
}

.search-btn{
  grid-area: searchbtn;
  margin: auto;
  margin-top: 0;

  height: 60%;
  width: 200px;

  min-height: 40px;

}

.search{
  grid-area: search;
}

.theme-selector{
  grid-area: themeselector;
}


.page-selector {
  display: flex;
  grid-area: pageselectorel;
}

.page-grid {
  display: grid;

}

.page-nums-container {
  display: flex;
}



@media screen and (max-width: 600px) {

  .settings-container{

    grid-template: " search" " themeselector "
    " pageselectorel " " pageselect " " recordscountselect " " searchbtn ";

    grid-row-gap: 10px;

  }

}



</style>
