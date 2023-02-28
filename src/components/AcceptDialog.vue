<template>
  <v-row justify="left">
    <v-dialog
      v-model="dialog"
      persistent
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          Удалить
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          {{props.question}}
        </v-card-title>
         <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="disagree"
          >
            Нет
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="agree"
          >
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import {defineProps, ref} from 'vue'

const props = defineProps(['acceptFunc', 'disacceptFunc', 'question', 'btnText'])

const dialog = ref(false)

const btnText = ref(props.btnText)

const agree = ()=>{
  props.acceptFunc()
  dialog.value = false
}

const disagree = ()=>{
  dialog.value = false
  props.disacceptFunc()

}


</script>

<style scoped>

</style>
