import { db } from "..";
import { users } from "../schema";
import type { InferInsertModel } from "drizzle-orm";
import { faker } from "@faker-js/faker";
import { encryptPassword } from "@/utils/password";

(async () => {
  await db.delete(users);

  type SelectedUserInsert = Omit<InferInsertModel<typeof users>, "password">;
  type UserInsert = InferInsertModel<typeof users>;
  const usersDetails = (
    [
      {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        role: "super-admin",
        plainPassword: "1234567890",
      },
    ] as SelectedUserInsert[]
  ).concat(
    Array.from({ length: 10 }).map<SelectedUserInsert>(() => {
      return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        plainPassword: faker.internet.password({ length: 8 }),
      };
    }),
  );

  const usersWithHashedPasswords = await Promise.all(
    usersDetails.map(async (user) => ({
      ...user,
      password: await encryptPassword(user.plainPassword),
    })),
  );

  console.log(`______SEEDING-STARTED______`);

  await db.insert(users).values(usersWithHashedPasswords);

  console.log(`______SEEDING-COMPLETED______`);

  process.exit();
})();
