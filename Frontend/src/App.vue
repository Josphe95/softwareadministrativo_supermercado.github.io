<script >
import { mapActions } from 'vuex';


export default {
  methods: {
    ...mapActions(['obtenerToken'])
  },

  created() {
    this.obtenerToken()
  }
  
}
</script>

<template>
  <header class="flex  justify-center items-center text-center relative  ">
    <img alt="Vue logo" class="logo" src="@/assets/logo-ga-supermercar.png" width="125" height="125" />

    <div>
      <h1 class="text-4xl font-medium text-red-500">SUPERMERCADO</h1>
    <h2 class="text-gray-200">Gestion Administrativa</h2>
    </div>

  </header>

  <RouterView></RouterView>

  <footer class="text-center text-gray-200 mt-4 pb-6">
    <p>GA Supermercado todos los derechos reservados.</p>
  </footer>
</template>

<style scoped>

</style>
