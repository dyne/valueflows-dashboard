import gql from "graphql-tag";


export const CREATE_INTENT = gql`
  mutation createIntent(
    $action: String
    $receiver: String
    $provider: String
    $atLocation: String
    $availableQuantityHasNumericalValue: Float
    $availableQuantityHasUnit: String
    $description: String
    $resourceConformsTo: String
  ) {
    createIntent (intent: {
      action: $action, 
      receiver: $receiver ,
      atLocation: $atLocation,
      availableQuantityHasNumericalValue: $availableQuantityHasNumericalValue
      availableQuantityHasUnit: $availableQuantityHasUnit,
      description: $description
      resourceConformsTo: $resourceConformsTo
    }) {
      intentId
    }
  }
`




export const CREATE_ECONOMIC_EVENT = gql`
  mutation createEconomicEvent(
    $action: String!,
    $note: String,
    $resourceQuantityHasUnit: String,
    $resourceQuantityHasNumericalValue: Float,
    $resourceInventoriedAs: String,
    $toResourceInventoriedAs: String,
    $currentLocation: String
    $resourceConformsTo: String
    $resourceDescription: String
  ) {
    createEconomicEvent(event: {
      action: $action,
      note: $note,
      resourceQuantityHasUnit: $resourceQuantityHasUnit,
      resourceQuantityHasNumericalValue: $resourceQuantityHasNumericalValue,
      resourceInventoriedAs: $resourceInventoriedAs,
      toResourceInventoriedAs: $toResourceInventoriedAs,
      currentLocation: $currentLocation,
      resourceConformsTo: $resourceConformsTo
      resourceDescription: $resourceDescription
    }) {
      economicEventId
    }
  }
`;