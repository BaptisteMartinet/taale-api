import { GraphQLEnumType } from 'graphql';
import { buildEnumValues } from 'lib/graphql';

export enum Role {
  Default = 'Default',
  Admin = 'Admin',
}

export const RoleEnum = new GraphQLEnumType({
  name: 'Role',
  values: buildEnumValues(Role),
});

export enum Locale {
  FR = 'fr',
  EN = 'en',
  ES = 'es',
  DE = 'de',
  PT = 'pt',
  IT = 'it',
}

export const LocaleEnum = new GraphQLEnumType({
  name: 'Locale',
  values: buildEnumValues(Locale),
});
