import { GraphQLEnumType } from 'graphql';
import buildEnumValues from 'core/graphql/buildEnumValues';

export enum Role {
  Default = 'Default',
  Admin = 'Admin',
}

export const RoleEnum = new GraphQLEnumType({
  name: 'Role',
  values: buildEnumValues(Role),
});
