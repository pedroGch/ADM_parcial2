<template>
  <v-container>

    <v-row class="text-center mt-3">
    <v-row >
      <v-card
        class="mx-auto"
        id="card-form"
      >


        <v-card-title class="div-h3">
          <h3>Ingresar Receta</h3>
        </v-card-title>
        <v-divider></v-divider>

        <form class="px-4 pb-4">
          <v-row class="py-4">
            <v-col cols="6">
              <v-text-field
                cols="6"
                v-model="nombreReceta"
                :error-messages="nombreRecetaError"
                :counter="10"
                label="Nombre de la receta"
                required
                @input="$v.nombreReceta.$touch()"
                @blur="$v.nombreReceta.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                cols="6"
                v-model="selectCategoria"
                :items="categorias"
                :error-messages="selectErrorsCategoria"
                label="Categoria"
                required
                @change="$v.selectCategoria.$touch()"
                @blur="$v.selectCategoria.$touch()"
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="py-4">
            <v-col cols="12" class="div-h3">
              <h3>Ingredientes</h3>
            </v-col>
            <v-col cols="4">
              <v-text-field
                cols="6"
                v-model="nombreIngrediente"
                :error-messages="nombreIngredienteErrors"
                :counter="10"
                label="Nombre del ingrediente"
                required
                @input="$v.nombreIngrediente.$touch()"
                @blur="$v.nombreIngrediente.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                cols="6"
                v-model="cantidadIngrediente"
                :error-messages="cantidadIngredienteErrors"
                :counter="10"
                label="Cantidad"
                required
                @input="$v.cantidadIngrediente.$touch()"
                @blur="$v.cantidadIngrediente.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                cols="6"
                v-model="selectUnidades"
                :items="unidades"
                :error-messages="selectUnidadesErrors"
                label="Categoria"
                required
                @change="$v.selectUnidades.$touch()"
                @blur="$v.selectUnidades.$touch()"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="preparacion"
                :error-messages="preparacionError"                
                name="paracion"
                label="Preparación"
                hint="Escrbí la preparación"
                required
                @change="$v.preparacion.$touch()"
                @blur="$v.preparacion.$touch()"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h2>Subir archivo</h2>
            </v-col>
            <v-col cols="12">
              <v-file-input
                show-size
                truncate-length="15"
              ></v-file-input>
            </v-col>
          </v-row>
          <v-btn
            class="mr-4"
            @click="submit"
            color="secondary"
          >
            Guardar
          </v-btn>
          <v-btn @click="clear" color="secondary">
            Borrar
          </v-btn>
        </form>
      </v-card>
    </v-row>
    </v-row>
  </v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],
    validations: {
      nombreReceta: { required, maxLength: maxLength(10) },
      nombreIngrediente: { required, maxLength: maxLength(10) },
      cantidadIngrediente: { required, maxLength: maxLength(10) },
      selectUnidades: { required },
      selectCategoria: { required },
      preparacion: { required },

    },
    components: {

    },
    
    name: 'RecetaForm',
    data(){
      return{
        submitStatus: null,
        selectCategoria: null,
        selectUnidades: null,
        nombreReceta: "",
        ingredientes: [],
        nombreIngrediente: "",
        cantidadIngrediente: "",
        unidad_nombre: "",
        mostrar:true,
        mostrarBoton: false,
        preparacion: "",
        categorias: [
          'Salados',
          'Dulces',
          'Fit',
          'Free Gluten',
        ],

        unidades:[
          "a gusto",
          "kg",
          "Un",
          "gr",
          "lt",
          "ml"
        ],
      }
    },
    computed: {
      selectErrorsCategoria () {
        const errors = []
        if (!this.$v.selectCategoria.$dirty) return errors
        !this.$v.selectCategoria.required && errors.push('La categoría es requerida')
        return errors
      },
      selectUnidadesErrors (){
        const errors = []
        if (!this.$v.selectUnidades.$dirty) return errors
        !this.$v.selectUnidades.required && errors.push('La unidad es requerida')
        return errors
      },
      nombreRecetaError() {
        const errors = []
        if (!this.$v.nombreReceta.$dirty) return errors
        !this.$v.nombreReceta.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.nombreReceta.required && errors.push('Se debe ingresar un nombre para la receta.')
        return errors
      },
      preparacionError() {
        const errors = []
        if (!this.$v.preparacion.$dirty) return errors
        !this.$v.preparacion.required && errors.push('La preparación es importante, no te olvides de agregarla.')
        return errors
      },
      nombreIngredienteErrors () {
        const errors = []
        if (!this.$v.nombreIngrediente.$dirty) return errors
        !this.$v.nombreIngrediente.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.nombreIngrediente.required && errors.push('Se debe ingresar un nombre para la receta.')
        return errors
      },
      cantidadIngredienteErrors () {
        const errors = []
        if (!this.$v.cantidadIngrediente.$dirty) return errors
        !this.$v.cantidadIngrediente.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.cantidadIngrediente.required && errors.push('Se debe ingresar un nombre para la receta.')
        return errors
      },

    },
    methods:{
      submit () {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          // do your submit logic here

            this.submitStatus = 'OK'
            console.log("todo ok")
 
        }
      },
      clear () {
        this.$v.$reset()
        this.selectUnidades = ''
        this.nombreReceta = ''
        this.nombreIngrediente = ''
        this.cantidadIngrediente = ''
        this.selectCategoria = null
        this.preparacion = ''
      },
    }
  }
</script>
<style>
  #card-form{
    max-width: 80vw;
  }
</style>