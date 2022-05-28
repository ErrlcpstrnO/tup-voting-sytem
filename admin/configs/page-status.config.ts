import { ElectionStatus } from "../services/election.service";

const pageStatus = {
  launchpad: ["building"],
  results: ["completed", "archived"],
  party: {
    create: ["building", "preview"],
    edit: ["building", "preview"],
  },
  voters: {
    create: ["building", "preview"],
    edit: ["building", "preview"],
    import: ["building", "preview"],
    export: ["building", "preview", "running", "completed", "archived"],

    table: {
      isVoted: ["running", "completed", "archived"],
      action: ["building"],
    },
  },
  positions: {
    create: ["building", "preview"],
    edit: ["building", "preview"],
    arrange: ["building", "preview", "running"],
  },
  candidate: {
    create: ["building", "preview"],
    edit: ["building", "preview"],
  },
  settings: {
    closeElection: ["running"],
    archiveElection: ["completed"],
    emails: {
      page: ["preview", "running", "completed"],
      credentials: ["preview", "running"],
      electionHasLaunched: ["preview", "running"],
      electionHasEnded: ["completed"],
    },
    publicity: {
      page: ["building", "running", "preview", "completed"],
      preRegistration: ["building", "preview"],
    },
  },

  preRegister: ["preview"],

  overview: {
    counts: {
      participation: ["preview", "completed", "archived"],
    },
  },
};

export default pageStatus;
