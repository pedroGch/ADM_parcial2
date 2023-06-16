<template>
  <div>
  <receta-form
    :editarReceta="RecetaParaEditar"
  ></receta-form>

</div>
</template>

<script>
  import RecetaForm from '../components/RecetaForm.vue'

  export default {
    name: 'CargarRecetaView',

    components: {
      RecetaForm,
    },
    props:{
      
    },
    data(){
      return{
        RecetaParaEditar: null,
      }
    },
    mounted: function(){
      //si me llega por parametro un id para editar lo busco en mi libro de recetas y lo envio como una prop
      if (this.$route.idEditar != undefined){
        let misRecetas = JSON.parse(localStorage.getItem('miLibroDeRecetas'))
        this.RecetaParaEditar = misRecetas[this.$route.idEditar]
      }

    }
  }
</script>