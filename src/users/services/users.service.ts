import { Injectable, NotFoundException  } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto} from './../dtos/users.dtos';
import { ProductsService } from './../../products/services/products.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UsersService {

    constructor(
        private productsService: ProductsService,
        private configService: ConfigService,
    ) {}

    private counterId = 1;

    private users: User[] = [
        {
            id: 1,
            email: "usuario1@gmail.com",
            password: "pass123",
            role: "adinistrador"
        },
    ];

    findAll(){
        const apiKey = this.configService.get('API_KEY');
        const dbName = this.configService.get('DATABASE_NAME');
        console.log(apiKey, dbName);
        return this.users;
    }

    findOne(id: number){
        const user = this.users.find((item) => item.id === id);
        if(!user){
            throw new NotFoundException(`El Usuario #${id} no existe`);
        }
        return user;
    }

    create(payload: CreateUserDto){
        this.counterId = this.counterId + 1;
        const newUser = {
            id: this.counterId,
            ...payload,
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, payload: UpdateUserDto) {
        //reutilizamos el metodo findOne para buscar el producto y guardarlo en la variable
        const user = this.findOne(id);
        if(user){
            //buscamos la posicion del elemento en el array en memoria
            const index = this.users.findIndex((item) => item.id === id);
            
            //una vez ya tenemos la posicion del elemento en la variable "index" pasamos a actualizarlo
            this.users[index] = {
                ...user,
                ...payload,
            };
            //ahora simplemente retornamos la posicion ya actualizada
            return this.users[index];
        }else{
            return null;
        }
    }
           
    remove(id: number) {
        const index = this.users.findIndex((item) => item.id === id);
        if (index === -1) {
            //throw new NotFoundException(`El User #${id} no existe`);
            return `El Usuario #${id} no existe`;
        } 
        this.users.splice(index, 1);
        return true;
    }

    getOrdersByUser(id: number): Order {
        const user = this.findOne(id);
        return {
            date: new Date(),
            user,
            products: this.productsService.findAll(),
        };
    }
}
