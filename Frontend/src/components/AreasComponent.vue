<script>
import { ref } from 'vue';
export default {
    setup() {
        const areas = ref([]);

        const obtenerDatosAreas = async () => {
            const response = await fetch('http://localhost:3000/areas');
            const dataAreas = await response.json();
            areas.value = dataAreas;
            return areas;
        }

        obtenerDatosAreas();
        return {
            areas,
    }
  }
}
</script>

<template>
    <h1 class="text-center text-red-500 font-bold">Areas</h1>
    <div class="rounded-md mt-2 h-[300px]">
        <div>
            <table class="table-fixed">
                <thead class="bg-red-500">
                    <tr>
                        <th class="w-1/12">Id</th>
                        <th class="w-1/12">Area</th>
                        <th class="w-1/12"># de Empleados</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="area in areas" :key="area.id">
                        <td>{{ area.id }}</td>
                        <td>{{ area.descripcion }}</td>
                        <td>{{ area.numero_empleados }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
    <div class="mt-8">
        <button class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">Agregar Area</button>
    </div>
</template>