<template>
  <v-dialog
    v-model="dialog"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5">
        {{ receta.nombre }}
      </v-card-title>
      <v-divider class="my-2"></v-divider>
      <v-card-text>
        <ul>
          <li v-for="(i, index ) in ingredientes" :key="index" >
            {{ i.nombre }} - {{ i.cantidad }} - {{ i.unidad }}
          </li>
        </ul>
      </v-card-text>
      <v-card-text>
        {{ receta.preparacion }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="secondary"
          text
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default{
    name: "ModalReceta",
    props:{
      receta:{
        type:Object,
        default: null
      }
    },
    data(){
      return{
        dialog: false
      }
      
    }
  }
</script>