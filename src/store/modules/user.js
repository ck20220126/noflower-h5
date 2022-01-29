// import { authLogin } from '@/service/api';

// const AUTH_LOGIN = 'SET_CITY_LIST';

export default {
  namespaced: true,
  state: {
    auth: {},
  },
  mutations: {
    // [AUTH_LOGIN](state, param) {},
  },
  actions: {
    authLogin({ commit }, param) {
      commit('AUTH_LOGIN', param);
    },
  },
};
