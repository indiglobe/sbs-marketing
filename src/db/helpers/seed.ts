import { db } from "..";
import { UsersTable } from "../schema";
import { eq, type InferInsertModel } from "drizzle-orm";
import { faker } from "@faker-js/faker";
import { encryptPassword } from "@/utils/password";
import { generate_SBS_Id } from "@/utils/id";

(async () => {
  await db.delete(UsersTable);

  type UserInsert = InferInsertModel<typeof UsersTable>;

  let lastId = "SBS00000";

  const usersDetails = (
    [
      {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        role: "super-admin",
        id: `SBS00000`,
        city: faker.location.city(),
        email: faker.internet.email(),
        mobile: Math.floor(Math.random() * 10000000000).toString(),
        password: "123456789",
      },
    ] as UserInsert[]
  ).concat(
    Array.from({ length: 10 }).map<UserInsert>(() => {
      lastId = generate_SBS_Id(lastId);
      return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        id: lastId,
        city: faker.location.city(),
        email: faker.internet.email(),
        mobile: Math.floor(Math.random() * 10000000000).toString(),
        password: faker.internet.password({ length: 10 }),
      };
    }),
  );

  const usersWithHashedPasswords = await Promise.all(
    usersDetails.map<Promise<UserInsert>>(async (user) => {
      return {
        ...user,
        password: await encryptPassword(user.password),
        avatarURL: Math.random() > 0.5 ? faker.image.avatar() : null,
      };
    }),
  );

  console.log(`______SEEDING-STARTED______`);
  // insert users
  await db.insert(UsersTable).values(usersWithHashedPasswords);

  for (const user of usersWithHashedPasswords) {
    if (user.role === "super-admin") {
      continue;
    }

    await db
      .update(UsersTable)
      .set({
        referredBy:
          usersWithHashedPasswords[
            Math.floor(Math.random() * usersWithHashedPasswords.length)
          ].id,
      })
      .where(eq(UsersTable.id, user.id));
  }

  console.log(`______SEEDING-COMPLETED______`);

  process.exit();
})();
