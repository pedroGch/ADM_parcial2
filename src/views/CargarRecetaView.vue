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
      RecetaParaEditar: null
    }
  }
</script>