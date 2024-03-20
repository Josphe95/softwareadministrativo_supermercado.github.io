<script>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {

  setup() {
    const router = useRouter();
    const empleados = ref([]);
    const areas = ref([]);
    const showRegistro = ref(false);
    const esAdmin = ref(false);

    const store = useStore();

    esAdmin.value = store.state.usuario ? store.state.usuario.admin : false;

    

    const obtenerDatosEmpleados = async () => {
      const response = await fetch('http://localhost:3000/empleados');
      const dataEmpleados = await response.json();
      empleados.value = dataEmpleados;
      return  empleados ;
    };

    obtenerDatosEmpleados();

    const obtenerDatosAreas = async () => {
      const response = await fetch('http://localhost:3000/areas');
      const dataAreas = await response.json();
      areas.value = dataAreas;
      return areas;
    }

    obtenerDatosAreas();

    const obtenerNombreArea = (areaId) => {
      const area = areas.value.find(area => area.id === areaId);
      return area ? area.descripcion : 'Sin área asignada';
    };
    obtenerNombreArea()


    const obtenerCargoEmpleado = (cargoId) => {
      const cargo = areas.value.find(cargo => cargo.id === cargoId);
      return cargo ? cargo.descripcion : 'NN';
    }

  const deleteEmpleado = ref(false)

  const eliminarEmpleado = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/empleados/${id}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    console.log('data', data);
    deleteEmpleado.value = false
    await obtenerDatosEmpleados(); 
    router.replace('/');
    } catch (error) {
      console.log('Error al eliminar el empleado:', error);
    }
  }

  const id = ref('')

    return {
      empleados,
      areas,
      obtenerNombreArea,
      showRegistro,
      deleteEmpleado,
      eliminarEmpleado,
      id,
      obtenerCargoEmpleado,
      esAdmin
    }

  },
  
}
</script>

<template>
  <main class="w-full">
    <h1 class="text-center text-red-500 font-bold">EMPLEADOS GA SUPERMERCADO</h1>
    <div class="rounded-md mt-2 max-h-[500px] overflow-y-scroll divEmpleados">
      <table class="table-auto w-full">
        <thead class="bg-red-500 text-left">
          <tr class="text-sm font-medium">
            <th class="w-1/12">id</th>
            <th class="w-2/12">CC</th>
            <th class="w-3/12">Nombre</th>
            <th class="w-2/12">Email</th>
            <th class="w-2/12">Area</th>
            <th class="w-2/12">Cargo</th>
            <th class="w-2/12">Sueldo Bruto</th>
            <th class="w-2/12">Sueldo Neto</th>
            <th class="w-2/12">Estado</th>
            <th class="w-1/12">Admin</th>
          </tr>
        </thead>
        <tbody class="text-xs">
          <tr v-for="empleado in empleados" :key="empleado.id">
            <td class="text-left">{{ empleado.id }}</td>
            <td class="text-left">{{ empleado.documento }}</td>
            <td class="text-left">{{ empleado.nombre_completo }}</td>
            <td class="text-left">{{ empleado.email }}</td>
            <td class="text-left">{{ obtenerNombreArea(empleado.id_area) }}</td>
            <td class="text-left">{{ obtenerCargoEmpleado(empleado.id_cargo) }}</td>
            <td class="text-left">{{ empleado.sueldo_bruto }}</td>
            <td class="text-left">{{ empleado.sueldo_neto }}</td>
            <td class="text-left">{{ empleado.status }}</td>
            <td class="text-left">{{ empleado.admin }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex gap-8 mt-8" v-if="esAdmin">
      <div>
        <RouterLink to="/registro-de-empleado">
          <button class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Agregar Empleado</button>
        </RouterLink>
      </div>
      <div class="flex gap-2">
        <button @click="deleteEmpleado = true" class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Eliminar Empleado</button>
        <form @submit.prevent="eliminarEmpleado(id)" class="flex gap-2">
          <input v-if="deleteEmpleado" type="number" class="bg-white w-24 text-red-500 font-bold py-2 px-4 rounded" placeholder="Id" v-model="id">
          <button v-if="deleteEmpleado" class="text-red-500 font-bold py-2 px-4 rounded">Eliminar</button>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
.divEmpleados::-webkit-scrollbar {
  background-color: transparent;
  width: 5px;
  border-radius: 0 15px 15px 0;
}

.divEmpleados::-webkit-scrollbar-thumb {
  background-color: rgba(255, 0, 0, 0.11);
  border-radius: 6px;
}

.divEmpleados::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>

