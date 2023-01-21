import { faker } from "@faker-js/faker";
import { Users } from "@prisma/client";
import { prisma } from "database";

function createCustomUser(data: CreateCustomUserParams) {
  return prisma.users.create({
    data: {
      username: faker.name.firstName(),
      avatar: faker.image.avatar(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      about: faker.lorem.words(),
      status: "active",
      ...data,
    },
  });
}

type CreateCustomUserParams = Partial<Omit<Users, "id">> & {
  rankId: number;
};

export { createCustomUser };
