<script>

import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {

  setup() {
    const router = useRouter();
    const store = useStore(); 
    const usuario = {
      documento: "",
      contrasena: "mimamamemima"
    };

    const iniciarSesion = async () => {
      try {
        const response = await store.dispatch('login', usuario);
        if (!response) {
          console.log('Sesión iniciada correctamente');
        router.replace('/'); 
        } else {
          console.log('Error al iniciar sesión:', response);
        } 
        
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    };


    return {
      iniciarSesion,
      usuario
    }
  },
  
}

</script>

<template>
  <main class="w-[500px] mx-auto p-6 mt-16 flex flex-col justify-center items-center text-center bg-[#f9f9f976] rounded-md">
    <form @submit.prevent="iniciarSesion" class="flex flex-col w-full gap-2 text-black font-medium" >
      <label for="number">Documento de identidad</label>
      <input type="number" name="number" id="number" v-model="usuario.documento">
      <label for="password">Contraseña</label>
      <input type="password" name="password" id="password" v-model="usuario.contrasena">

      
      <button
        class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded" >
        Acceder
      </button>
    
    </form>
    
  </main>
  <div class="absolute bottom-16 right-16 uppercase text-red-500">
    <RouterLink to="/registro-de-empleado">Registro</RouterLink>
  </div>
</template>
