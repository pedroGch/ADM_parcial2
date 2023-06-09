<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <h2>Bienvenida {{usuario | mayuscula}} a tu libro de recetas</h2>
      </v-col>
      <v-col cols="12" class=" div-h3 p-2 mt-5 d-flex">
        <div class="ps-2 pt-1">
          <img src="./../../public/img/icons/star_icon60.png" alt="icono estrella">
        </div>
        <h3 color="textoGris">Recetas recomendadas</h3>
      </v-col>
      <!-- <v-row>
        <div v-for = "(receta, i) in libroDeCocina" :key="i" class="col-12 col-lg-4 p-4 my-3 m-md-4 card-receta-home">
          <div class="row div-categ d-flex">
            <div class="col-5 col-sm-2">
              <div class="ps-2 pt-1">
                <v-img src="./img/icons/meal_icon80.png" alt="icono cubiertos"></v-img>
              </div>
            </div>
            <div class="col-7 col-sm-10 pt-4">
              <span class="p-categoria">{{receta.categoria | mayusculaPrimeraLetra}}</span>
            </div>
          </div>
          <div class="row d-flex">
            <div class="col-12 order-2 order-lg-1">
              <span class="p-nombre-receta">{{receta.nombre | mayusculaPrimeraLetra}}</span>
                <div class="row d-flex pb-3 pe-2">
                  <div class="col-8 col-md-4 pt-4">
                    <p class="me-gusta">Me gusta</p>
                  </div>
                  <div class="col-4 col-md-7 pt-3 icono-corazon" @click="darMeGusta(i)">
                    <v-img v-if="receta.meGusta " src="./img/icons/heart_icon_filled.png" alt="icono corazon"></v-img>
                    <v-img v-else src="./img/icons/heart_icon.png" alt="icono corazon"></v-img>
                  </div>

                </div>
            </div>
            <div class="col-12 p-3 order-1 order-lg-2">
              <v-img class="img-fluid img-card-receta" :src="receta.imagen_ruta"></v-img>
            </div>
          </div>
          <div class="row d-flex justify-content-center">
            <button class="col-5 p-2 boton-card-receta" data-bs-toggle="modal" data-bs-target="#modalReceta" @click="seleccionarReceta(receta)">Ver más</button>
          </div>
        </div>
      </v-row> -->

      <v-card
        
        class="mx-auto my-12"
        max-width="374"
        v-for = "(receta, i) in libroDeCocina" :key="i"
      >

      <v-img
        height="250"
        :src="receta.imagen_ruta"
      ></v-img>

      <v-card-title>{{receta.nombre | mayusculaPrimeraLetra}}</v-card-title>

      <v-card-text>
        <div class="mb-3 text-subtitle-1">
          Receta {{ receta.categoria }}
        </div>   
        <v-row
          align="center"
          class="mx-0"
        >
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <div class="grey--text ms-4">
            {{receta.cantMeGusta}}
          </div>
        </v-row>

      </v-card-text>

      <v-divider class="mx-4"></v-divider>

    <v-card-title>Encontralo como</v-card-title>

    <v-card-text>
      <v-chip-group
        
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>dulce de leche</v-chip>

        <v-chip>harinas</v-chip>

        <v-chip>panqueques</v-chip>

        <v-chip>merienda</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>

      <v-btn
          color="secondary"
          dark
          @click.stop="seleccionarReceta(receta)"
        >
          ver más
        </v-btn>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>


      <v-dialog
      v-model="dialog"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ recetaSeleccionada.nombre }}
        </v-card-title>
        <v-divider class="my-2"></v-divider>
        <v-card-text>
          <ul>
            <li v-for="(i, index ) in ingredientesSleccionados" :key="index" >
              {{ i.nombre }} - {{ i.cantidad }} - {{ i.unidad }}
            </li>
          </ul>
        </v-card-text>
        <v-card-text>
          {{ recetaSeleccionada.preparacion }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
          color="secondary"
          text
          @click="reiniciarIngredientes()"
        >
          Cerrar
        </v-btn>


        </v-card-actions>
      </v-card>
    </v-dialog>

 
  </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data(){
      return{
      dialog: false,
      miLibroDeRecetas: [],
      ingredientesSleccionados:[],
      recetaSeleccionada: {},
      libroDeCocina: [
        {
          nombre:"panqueques",
          categoria:"dulce",
          cantMeGusta: 145,
          ingredientes:[
            {nombre:"huevo", cantidad: "3", unidad:"Unidades"},
            {nombre:"azúcar Hileret Light", cantidad: "1", unidad:"cucharada"},
            {nombre:"lehe", cantidad: "1", unidad:"taza"},
            {nombre:"harina 0000", cantidad: "1", unidad:"taza"},
            {nombre:"sal", cantidad: "1", unidad:"pizca"}
          ],
          preparacion: `mezclar los huevos con el azúcar Hileret Light, incorporar la leche y la pizca de sal.
          Por último, agregar de a poco la harina para que no se formen grumos.
          Poner a calentar en una sartén o panquequera una cucharada de manteca, esparcir por toda la sartén para que el panqueque no se pegue.
          Luego agregar la mezcla con un cucharón (la cantidad depende del espesor que te guste) y cocinar hasta que veas que se despegan los bordes y se dora, dar vuelta y terminar la cocción.
          Algunas opciones de relleno pueden ser clásico con dulce de leche sin azúcar, mermelada de duraznos light con peras frescas, frutos rojos y todas las que te animes a probar.`,
          imagen_ruta: "/img/panqueque.jpg",
          alt: "imagen de de panqueques",
          meGusta: false
        },
        {
          nombre:"salsa de hongos de pino",
          categoria:"salada",
          cantMeGusta: 40,
          ingredientes: [
            {"nombre": "cebolla", "cantidad": "1", "unidad": "unidad"},
            {"nombre": "manteca", "cantidad": "25", "unidad": "gr"},
            {"nombre": "aceite", "cantidad": "2", "unidad": "cucharada"},
            {"nombre": "harina", "cantidad": "1", "unidad": "cucharada"},
            {"nombre": "agua caliente", "cantidad": "1", "unidad": "taza"},
            {"nombre": "hongos de pino", "cantidad": "30", "unidad": "gr"},
            {"nombre": "perejil", "cantidad": "1", "unidad": "cucharada"},
            {"nombre": "jugo de limon", "cantidad": "1", "unidad": "cucharada"},
            {"nombre": "sal", "cantidad": "15", "unidad": "gr"},
            {"nombre": "pimienta", "cantidad": "1", "unidad": "cucharadita"},
            {"nombre": "mostaza", "cantidad": "1", "unidad": "cucharada"}
          ],
          preparacion: `poner a remojar en la taza de agua los hongos y picar finamente el prejil.
          Colocar en una sartén la manteca y el aceite. Cuando estén calientes, dorar la cebolla y agregar la harina; añadir revolver un rato y cuando esté todo cocido, añadir el jugo de limón, los hongos con el agua en que han estado en remojo, el perejil, y dejar cocinar 5 ó 10 minutos; si quedara  muy espesa,, agregar un poco más de caldo o agua.
          Nota: Esta salsa es muy rica para acompañar carnes o arroz blanco.
          `,
          imagen_ruta: "/img/salsa_hongos.jpg",
          alt: "imagen ilustrativa de salsa de hongos de pino",
          meGusta: false
        }
      ],
      usuario: "mabel",
    }
    },
    methods:{
      actualizarLibroDeRecetas:function (recetario){
        //aca voy a preguntar si hay algo en el local storage y lo actualizo
        this.miLibroDeRecetas = recetario
      },
      seleccionarReceta: function (unaReceta){
        unaReceta.ingredientes.forEach(ing => {
          this.ingredientesSleccionados.push(ing)
        })
        this.recetaSeleccionada = unaReceta;
        this.dialog = true;
        
      },
      reiniciarIngredientes: function (){
        this.ingredientesSleccionados = []
        this.dialog = false
      },
      darMeGusta: function(indice){
        console.log(this.libroDeCocina[indice].meGusta)
        this.libroDeCocina[indice].meGusta = !this.libroDeCocina[indice].meGusta
        
      }
    },
    mounted: function(){ //al insertar al DOM    
      let jsonlibroDeRecetas = localStorage.getItem('libroDeRecetas');

      if (jsonlibroDeRecetas != undefined || jsonlibroDeRecetas != undefined){
        let libroDeRecetas = JSON.parse(jsonlibroDeRecetas)
        this.actualizarLibroDeRecetas(libroDeRecetas)
      }
    },
    filters:{
      mayuscula:function (value){
        if (!value) return "";
        return value.toUpperCase();
      },
      mayusculaPrimeraLetra: function (texto){
        if (!texto) return "";
        return texto.charAt(0).toUpperCase() + texto.slice(1)
      }
    }
  }
</script>
<style>
  h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.8rem;
    font-weight: 600;
    color: #F3F6F9;
    padding: 1rem 0 1rem 1rem;
  }
  .div-h3 {
    background-color: #775653;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
</style>