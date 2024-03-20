<script>
import { ref } from 'vue';


export default {
  setup() {
    const showConfirm = ref(false);
    const showFormulario = ref(true);
    const agregarEmpleados = async (empleado) => {
      if (!empleado.admin) {
        empleado.admin = false
      }
      try {
        await fetch('http://localhost:3000/empleados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(empleado)
        })
        showConfirm.value = true;
        showFormulario.value = false;
        reiniciarFormulario();

        console.log('Empleado agregado correctamente');
      } catch (error) {
        console.error('Error al agregar empleado:', error);
      }
    };

    const reiniciarFormulario = () => {
      empleado.value = {
        nombre_completo: '',
        documento: '',
        email: '',
        id_area: null,
        id_cargo: null,
        sueldo_bruto: null,
        sueldo_neto: null,
        status: '', 
        admin: false
      };
    };

    const empleado = ref({
      nombre_completo: '',
      documento: null,
      email: '',
      id_area: null,
      id_cargo: null,
      sueldo_bruto: null,
      sueldo_neto: null,
      status: '', 
      admin: false
    });
    console.log('empleado', empleado.value);

    return {
      agregarEmpleados,
      empleado,
      showConfirm,
      showFormulario,
      reiniciarFormulario
  }
},
}
</script>

<template>
    <div class="text-center text-white">
        <RouterLink to="/">
            <button><i class="fa-solid fa-arrow-left text-red-500 hover:text-red-400 font-bold py-6 px-4 text-4xl absolute top-0 left-0"></i></button>
        </RouterLink>
        <h1 class="text-xl font-medium text-red-500 mt-10">AGREGAR EMPLEADO</h1>
        <div>
            <form 
            v-if="showFormulario"
            @submit.prevent="agregarEmpleados(empleado)" class="flex flex-col gap-2 text-white font-medium w-[95%] p-8 mx-auto">

                <div class="flex gap-8 flex-wrap">
                    <div class="flex flex-col w-[45%]">
                        <label for="name">Nombre Completo:</label>
                        <input type="text" name="name" id="name" placeholder="Nombre Completo" v-model="empleado.nombre_completo">
                        
                        <label for="number">Documento de identidad:</label>
                        <input type="number" name="number" id="number" placeholder="Documento de identidad" v-model="empleado.documento">
                        
                        <label for="email">Correo electrónico:</label>
                        <input type="email" name="email" id="email" placeholder="Correo electrónico" v-model="empleado.email">
                    </div>
    
                    <div class="grid grid-cols-2 gap-2 w-[45%]">
                        <label for="id_area">ID del área:</label>
                        <input type="number" name="id_area" id="id_area" placeholder="ID del área" v-model="empleado.id_area">
                        
                        <label for="id_cargo">ID del cargo:</label>
                        <input type="number" name="id_cargo" id="id_cargo" placeholder="ID del cargo" v-model="empleado.id_cargo">
                        
                        <label for="sueldo_bruto">Sueldo Bruto:</label>
                        <input type="number" name="sueldo_bruto" id="sueldo_bruto" placeholder="Sueldo Bruto" v-model="empleado.sueldo_bruto">
                        
                        <label for="sueldo_neto">Sueldo Neto:</label>
                        <input type="number" name="sueldo_neto" id="sueldo_neto" placeholder="Sueldo Neto" v-model="empleado.sueldo_neto">
                        
                        <label for="status">Estado:</label>
                        <input type="text" name="status" id="status" placeholder="Estado" v-model="empleado.status">
                    </div>
                </div>
                
                <div class="flex items-center justify-center gap-4 mb-8">
                    <label for="check">Administrador</label>
                    <input type="checkbox" name="check" id="check" v-model="empleado.admin">
                </div>
                
                <input 
                class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded" type="submit" value="AGREGAR">
            </form>

            <div v-if="showConfirm" class="bg-green-500 text-white font-bold py-2 px-4 rounded">
                <p>Empleado agregado correctamente</p>
            </div>
        </div>
    </div>
</template>


<style>
input {color: black;}
</style>