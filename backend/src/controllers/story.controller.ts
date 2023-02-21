import { Request, Response } from "express";
import * as responseHelper from "../helpers/response.helper";
import * as storyService from "../services/story.services";

async function getFromUserAndFollowed(req: Request, res: Response) {
  const userId: number = res.locals.userId;

  try {
    const stories = await storyService.getFromUserAndFollowed(userId);
    return responseHelper.OK({ res, body: stories });
  } catch (error: any) {
    return responseHelper.SERVER_ERROR({ res });
  }
}

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

    return responseHelper.SERVER_ERROR({ res, body: { message: "" } });
  }
}

async function getComments(req: Request, res: Response) {
  const storyId = Number(req.params.storyId);
  const userId: number = res.locals.userId;

  try {
    const comments = await storyService.getComments({ userId, storyId });
    return responseHelper.OK({ res, body: comments });
  } catch (error: any) {
    if (error.name === "NotFound") {
      return responseHelper.NOT_FOUND({ res, body: { message: "Essa história não existe!" } });
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

    if (error.name === "Forbidden") {
      return responseHelper.FORBIDDEN({ res, body: { message: "Essa ação é proibida, pois a história está banida!" } });
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
      return responseHelper.BAD_REQUEST({ res, body: { message: "Usuário já curtiu essa história!" } });
    }

    if (error.name === "Forbidden") {
      return responseHelper.FORBIDDEN({ res, body: { message: "Essa ação é proibida, pois a história está banida!" } });
    }

    return responseHelper.SERVER_ERROR({ res });
  }
}

async function postComment(req: Request, res: Response) {
  const storyId = Number(req.params.storyId);
  const userId: number = res.locals.userId;

  try {
    const comment = await storyService.postComment({ userId, storyId, ...req.body });
    return responseHelper.CREATED({ res, body: comment });
  } catch (error: any) {
    if (error.name === "NotFound") {
      return responseHelper.NOT_FOUND({ res, body: { message: "Essa história não existe!" } });
    }

    if (error.name === "Forbidden") {
      return responseHelper.FORBIDDEN({ res, body: { message: "Essa ação é proibida, pois a história está banida!" } });
    }

    return responseHelper.SERVER_ERROR({ res });
  }
}

async function postDenounce(req: Request, res: Response) {
  const storyId = Number(req.params.storyId);
  const userId: number = res.locals.userId;

  try {
    await storyService.postDenounce({ userId, storyId, ...req.body });
    return responseHelper.NO_CONTENT({ res });
  } catch (error: any) {
    if (error.name === "NotFound") {
      return responseHelper.NOT_FOUND({ res, body: { message: "Essa história não existe!" } });
    }

    if (error.name === "BadRequest") {
      return responseHelper.BAD_REQUEST({ res, body: { message: "Denúncias só são pertimidas uma vez!" } });
    }

    if (error.name === "Forbidden") {
      return responseHelper.FORBIDDEN({ res, body: { message: "Essa ação é proibida, pois a história está banida!" } });
    }

    return responseHelper.SERVER_ERROR({ res });
  }
}

async function deleteStory(req: Request, res: Response) {
  const storyId = Number(req.params.storyId);
  const userId: number = res.locals.userId;

  try {
    await storyService.deleteStory({ userId, id: storyId });
    return responseHelper.NO_CONTENT({ res });
  } catch (error: any) {
    if (error.name === "NotFound") {
      return responseHelper.NOT_FOUND({ res, body: { message: "Essa história não existe!" } });
    }
    if (error.name === "Unauthorized") {
      return responseHelper.UNAUTHORIZED({ res });
    }

    if (error.name === "Forbidden") {
      return responseHelper.FORBIDDEN({ res, body: { message: "Essa ação é proibida, pois a história está banida!" } });
    }

    return responseHelper.SERVER_ERROR({ res });
  }
}

async function putStory(req: Request, res: Response) {
  const storyId = Number(req.params.storyId);
  const userId: number = res.locals.userId;

  try {
    await storyService.putStory({ userId, storyId, ...req.body });
    return responseHelper.NO_CONTENT({ res });
  } catch (error: any) {
    if (error.name === "NotFound") {
      return responseHelper.NOT_FOUND({ res, body: { message: "Essa história não existe!" } });
    }
    if (error.name === "Unauthorized") {
      return responseHelper.UNAUTHORIZED({ res });
    }

    if (error.name === "Forbidden") {
      return responseHelper.FORBIDDEN({ res, body: { message: "Essa ação é proibida, pois a história está banida!" } });
    }

    return responseHelper.SERVER_ERROR({ res });
  }
}

export {
  getFromUserAndFollowed,
  getAllOfChannel,
  getComments,
  postStory,
  postLikeStory,
  postUnlikeStory,
  postComment,
  postDenounce,
  deleteStory,
  putStory,
};
