import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getTodos(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Post()
  async createTodo(@Body() data: { text: string }): Promise<Todo> {
    const resTodo = await this.todosService.create(data.text);
    return resTodo;
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id): Promise<void> {
    await this.todosService.remove(id);
  }

  @Put('/check/:id')
  async checkTodo(@Param('id') id): Promise<Todo> {
    const resTodo = await this.todosService.check(id);
    return resTodo;
  }

  @Put('/sort')
  async changeSortNo(@Body() { dragId, hoverId }): Promise<void> {
    console.log(dragId, hoverId);
    await this.todosService.changeSortNo(dragId, hoverId);
  }
}
