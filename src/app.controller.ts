import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Controller('todos')
export class TodosController {
  private todos: Todo[] = [];  // Inicializa o array de tarefas
  private currentId = 1;

  // Outros métodos, como POST, GET, etc., aqui...

  @Put('checkAll')
  checkAll() {
    // Verifique o estado atual da lista de tarefas
    console.log('Antes da atualização:', this.todos);

    // Atualiza todas as tarefas para 'completed' = true
    this.todos.forEach(todo => {
      todo.completed = true;
    });

    // Verifique o estado após a atualização
    console.log('Depois da atualização:', this.todos);

    // Retorna uma resposta com a mensagem e a lista de tarefas atualizada
    return {
      message: 'Todas as tarefas foram marcadas como concluídas',
      todos: this.todos,  // Retorna a lista com as tarefas atualizadas
    };
  }

  // Método para adicionar uma tarefa para fins de teste
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

  // Método para retornar todas as tarefas
  @Get()
  findAll() {
    return this.todos;
  }

  //Método busca por id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todos.find(todo => todo.id === Number(id));
  }

  //Método editar 
  @Put(':id')
  update(@Param('id') id: string, @Body() todoData: { completed: boolean }) {
    const todo = this.todos.find(todo => todo.id === Number(id));
    if (todo) {
      todo.completed = todoData.completed;
    }
    return todo;
  }

  //Método buscar por incompletas 
  @Get('completed/:completed')
  findConcluidas(@Param('completed') completed: string) {
    const isCompleted = completed === 'true';

    return this.todos.filter(todo => todo.completed === isCompleted);
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
