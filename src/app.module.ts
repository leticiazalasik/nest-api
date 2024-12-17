import { Module } from '@nestjs/common';
import { TodosController } from './app.controller'; 
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [TodosController],
  providers: [AppService],
})
export class AppModule {}
