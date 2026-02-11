import { db } from "..";
import { UsersTable, EventsTable, KYCTable } from "../schema";
import { eq, type InferInsertModel } from "drizzle-orm";
import { faker } from "@faker-js/faker";
import { encryptPassword } from "@/utils/password";
import { generate_SBS_Id } from "@/utils/id";

(async () => {
  await db.delete(UsersTable);
  await db.delete(EventsTable);

  type UserInsert = InferInsertModel<typeof UsersTable>;
  type EventsInsert = InferInsertModel<typeof EventsTable>;
  type KYCTableInsert = InferInsertModel<typeof KYCTable>;

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
        password: "12121212",
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
        password: "12121212",
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

  const eventsDetails = Array.from({ length: 5 }).map<EventsInsert>(() => {
    lastId = generate_SBS_Id(lastId);
    const scheduledDate =
      Math.random() > 0.5
        ? faker.date.soon({
            days: 50,
            refDate: new Date(Date.now()).toISOString(),
          })
        : faker.date.past({
            years: 2,
            refDate: new Date(Date.now()).toISOString(),
          });
    return {
      id: lastId,
      scheduledFor: scheduledDate,
    };
  });

  const kycDetails = Array.from({ length: 5 }).map<KYCTableInsert>(() => {
    return {
      aadhar: faker.word.noun(12),
      bankAccountNo: faker.word.noun(11),
      IFSC: faker.word.noun(5),
      PAN: faker.word.noun(10),
      branchName: faker.company.name(),
      bankName: faker.company.name(),
      accountHolder: faker.company.name(),
      detailsOf:
        usersDetails[Math.floor(Math.random() * usersDetails.length)].id,
    };
  });

  console.log(`______SEEDING-STARTED______`);

  await pushData();

  console.log(`______SEEDING-COMPLETED______`);
  async function pushData() {
    await pushUserDetails();
    await pushEventsDetails();
    await pushKycDetails();
  }

  async function pushUserDetails() {
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
  }

  async function pushEventsDetails() {
    await db.insert(EventsTable).values(eventsDetails);
  }

  async function pushKycDetails() {
    await db.insert(KYCTable).values(kycDetails);
  }

  process.exit();
})();
