import { Router } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import TodoModel from '../../database/models/TodoModel';
import {
  ICreateNewTodoBody,
  IDeleteTodoBody,
  IMarkTodoBody,
  IUpdateTodoBody,
} from '../../interfaces/routes/todos/TodoRequestTypes';

const TodosRouter = Router();

// GET REQUESTS
// /v1/todos/bytodoid
TodosRouter.get('/byid', async (req, res) => {
  const todoId = parseInt(req.query.todoId as string);

  if (!todoId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const todo = await TodoModel.findOne({ where: { id: todoId } });

  res.status(StatusCodes.OK).json({ todo });
});

// Alle Todos von einer UserId

TodosRouter.get('/all', async (req, res) => {
  const todos = await TodoModel.findAll();
  res.status(StatusCodes.OK).send(todos);
});

// PUT REQUESTS
TodosRouter.put('/mark', async (req, res) => {
  try {
    const { todoId, newIsDone } = req.body as IMarkTodoBody;

    if (!todoId) throw Error('keine User Id');

    await TodoModel.update({ isDone: newIsDone }, { where: { id: todoId } });

    res.status(StatusCodes.OK).json({ updatedTodoId: todoId });
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).send(e);
  }
});

TodosRouter.put('/update', async (req, res) => {
  const { todoId, newTask, newIsDone, newDueDate } =
    req.body as IUpdateTodoBody;

  await TodoModel.update(
    {
      task: newTask,
      isDone: newIsDone,
      dueDate: newDueDate,
    },
    { where: { id: todoId } },
  );

  res.status(StatusCodes.OK).json({ updatedTodoId: todoId });
});

// POST REQUESTS
TodosRouter.post('/create', async (req, res) => {
  const { newTask, newIsDone, newDueDate, newUserId } =
    req.body as ICreateNewTodoBody;

  console.log('Here we are', newTask, newIsDone, newDueDate, newUserId);
  if (!newTask || !newDueDate || !newUserId) {
    throw ReferenceError('One of my required Parameters is not defined');
  }

  const newTodo = {
    task: newTask,
    isDone: newIsDone,
    dueDate: new Date(newDueDate),
    userId: newUserId,
  };

  const todo = await TodoModel.create(newTodo);

  res.status(StatusCodes.OK).json({ todo: todo });
});

// DELETE REQUEST
TodosRouter.delete('/delete', async (req, res) => {
  const { todoId } = req.body as IDeleteTodoBody; //req.body.todoId

  await TodoModel.destroy({ where: { id: todoId } });

  res.status(StatusCodes.OK).json({ deletedTodosId: todoId });
});

export default TodosRouter;
