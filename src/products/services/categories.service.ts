import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './../dtos/categories.dtos';

@Injectable()
export class CategoriesService {
    
    private counterId = 1;

    private categories: Category[] = [
        {
            id: 1,
            name: 'Category 1',
            description: 'decripcion de la categoria 1',
            codigo: 100,
        },
    ];

    findAll(){
        return this.categories;
    }

    findOne(id: number){
        const category = this.categories.find((item) => item.id === id);
        if(!category){
            throw new NotFoundException(`La categoria #${id} no existe`);
        }
        return category;
    }

    create(payload: CreateCategoryDto){
        console.log(payload);
        this.counterId = this.counterId + 1;
        const newCategory = {
            id: this.counterId,
            ...payload,
        };
        this.categories.push(newCategory);
        return newCategory;
    }

    update(id: number, payload: UpdateCategoryDto) {
        const category = this.findOne(id);
        if(category){
            const index = this.categories.findIndex((item) => item.id === id);
            
            this.categories[index] = {
                ...category,
                ...payload,
            };
            return this.categories[index];
        }else{
            return null;
        }
    }
    
    delete(id: number) {
            const index = this.categories.findIndex((item) => item.id === id);
            console.log(index);
            if (index === -1) {
              throw new NotFoundException(`La categoria #${id} no existe`);
              //return 'Id no existe';
            } 
            this.categories.splice(index, 1);
            return true;
    }
}
