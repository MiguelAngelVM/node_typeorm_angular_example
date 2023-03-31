import { object, string, TypeOf, z } from 'zod';

export const colorSchema = object({
  query: object({
    name: string({
      required_error: 'name is required',
    })
  }),
});


export type colorQuery = TypeOf<typeof colorSchema>['query'];
