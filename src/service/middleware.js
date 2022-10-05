import axios from 'axios'
import store from '@/store'

export default {

  // SE ->NAO<- ESTA AUTENTICADO
  async redirectIfNotAuthenticated(to, from, next) {
    const token = localStorage.getItem('access_token')

    if (!token) {
      next({ name: 'login' })
    }
    // AINDA TEM QUE CHECAR SE O TOKEN ESTA VALIDO
    await axios
      .get('http://localhost:8000/api/v1/auth/me')
      .then(response => {
        if (!store?.state?.user?.id) {
          store.commit('user/STORE_USER', response.data.data)
        }
      })
      .catch(() => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_data')
        localStorage.removeItem('user_id')
        localStorage.removeItem('user_email')
        localStorage.removeItem('user_role')
        next({ name: 'login' })
      })

    next()
  },

  // SE ESTA AUTENTICADO
  redirectIfAuthenticated(to, from, next) {
    const token = localStorage.getItem('access_token')
    let n

    if (token) {
      n = { name: 'home' }
    }

    next(n)
  },
}
