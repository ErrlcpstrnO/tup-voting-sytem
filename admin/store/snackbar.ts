import { actionTree, mutationTree } from "typed-vuex";
const defaultSnackbar = {
  show: false,
  message: "",
  color: "",
  timeout: -1,
};

type SnackbarConfig = {
  show: boolean;
  message: string;
  color: "success" | "error" | "primary" | string;
  timeout?: number;
};

export const state = () => ({
  snackbar: defaultSnackbar,
});

export const mutations = mutationTree(state, {
  set(state, _config) {
    state.snackbar = _config;
  },
});

export const actions = actionTree(
  { state, mutations },
  {
    async show({ commit }, _config: SnackbarConfig) {
      commit("set", _config);
    },
    async reset({ commit }) {
      commit("set", defaultSnackbar);
    },
  }
);
