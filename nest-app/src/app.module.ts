import { Module } from '@nestjs/common';

import { PersistenceModule } from '@/infrasturcture/persistence/persistence.module';
import { HttpModule } from './infrasturcture/controllers/http.module';

@Module({
  imports: [
    PersistenceModule.register({
      global: true,
    }),
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
