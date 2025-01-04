import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProdutoDto } from '../dto/produto.dto';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  async create(data: ProdutoDto) {
    return this.prisma.produto.create({ data });
  }

  async findAll() {
    return this.prisma.produto.findMany();
  }

  async findOne(id: number) {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return produto;
  }

  async update(id: number, data: ProdutoDto) {
    await this.findOne(id);
    return this.prisma.produto.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.produto.delete({ where: { id } });
  }
}
