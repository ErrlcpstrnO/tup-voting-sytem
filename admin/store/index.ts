import { getAccessorType } from "typed-vuex";

// Import all your submodules
import * as snackbar from "~/store/snackbar";
import * as manageElection from "~/store/manageElection";

export const accessorType = getAccessorType({
  modules: {
    // The key (submodule) needs to match the Nuxt namespace (e.g. ~/store/submodule.ts)
    manageElection,
    snackbar,
  },
});
