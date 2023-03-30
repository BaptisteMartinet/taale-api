import type { GraphQLEnumValueConfigMap } from 'graphql';

export default function buildEnumValues(obj: object): GraphQLEnumValueConfigMap {
  return Object.entries(obj).reduce((prev, [key, value]) => {
    prev[key] = { value };
    return prev;
  }, {} as GraphQLEnumValueConfigMap);
}
