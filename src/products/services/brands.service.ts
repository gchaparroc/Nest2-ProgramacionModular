import { Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from './../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from './../dtos/brands.dtos';

@Injectable()
export class BrandsService {

    private counterId = 1;

    private brands: Brand[] = [
        {
            id: 1,
            name: 'brand 1',
            image: 'image 1',
        },
    ];

        /*Metodo para retornar todos los productos*/ 
        findAll(){
            return this.brands;
        }
    
        /*Metodo para retornar un producto por id*/
        findOne(id: number){
            const brand = this.brands.find((item) => item.id === id);
            if(!brand){
                //throw 'Producto no existe';
                throw new NotFoundException(`La marca o brand #${id} no existe`);
            }
            return brand;
        }
    
        /*Metodo para crear nuevos productos*/
        create(payload: CreateBrandDto){
            this.counterId = this.counterId + 1;
            const newBrand = {
                id: this.counterId,
                ...payload,
            };
            this.brands.push(newBrand);
            return newBrand;
        }
    
        /*Metodo para actualizar */
        update(id: number, payload: UpdateBrandDto) {
            //reutilizamos el metodo findOne para buscar el producto y guardarlo en la variable
            const brand = this.findOne(id);
            if(brand){
                //buscamos la posicion del elemento en el array en memoria
                const index = this.brands.findIndex((item) => item.id === id);
                
                //una vez ya tenemos la posicion del elemento en la variable "index" pasamos a actualizarlo
                this.brands[index] = {
                    ...brand,
                    ...payload,
                };
                //ahora simplemente retornamos la posicion ya actualizada
                return this.brands[index];
            }else{
                return null;
            }
        }
        
        /*Metodo para eliminar*/
        remove(id: number) {
            const index = this.brands.findIndex((item) => item.id === id);
            if (index === -1) {
               //return `La brand o marca #${id} no existe`;
               throw new NotFoundException(`La marca o brand #${id} no existe`);
            } 
            this.brands.splice(index, 1);
            return true;
        }
}
