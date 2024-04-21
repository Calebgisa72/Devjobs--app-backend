-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "logo" TEXT NOT NULL,
    "posted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "description" TEXT,
    "webLink" TEXT NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requirement" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    "items" TEXT[],

    CONSTRAINT "Requirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhatToDo" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    "items" TEXT[],

    CONSTRAINT "WhatToDo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhatToDo" ADD CONSTRAINT "WhatToDo_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
