import {IsDefined, IsNotEmpty, IsNumber} from "class-validator";

export class AddProductToCartRequestDto {

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @IsDefined()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}
