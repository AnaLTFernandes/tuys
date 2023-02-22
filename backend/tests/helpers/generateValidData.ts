import { faker } from "@faker-js/faker";
import { Users, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createSession, createCustomUser, createCustomUserWithRank } from "../factories";

async function generateValidUser() {
  const password = faker.word.noun();
  const hashedPassword = await bcrypt.hash(password, 13);
  const {
    Users: [user],
  } = await createCustomUser({
    password: hashedPassword,
  });

  return { ...user, password };
}

async function generateValidUserWithRank(rankId: number) {
  const password = faker.word.noun();
  const hashedPassword = await bcrypt.hash(password, 13);
  const user = await createCustomUserWithRank(rankId, { password: hashedPassword });

  return { ...user, password };
}

async function generateValidBannedUser() {
  const password = faker.word.noun();
  const hashedPassword = await bcrypt.hash(password, 13);
  const {
    Users: [user],
  } = await createCustomUser({
    password: hashedPassword,
    status: UserStatus.BANNED,
  });

  return { ...user, password };
}

async function generateValidToken(user?: Users) {
  const { id } = user || (await generateValidUser());
  const token = jwt.sign({ user: id }, process.env.JWT_SECRET || "");
  const authorization = `Bearer ${token}`;

  const session = await createSession({ userId: id, token });

  return { authorization, session };
}

export { generateValidUser, generateValidUserWithRank, generateValidBannedUser, generateValidToken };
