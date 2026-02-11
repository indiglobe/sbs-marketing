import { env } from "@/lib/env";
import mysql, { RowDataPacket } from "mysql2";

const url = new URL(env.DATABASE_URL);

const con = mysql.createConnection({
  host: url.hostname,
  user: url.username,
  password: url.password,
  port: Number(url.port),
});

con.connect(function (err) {
  if (err) {
    console.error(err);
    throw err;
  }
  console.log("Connected to MySQL Server!");

  const databaseName = url.pathname.split("/")[1];

  con.query(
    "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?",
    [databaseName],
    function (err, results: any) {
      if (err) throw err;

      if ((results as RowDataPacket[]).length > 0) {
        console.log(`Database "${databaseName}" exists.`);
      } else {
        const createDbSql = `CREATE DATABASE IF NOT EXISTS \`${databaseName}\``;
        con.query(createDbSql, function (err) {
          if (err) throw err;
          console.log(`Database '${databaseName}' created.`);
          con.end();
        });
      }
      con.end();
    },
  );
});
