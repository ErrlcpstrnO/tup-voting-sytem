import apiClient from ".";
import { Candidate } from "./candidate.service";
import { Election, ElectionStatus } from "./election.service";
import { Position } from "./position.service";

export type OverviewDetails = Pick<
  Election,
  "id" | "slug" | "title" | "start_date" | "close_date" | "archive"
> & {
  final_status: ElectionStatus;
  votersCount: number;
  votesCount: number;
  partiesCount: number;
  candidatesCount: number;
  positionsCount: number;
};

const url = "/api/v1/overview";

const overviewServices = {
  async getDetails(election_id: number): Promise<OverviewDetails> {
    return (await apiClient.get(`${url}/detail/${election_id}`)).data;
  },
};

export default overviewServices;
