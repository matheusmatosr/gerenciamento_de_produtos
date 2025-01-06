import { Module } from '@nestjs/common';
import { ProdutosModule } from './models/produtos.module';

@Module({
  imports: [ProdutosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
