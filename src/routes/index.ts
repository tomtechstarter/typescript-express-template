import { Router } from "express";
import TodosRouter from "./todos";
import UserRouter from "./users";

const AppRouter = Router();

AppRouter.use("/todos", TodosRouter);
AppRouter.use("/users", UserRouter);

export default AppRouter;
