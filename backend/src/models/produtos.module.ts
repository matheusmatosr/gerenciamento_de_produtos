import { Module } from '@nestjs/common';
import { ProdutosService } from '../services/produtos.service';
import { ProdutosController } from '../controllers/produtos.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosService, PrismaService],
})
export class ProdutosModule {}
