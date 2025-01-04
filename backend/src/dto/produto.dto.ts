import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class ProdutoDto {
  @IsNotEmpty({ message: 'O nome do produto é obrigatório.' })
  nome: string;

  @IsNumber({}, { message: 'O preço deve ser um número.' })
  @IsPositive({ message: 'O preço deve ser positivo.' })
  preco: number;

  @IsNumber({}, { message: 'A quantidade deve ser um número.' })
  @IsPositive({ message: 'A quantidade deve ser positiva.' })
  quantidade: number;
}
