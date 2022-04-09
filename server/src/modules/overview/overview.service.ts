import { getRepository } from "typeorm";
import platformLinks, {
  platformShortLinks,
} from "../../configs/platform-links.config";
import { HttpException } from "../../helpers/errors/http.exception";
import { Election } from "../election/entity/election.entity";
import { finalStatusSubquery } from "../launchpad/launchpad.helper";
import { OverviewDetails } from "./overview.interface";

const getElectionDetails = async (_election_id: number) => {
  const electionRepository = getRepository(Election);

  let builder = electionRepository.createQueryBuilder("election");

  builder = builder
    .select([
      "election.id",
      "election.title",
      "election.slug",
      "election.start_date",
      "election.close_date",
      "election.status",
      "election.archive",
      "election.final_status",
      "election.allow_pre_register",
    ])
    .addSelect(finalStatusSubquery(builder.alias))

    .loadRelationCountAndMap("election.votersCount", "election.voters")
    .loadRelationCountAndMap("election.votesCount", "election.votes")
    .loadRelationCountAndMap("election.votedCount", "election.voted")
    .loadRelationCountAndMap("election.partiesCount", "election.party")
    .loadRelationCountAndMap("election.candidatesCount", "election.candidates")
    .loadRelationCountAndMap("election.positionsCount", "election.positions")
    .where("election.id = :_election_id", {
      _election_id,
    });

  const election = await builder.getOne();

  if (!election) throw new HttpException("BAD_REQUEST", "Election not exist");

  const longUrl = platformLinks.voting.replace("$electionSlug", election.slug);
  const preRegisterUrl = election.allow_pre_register
    ? platformLinks.preRegister.replace("$electionSlug", election.slug)
    : null;
  const shortUrl = platformShortLinks.voting.replace(
    "$electionId",
    election.id.toString()
  );

  const urls = {
    longUrl,
    preRegisterUrl,
    shortUrl,
  };

  return { ...election, urls } as OverviewDetails;
};

const overviewServices = {
  getElectionDetails,
};

export default overviewServices;
