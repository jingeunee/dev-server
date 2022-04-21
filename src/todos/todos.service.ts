import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todosRepository.find({
      order: {
        sortNo: 'DESC',
      },
    });
  }

  findOne(id: string): Promise<Todo> {
    return this.todosRepository.findOne(id);
  }

  async create(text: string): Promise<Todo> {
    const newTodo = this.todosRepository.create();
    newTodo.text = text;
    const resTodo = await this.todosRepository.save(newTodo);
    return resTodo;
  }

  async check(id: number): Promise<Todo> {
    const findObj = await this.todosRepository.findOne(id);
    if (!findObj) {
      throw new NotFoundException();
    }
    findObj.isChecked = findObj.isChecked === 'T' ? 'F' : 'T';
    await this.todosRepository.update(id, {
      isChecked: findObj.isChecked,
    });
    return findObj;
  }

  async remove(id: number): Promise<void> {
    await this.todosRepository.delete(id);
  }

  async changeSortNo(dragId: number, hoverId: number) {
    if (dragId === hoverId) {
      throw new BadRequestException();
    }

    let begin = dragId;
    let end = hoverId;
    if (dragId > hoverId) {
      begin = hoverId;
      end = dragId;
    }

    const res = await this.todosRepository
      .createQueryBuilder('todo')
      .andWhere('"todo"."id" BETWEEN :begin AND :end', {
        begin,
        end,
      })
      .orderBy('"todo"."sort_no"', 'DESC')
      .getMany();

    let temp;
    if (dragId > hoverId) {
      res.forEach((obj, inx, list) => {
        if (inx + 1 >= list.length) {
          return;
        }
        temp = list[inx].sortNo;
        list[inx].sortNo = list[inx + 1].sortNo;
        list[inx + 1].sortNo = temp;
      });
    } else {
      res.forEach((obj, inx, list) => {
        if (inx - 1 < 0) {
          return;
        }
        temp = list[list.length - inx - 1].sortNo;
        list[list.length - inx - 1].sortNo = list[list.length - inx].sortNo;
        list[list.length - inx].sortNo = temp;
      });
    }

    getManager().transaction(async (manager) => {
      res.forEach((o) => {
        manager.update(Todo, o.id, { sortNo: o.sortNo });
      });
    });
  }
}
