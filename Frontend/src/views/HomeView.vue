<script>
import EmpleadosComponent from '../components/EmpleadosComponent.vue';
import AreasComponent from '../components/AreasComponent.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const token = ref(null);
    const nombre = ref('');
    const esAdmin = ref(false);

    const fetchData = async () => {
      try {
        const response = await store.dispatch('obtenerToken');
        token.value = response;
        if (token.value) {
          const dataUser = await store.state.usuario;
          if (dataUser) {
            nombre.value =  await dataUser.nombre_completo;
            esAdmin.value =  await dataUser.admin;
            console.log("valor de esAdmin:", esAdmin.value);
            console.log("valor de token:", token.value);
            console.log("valor de nombre:", nombre.value);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    
    // Función para cerrar sesión
    const cerrarSesion = () => {
      localStorage.removeItem('token');
      router.push('/iniciar-sesion');
    };

    return {
      token,
      cerrarSesion,
      esAdmin,
      nombre
    };
  },

  components: {
    EmpleadosComponent,
    AreasComponent
  },

};
</script>


<template>
  <main class="mb-16">
    <h1 class="text-center text-gray-300 font-bold m-4">Bienvenido <span class="uppercase ml-2">{{ nombre }}</span> </h1>
    <div class="">
      <div class="">
        <EmpleadosComponent />
      </div>
      <div class="">
        <AreasComponent/>
      </div>
    </div>

    
    <button 
    @click="cerrarSesion"
    class=" text-red-500 hover:text-red-400 font-bold py-6 px-4 text-4xl absolute top-0 right-0"><i class="fa-solid fa-power-off"></i></button>
  </main>
</template>


