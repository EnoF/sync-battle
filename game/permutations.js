const createObjectsFromValues = ([key, values]) =>
  values.map(value => ({ [key]: value }))

const mixObjectValues = valueA => valueB => ({ ...valueA, ...valueB })

const mixAccumulatedAttributeWithNextAttribute = accumulatedAttribute => (
  allMixed,
  mixedAttribute
) => [...allMixed, ...accumulatedAttribute.map(mixObjectValues(mixedAttribute))]

const makeAllPossibleCombinations = (accumulated, nextAttributeValues) =>
  accumulated.reduce(
    mixAccumulatedAttributeWithNextAttribute(nextAttributeValues),
    []
  )

export const getPermutations = params =>
  Object.entries(params)
    .map(createObjectsFromValues)
    .reduce(makeAllPossibleCombinations)
