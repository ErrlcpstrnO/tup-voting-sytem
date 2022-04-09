import Vue from "vue";
import mixins from "vue-typed-mixins";
import manageElectionMixins from "./manage-election.mixins";

const votersMixin = mixins(manageElectionMixins).extend({
  data() {
    return {
      pagePath: "voters",
    };
  },

  methods: {
    createVoterRoute() {
      this.$router.push(`${this.pagePath}/create`);
    },
    editVoterRoute(id: string) {
      this.$router.push(`${this.pagePath}/${id}/edit`);
    },
    importVoterRoute() {
      this.$router.push(`${this.pagePath}/import`);
    },
  },
});

export default votersMixin;
