import { object, string, TypeOf, z } from 'zod';

export const brandSchema = object({
  query: object({
    name: string({
      required_error: 'name is required',
    })
  }),
});


export type brandQuery = TypeOf<typeof brandSchema>['query'];
