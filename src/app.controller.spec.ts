import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Controller('todos')
export class TodosController {
  private todos: Todo[] = [];
  private currentId = 1;

  @Post()
  create(@Body() todoData: { title: string }) {
    const todo: Todo = {
      id: this.currentId++,
      title: todoData.title,
      completed: false
    };
    this.todos.push(todo);
    return todo;
  }

  @Get()
  findAll() {
    return this.todos;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todos.find(todo => todo.id === Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() todoData: { completed: boolean }) {
    const todo = this.todos.find(todo => todo.id === Number(id));
    if (todo) {
      todo.completed = todoData.completed;
    }
    return todo;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const index = this.todos.findIndex(todo => todo.id === Number(id));
    if (index >= 0) {
      this.todos.splice(index, 1);
    }
    return { success: true };
  }
}