/*
  Warnings:

  - You are about to drop the column `cober_url` on the `memorys` table. All the data in the column will be lost.
  - Added the required column `cover_url` to the `memorys` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_memorys" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cover_url" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "memorys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_memorys" ("content", "create_at", "id", "is_public", "user_id") SELECT "content", "create_at", "id", "is_public", "user_id" FROM "memorys";
DROP TABLE "memorys";
ALTER TABLE "new_memorys" RENAME TO "memorys";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
