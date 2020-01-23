'use strict'

//Bring a model

const Todo = use('App/Models/Todo')

class TodoController {

  async index({request,response,view,params}) {
    const todos = await Todo.all();
    const statsActive = await Todo
      .query()
      .where('completed', false)
      .count('* as total');

    return view.render('index', {
      name: 'name',
      todos: todos.toJSON(),
      stats: {
        active: statsActive[0].total,
      }
    })
  }

  async add({ view }) {
    return view.render('index')
  }

  async store({ request, response, session }) {

    const todo = new Todo();

    todo.name = request.input('name')

    await todo.save()

    return response.redirect('/')
  }

  async edit({ params, view }) {
    const todo = await Todo.find(params.id)

    return view.render('index',{
      todo: todo
    })
  }

  async update({params, request, response}) {

    const todo = await Todo.find(params.id)

    todo.name = request.input('name')
    todo.completed = request.input('completed') === 'on';

    await todo.save()

    return response.redirect('/')
  }

  async destroy({params, response}) {
    const todo = await Todo.find(params.id)
    await todo.delete()
    return response.redirect('/')
  }
}

module.exports = TodoController
