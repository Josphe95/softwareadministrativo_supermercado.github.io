import router from '@/router'
import { createStore } from 'vuex'

export default createStore({
  state: () => ({
    token: null,
    usuario: null,
    empleados: [],
    areas: []
  }),
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUsuario(state, usuario) {
      state.usuario = usuario
    },
    setEmpleados(state, empleados) {
      state.empleados = empleados
    },
    setAreas(state, areas) {
      state.areas = areas
    }
  },
  actions: {
    async login({ commit }, usuario) {
      try {
        const res = await fetch('http://localhost:3000/iniciar-sesion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(usuario)
        })

        const data = await res.json()

        if (data) {
          commit('setToken', data.token)
          commit('setUsuario', data.empleado)
          console.log("router", router);
          router.replace('/');
          
        }
        if (data.token === null && data.token !== true) {
          console.log("El token es nulo, ", data.token);
          router.push('/iniciar-sesion');
        }
    


      } catch (error) {
        console.log(error);
      }
    },
    obtenerToken({ commit }) {
      if (localStorage.getItem('token')) {
        commit('setToken', localStorage.getItem('token'))
      } else {
        commit('setToken', null)
      }
  },
  obtenerEmpleados({ commit }) {
    fetch('http://localhost:3000/empleados')
      .then(res => res.json())
      .then(data => {
        commit('setEmpleados', data)
      })
  },
  obtenerAreas({ commit }) {
    fetch('http://localhost:3000/areas')
      .then(res => res.json())
      .then(data => {
        commit('setAreas', data)
      })
  },
  agregarEmpleado({ commit }, empleado) {
    fetch('http://localhost:3000/empleados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(empleado)
    })
      .then(res => res.json())
      .then(data => {
        commit('setEmpleados', data)
      })
  },
  cerrarSesion({ commit }) {
    commit('setToken', null)
    localStorage.removeItem('token')
  }
}, 
  modules: {
  }
})