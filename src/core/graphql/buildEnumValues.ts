import type { GraphQLEnumValueConfigMap } from 'graphql';

function buildEnumValues(obj: object): GraphQLEnumValueConfigMap {
  return Object.entries(obj).reduce((prev, [key, value]) => {
    prev[key] = { value };
    return prev;
  }, {} as GraphQLEnumValueConfigMap);
}

export default buildEnumValues;
