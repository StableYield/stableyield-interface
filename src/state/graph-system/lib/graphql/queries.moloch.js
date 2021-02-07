import { gql } from "graphql-request";

/**
 * @name MOLOCH_QUERY
 * @description Request a user
 */
export const MOLOCH_QUERY = gql`
  query {
    moloch {
      id
      title
      version
      summoner
      newContract
      deleted
      summoningTime
      periodDuration
      votingPeriodLength
      gracePeriodLength
      proposalDeposit
      dilutionBound
      processingReward
      depositToken
      approvedTokens
      guildBankAddress
      guildBankBalanceV1
      tokens
      members
      tokenBalances
      proposals
      rageQuits
      minions
      totalShares
      totalLoot
    }
  }
`;

/**
 * @name MEMBERS_QUERY
 * @description Request a user
 */
export const MEMBERS_QUERY = gql`
  query($ids: [ID]) {
    members(ids: $ids) {
      id
      createdAt
      moloch
      molochAddress
      memberAddress
      delegateKey
      shares
      loot
      exists
      highestIndexYesVote
      tokenTribute
      didRagequit
      votes
      submissions
      tokenBalances
      rageQuits
      proposedToKick
      kicked
      jailed
    }
  }
`;

/**
 * @name VOTES_QUERY
 * @description Request a user
 */
export const VOTES_QUERY = gql`
  query($ids: [ID]) {
    votes(ids: $ids) {
      id
      createdAt
      proposal
      member
      uintVote
      molochAddress
      memberAddress
      memberPower
      proposalIndex
      delegateKey
    }
  }
`;

/**
 * @name PROPOSALS_QUERY
 * @description Request a user
 */
export const PROPOSALS_QUERY = gql`
  query($first: Int, $ids: [ID]) {
    proposals(ids: $ids, first: $first) {
      id
      timestamp
      proposalIndex
      startingPeriod
      timestamp
      proposalIndex
      startingPeriod
      delegateKey
      member {
        id
      }
      memberAddress
      applicant {
        id
      }
      applicantAddress
      tokenTribute
      sharesRequested
      yesVotes
      noVotes
      yesShares
      noShares
      processed
    }
  }
`;
