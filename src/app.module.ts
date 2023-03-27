import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './payment/payment.module';
import { HouseModule } from './house/house.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';
import { HasuraModule } from '@golevelup/nestjs-hasura';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PaymentModule,
    HouseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // schema.gql will automatically be created
      playground: true,
    }),
    HasuraModule.forRoot(HasuraModule, {
      webhookConfig: {
        /**
         * The value of the secret Header. The Hasura module will ensure that incoming webhook payloads contain this
         * value in order to validate that it is a trusted request
         */
        secretFactory: 'NESTJS_EVENT_WEBHOOK_SHARED_SECRET',
        /** The name of the Header that Hasura will send along with all event payloads */
        secretHeader: 'nestjs-event-webhook',
      },
      managedMetaDataConfig: {
        metadataVersion: 'v3',
        dirPath: join(process.cwd(), 'hasura/metadata'),
        secretHeaderEnvName: 'NESTJS_EVENT_WEBHOOK_SHARED_SECRET',
        nestEndpointEnvName: 'NESTJS_EVENT_WEBHOOK_ENDPOINT',
        defaultEventRetryConfig: {
          intervalInSeconds: 15,
          numRetries: 3,
          timeoutInSeconds: 100,
          toleranceSeconds: 21600,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
