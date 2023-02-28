<template>
  <v-card>
    <h3>{{ props.data.heading }}</h3>
    <h5><a :href="props.data.link"> {{ props.data.link }} </a></h5>
    <div>
      {{ props.data.description }}
    </div>
    <div>
      <v-chip v-for="(tag, i) in props.data.tagList" :key="i" class="ma-2" color="teal">
        {{ tag.name }}
      </v-chip>

    </div>
    <div v-if="props.isAdmin" style="padding-top: 20px;">
      <AcceptDialog
              :accept-func="accepted"
              :disaccept-func="disaccepted"
              question="Действительно удалить?"
              :btn-text="'Удалить'"
      />
    </div>
  </v-card>
</template>

<script setup>
import {defineProps} from "vue";
import AcceptDialog from "@/components/AcceptDialog.vue";
import restClient from "@/restClient";

const props = defineProps(['data', 'isAdmin'])

console.log('linkcard is admin', props.isAdmin)

const accepted = ()=>{
    restClient.Delete('/admin/ulinks/'+props.data.id, {}).then(data=>console.log(data))
}

const disaccepted = ()=>{

}


</script>

<style scoped>

</style>
