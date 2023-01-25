import { Request, Response } from "express";
import * as responseHelper from "../helpers/response.helper";
import * as storyService from "../services/story.services";

async function getAllOfChannel(req: Request, res: Response) {
  const channelId = Number(req.params.channelId);
  const userId: number = res.locals.userId;

  try {
    const stories = await storyService.getAllOfChannel({ channelId, userId });
    return responseHelper.OK({ res, body: stories });
  } catch (error: any) {
    if (error.name === "NotFound") {
      return responseHelper.NOT_FOUND({ res, body: { message: "Esse canal não existe!" } });
    }

    return responseHelper.SERVER_ERROR({ res });
  }
}

async function getAfterId(req: Request, res: Response) {
  const channelId = Number(req.params.channelId);
  const storyId = Number(req.params.storyId);
  const userId: number = res.locals.userId;

  try {
    const stories = await storyService.getAfterId({ channelId, userId, storyId });
    return responseHelper.OK({ res, body: stories });
  } catch (error: any) {
    if (error.name === "NotFound") {
      return responseHelper.NOT_FOUND({ res, body: { message: "Esse canal não existe!" } });
    }

    return responseHelper.SERVER_ERROR({ res });
  }
}

async function postStory(req: Request, res: Response) {
  const userId: number = res.locals.userId;

  try {
    const createdStory = await storyService.postStory({ ...req.body, userId });
    return responseHelper.CREATED({ res, body: createdStory });
  } catch (error: any) {
    if (error.name === "NotFound") {
      return responseHelper.NOT_FOUND({ res, body: { message: "Esse canal não existe!" } });
    }

    return responseHelper.SERVER_ERROR({ res });
  }
}

async function postLikeStory(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const storyId = Number(req.params.storyId);

  try {
    await storyService.postLikeStory(storyId, userId);
    return responseHelper.OK({ res });
  } catch (error: any) {
    if (error.name === "NotFound") {
      return responseHelper.NOT_FOUND({ res, body: { message: "Essa história não existe!" } });
    }

    if (error.name === "BadRequest") {
      return responseHelper.BAD_REQUEST({ res, body: { message: "Usuário já curtiu ssa história!" } });
    }

    return responseHelper.SERVER_ERROR({ res });
  }
}

async function postUnlikeStory(req: Request, res: Response) {
  const userId: number = res.locals.userId;
  const storyId = Number(req.params.storyId);

  try {
    await storyService.postUnlikeStory(storyId, userId);
    return responseHelper.OK({ res });
  } catch (error: any) {
    if (error.name === "NotFound") {
      return responseHelper.NOT_FOUND({ res, body: { message: "Essa história não existe!" } });
    }

    if (error.name === "BadRequest") {
      return responseHelper.BAD_REQUEST({ res, body: { message: "Usuário já curtiu ssa história!" } });
    }

    return responseHelper.SERVER_ERROR({ res });
  }
}

export { getAllOfChannel, postStory, getAfterId, postLikeStory, postUnlikeStory };
