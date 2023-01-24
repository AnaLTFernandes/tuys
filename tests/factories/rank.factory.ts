import { faker } from "@faker-js/faker";
import { prisma } from "../../src/database";

function createRank() {
  return prisma.ranks.create({
    data: {
      name: faker.internet.userName(),
      color: faker.internet.color(),
    },
  });
}

export { createRank };
