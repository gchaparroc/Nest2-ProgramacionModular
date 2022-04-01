import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

@Injectable()
export class ProductsService {

    /*Creamos una variable contador para simular el autoincrementable de la bse de datos para usar en el metodo 
    de crear un producto*/
    private counterId = 1;

    /*Por ahora crearemos un array con datos que estara cargado en memoria, una buena practica va a ser que le 
    pongamos un tipado a nuestro array de productos y para eso tenemos que crear una entidad. Para eso dentro del
    directorio "src" creamos otro directorio llamado "entities" y alli crearemos el archivo "product.entity.ts"*/ 
    private products: Product[] = [
        {
            id: 1,
            name: 'Product 1',
            description: 'decripcion del producto 1',
            price: 1000,
            stock: 1,
            image: '',
        },
    ];

    /*Metodo para retornar todos los productos*/ 
    findAll(){
        return this.products;
    }

    /*Metodo para retornar un producto por id*/
    findOne(id: number){
        const product = this.products.find((item) => item.id === id);
        if(!product){
            //throw 'Producto no existe';
            throw new NotFoundException(`El Producto #${id} no existe`);
        }
        return product;
    }

    /*Metodo para crear nuevos productos*/
    create(payload: CreateProductDto){
        console.log(payload);
        this.counterId = this.counterId + 1;
        const newProduct = {
            id: this.counterId,
            ...payload,
        };
        this.products.push(newProduct);
        return newProduct;
    }


    /*Metodo para actualizar */
    update(id: number, payload: UpdateProductDto) {
        //reutilizamos el metodo findOne para buscar el producto y guardarlo en la variable
        const product = this.findOne(id);
        if(product){
            //buscamos la posicion del elemento en el array en memoria
            const index = this.products.findIndex((item) => item.id === id);
            
            //una vez ya tenemos la posicion del elemento en la variable "index" pasamos a actualizarlo
            this.products[index] = {
                ...product,
                ...payload,
            };
            //ahora simplemente retornamos la posicion ya actualizada
            return this.products[index];
        }else{
            return null;
        }

    }
    
    /*Metodo para eliminar*/
    remove(id: number) {
        const index = this.products.findIndex((item) => item.id === id);
        if (index === -1) {
          throw new NotFoundException(`El Producto #${id} no existe`);
        } 
        this.products.splice(index, 1);
        return true;
    }
}
