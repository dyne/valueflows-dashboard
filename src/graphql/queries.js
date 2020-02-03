import gql from "graphql-tag";

export const ALL_RESOURCES = gql`
  query allEconomicResources {
    allEconomicResources {
      name
      resourceQuantityHasNumericalValue
      resourceQuantityHasUnit
      currentLocation
      note
      conformsTo
    }
  }
`;

export const ALL_EVENTS = gql`
  query allEconomicEvents {
    allEconomicEvents {
      action
      resourceDescription
      note
      resourceInventoriedAs {
        name
      }
      toResourceInventoriedAs {
        name
      }
      resourceQuantityHasNumericalValue
      resourceQuantityHasUnit
      currentLocation
      resourceConformsTo
    }
  }
`;

export const ALL_INTENTS = gql`
  query allIntents {
    allIntents {
      action
      atLocation
      intentId
      description
      resourceConformsTo
    }
  }
`;