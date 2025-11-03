import { migrate } from "drizzle-orm/neon-http/migrator";
import db from ".";

async function runMigrations() {
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Migrations complete!");
  process.exit(0);
}

runMigrations().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
