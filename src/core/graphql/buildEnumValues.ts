import type { GraphQLEnumValueConfigMap } from 'graphql';

function buildEnumValues(obj: object): GraphQLEnumValueConfigMap {
  return Object.values(obj).reduce((prev, value) => {
    prev[value] = { value };
    return prev;
  }, {});
}

export default buildEnumValues;
