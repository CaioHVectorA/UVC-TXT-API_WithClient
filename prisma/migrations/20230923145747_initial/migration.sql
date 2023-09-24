-- CreateTable
CREATE TABLE "solo" (
    "ref" TEXT NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "src" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "serie" (
    "ref" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "ep" (
    "ref" TEXT NOT NULL,
    "serie_id" TEXT NOT NULL,
    "ep_number" INTEGER NOT NULL,
    "src" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "ep_serie_id_fkey" FOREIGN KEY ("serie_id") REFERENCES "serie" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateIndex
CREATE UNIQUE INDEX "solo_ref_key" ON "solo"("ref");

-- CreateIndex
CREATE UNIQUE INDEX "solo_id_key" ON "solo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "serie_ref_key" ON "serie"("ref");

-- CreateIndex
CREATE UNIQUE INDEX "serie_id_key" ON "serie"("id");
