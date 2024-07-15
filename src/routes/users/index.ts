import { Router } from "express";
import UserModel from "../../database/models/UserModel";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const UserRouter = Router();

// GET REQUESTS
UserRouter.get("/currentuser", async (req, res) => {
  const userId = parseInt(req.query.userId as string);

  const user = await UserModel.findOne({ where: { id: userId } });

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    return;
  }

  res.status(StatusCodes.OK).json({ user });
});

export default UserRouter;
