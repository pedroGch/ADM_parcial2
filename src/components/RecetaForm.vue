<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center pb-3">
        <h2>Ingresar Receta</h2>
      </v-col> 
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'RecetaForm',
    data(){
      return{
        sombraError:false,
          unidades:[
            {"nombre": "a gusto" , "id": 0},
            {"nombre": "kg" , "id": 1},
            {"nombre": "Un" , "id": 2},
            {"nombre": "gr" , "id": 3},
            {"nombre": "lt" , "id": 4},
            {"nombre": "ml" , "id": 5},
          ],
          nombreReceta: "",
          ingredientes: [],
          nombre_ingrediente: "",
          cantidad_ingrediente: "",
          unidad_nombre: "",
          mostrar:true,
          mostrarBoton: false,
          preparacion: "",
          categoriaSeleccionada: "",
          errores: {
            "nombre": "",
            "ingredientes": "",
            "categoria": "",
            "preparacion": "",
          },
          err_nombre:"",
          err_ingredientes: "",
          err_categoria: "",
          err_preparacion: "",
          imagen_receta: null
      }
    },
    computed: {
      existenErrores: function(){
        return this.errores.length
      }  
    },
    methods:{
      ingresarIngrediente:function () {
        let ing = {}
        if (this.nombre_ingrediente != "" && this.cantidad_ingrediente != "" && this.unidad_nombre != ""){
          ing.nombre = this.nombre_ingrediente
          ing.cantidad = this.cantidad_ingrediente
          ing.unidad = this.unidad_nombre

          this.ingredientes.push(ing)

          this.mostrar = !this.mostrar
          this.mostrarBoton = !this.mostrarBoton

          this.limpiarCamposIngredientes()
        }else{
          this.imprimirFaltaIngrediente()
        }
        
      },
      mostrarForm:function () {
        this.mostrar = !this.mostrar
        this.mostrarBoton = !this.mostrarBoton
      },

      limpiarCamposIngredientes:function(){
        this.nombre_ingrediente = ""
        this.cantidad_ingrediente = ""
        this.unidad_nombre = ""
        
      },

      limpiarTodosLosCampos:function (){
        this.limpiarCamposIngredientes()
        this.categoriaSeleccionada = ""
        this.nombreReceta = ""
        this.preparacion = ""
        this.ingredientes = []

      },

      eliminarIngrediente:function (indice){
        console.log(indice)
        if (indice == 0){
          this.ingredientes.splice(indice, 1)
        }else if (indice == this.ingredientes.length){
          this.ingredientes.pop();
        }
        this.ingredientes.splice(indice, indice)

      },

      guardarReceta:function (){
        this.recetErrores();
        let receta = {
          nombre: "",
          categoria: "",
          ingredientes: [],
          preparacion: "",
          imagen_ruta: null,
          alt: ""
          
        }
    
        if (this.validarFormulario()){
          receta.nombre = this.nombreReceta
          receta.categoria = this.categoriaSeleccionada
          receta.ingredientes = this.ingredientes
          receta.preparacion = this.preparacion
          receta.alt = "imagen representativa de la receta " + receta.nombre
          if (this.imagen_receta){
            receta.imagen_ruta = this.imagen_receta
          }else{
            receta.imagen_ruta = "/img/receta-predeterminada.jpg"
          }
          this.actualizarLocalStorage(receta)
          this.mostrarCartelExito()
        }else{
          this.mostrarErrores()
        }

        
      },

      actualizarLocalStorage:function (unaReceta){
        let libroDeRecetas = [];
        let jsonlibroDeRecetas = localStorage.getItem('libroDeRecetas');
        if (jsonlibroDeRecetas != undefined){
          libroDeRecetas = JSON.parse(jsonlibroDeRecetas);
        }

        libroDeRecetas.push(unaReceta);
        localStorage.setItem('libroDeRecetas', JSON.stringify(libroDeRecetas));

        this.limpiarCamposIngredientes()
        this.limpiarTodosLosCampos()

      },
      validarFormulario: function (){
        let bandera = true
        if (this.nombreReceta == ""){
          bandera = false
          this.errores.nombre = 'El nombre de la receta es obligatorio.'
        }
        if(this.ingredientes.length <= 1 ){
          bandera = false
          this.errores.ingredientes = 'Debe ingresar más de un elemento.'
        }
        if(this.categoriaSeleccionada == ""){
          bandera = false
          this.errores.categoria = 'Se debe seleccionar una categoria.'
        }
        if(this.preparacion == ""){
          bandera = false
          this.errores.preparacion = 'Es necesario que se describa la preparación.'
        }
        this.sombraError = !bandera
        return bandera

      },
      mostrarErrores: function(){
        this.err_nombre = this.errores["nombre"]
        this.err_categoria = this.errores["categoria"]
        this.err_ingredientes = this.errores["ingredientes"]
        this.err_preparacion = this.errores["preparacion"]
      },
      recetErrores: function (){
        this.errores.nombre = ""
        this.errores.ingredientes = ""
        this.errores.categoria = ""
        this.errores.preparacion = ""
        this.err_nombre = ""
        this.err_categoria = ""
        this.err_ingredientes = ""
        this.err_preparacion = ""
        this.sombraError = false
      },
      subirImagen:function (file){

        const fileReader = new FileReader();
        fileReader.readAsDataURL(file.target.files[0])

        fileReader.onload = (event) => {
          this.imagen_receta = event.target.result
          
        };
      },

    }
  }
</script>