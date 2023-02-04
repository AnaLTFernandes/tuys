import { Request, Response } from "express";
import * as responseHelper from "../helpers/response.helper";
import * as signService from "../services/sign.services";

async function postSignUp(req: Request, res: Response) {
  try {
    await signService.postSignUp(req.body);
    return responseHelper.CREATED({ res });
  } catch (error: any) {
    if (error.name === "Conflict") {
      return responseHelper.CONFLICT({ res, body: { message: "Já existe um usuário com esse Nome/Email!" } });
    }

    if (error.name === "SignUp") {
      return responseHelper.BAD_GATEWAY({ res, body: { message: "Erro ao realizar cadastro." } });
    }

    return responseHelper.SERVER_ERROR({ res });
  }
}

async function postSignIn(req: Request, res: Response) {
  try {
    const user = await signService.postSignIn(req.body);
    return responseHelper.OK({ res, body: user });
  } catch (error: any) {
    if (error.name === "NotFound") {
      return responseHelper.NOT_FOUND({ res, body: { message: "Email/Senha inválidos!" } });
    }

    if (error.name === "BadRequest") {
      return responseHelper.BAD_REQUEST({ res, body: { message: "Usuário já está logado!" } });
    }

    return responseHelper.SERVER_ERROR({ res });
  }
}

async function postSignWithGoogle(req: Request, res: Response) {
  try {
    const user = await signService.postSignWithGoogle(req.body);
    return responseHelper.CREATED({ res, body: user });
  } catch (error: any) {
    if (error.name === "BadRequest") {
      return responseHelper.BAD_REQUEST({ res, body: { message: "Usuário já está logado!" } });
    }

    if (error.name === "Conflict") {
      return responseHelper.CONFLICT({ res, body: { message: "Já existe outro usuário com esse email!" } });
    }

    return responseHelper.SERVER_ERROR({ res });
  }
}

async function postSignOut(req: Request, res: Response) {
  const userId: number = res.locals.userId;

  try {
    await signService.postSignOut(userId);
    return responseHelper.NO_CONTENT({ res });
  } catch (error: any) {
    if (error.name === "NotFound") {
      return responseHelper.NOT_FOUND({ res, body: { message: "Usuário não possui sessão!" } });
    }

    return responseHelper.SERVER_ERROR({ res });
  }
}

export { postSignUp, postSignIn, postSignWithGoogle, postSignOut };
