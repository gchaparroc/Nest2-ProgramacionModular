import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from './../entities/cutomer.entity';
import { CreateCustomerDto, UpdateCustomerDto} from './../dtos/customers.dtos';

@Injectable()
export class CustomersService {

    private counterId = 1;

    private customers: Customer[] = [
        {
            id: 1,
            name: 'Customer 1',
            lastname: 'decripcion del customer 1',
            phone: '93124567',
        },
    ];

        findAll(){
            return this.customers;
        }
    
        findOne(id: number){
            const customer = this.customers.find((item) => item.id === id);
            if(!customer){
                //throw 'Producto no existe';
                throw new NotFoundException(`El Customer o cliente #${id} no existe`);
            }
            return customer;
        }
    
        create(payload: CreateCustomerDto){
            this.counterId = this.counterId + 1;
            const newCustomer = {
                id: this.counterId,
                ...payload,
            };
            this.customers.push(newCustomer);
            return newCustomer;
        }
    
        update(id: number, payload: UpdateCustomerDto) {
            //reutilizamos el metodo findOne para buscar el producto y guardarlo en la variable
            const customer = this.findOne(id);
            if(customer){
                //buscamos la posicion del elemento en el array en memoria
                const index = this.customers.findIndex((item) => item.id === id);
                
                //una vez ya tenemos la posicion del elemento en la variable "index" pasamos a actualizarlo
                this.customers[index] = {
                    ...customer,
                    ...payload,
                };
                //ahora simplemente retornamos la posicion ya actualizada
                return this.customers[index];
            }else{
                return null;
            }
        }
        
        remove(id: number) {
            const index = this.customers.findIndex((item) => item.id === id);
            if (index === -1) {
               return `El cliente o customer #${id} no existe`;
           //throw new NotFoundException(`El Producto #${id} no existe`);
            } 
            this.customers.splice(index, 1);
            return true;
        }
}
