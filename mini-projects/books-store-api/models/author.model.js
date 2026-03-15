const { integer, pgTable, varchar, uuid, text, timestamp } = require("drizzle-orm/pg-core");

// Author Table
const authorTable = pgTable("authors", {
  id: uuid().primaryKey().defaultRandom(),
  author_name: varchar({ length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


module.exports = authorTable;