import { gql } from "graphql-request";

/**
 * @name VAULT_USERS_QUERY
 * @description Request a user
 */
export const VAULT_USERS_QUERY = gql`
  query {
    users {
      id
      address
      shares
    }
  }
`;

/**
 * @name VAULT_SWAPS_QUERY
 * @description Request a user
 */
export const VAULT_SWAPS_QUERY = gql`
  query {
    swaps {
      id
      tokenFrom
      tokenTo
      apyFrom
      apyTo
      timestamp
    }
  }
`;

/**
 * @name VAULT_PROPOSALS_QUERY
 * @description Request a proposal
 */
export const VAULT_PROPOSALS_QUERY = gql`
  query {
    proposals {
      id
      borrower
      borrowAsset
      borrowAmount
      interestAmount
      interestRateMode
      yesVotes
      yesCount
      noVotes
      details
      createdAt
    }
  }
`;

/**
 * @name VAULT_VOTES_QUERY
 * @description Request a proposal
 */
export const VAULT_VOTES_QUERY = gql`
  query {
    votes {
      id
      user
      vote
      proposalId
      proposalIndex
      maxSharesStaked
      createdAt
    }
  }
`;

/**
 * @name VAULT_LOANS_QUERY
 * @description Request a proposal
 */
export const VAULT_LOANS_QUERY = gql`
  query {
    loans {
      id
      borrower
      asset
      amount
      interest
      interestRateMode
      withdrawn
      repayed
      loanStart
      loanEnd
    }
  }
`;
