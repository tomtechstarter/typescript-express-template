import { Router } from "express";
import TodosRouter from "./todos";

const AppRouter = Router();

AppRouter.use("/todos", TodosRouter);

export default AppRouter;
