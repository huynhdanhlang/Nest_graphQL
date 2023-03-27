import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class House {
  @Field(() => String, { description: 'Example field (placeholder)' })
  exampleField: string;
}
