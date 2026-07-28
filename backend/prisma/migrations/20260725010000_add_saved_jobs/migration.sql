CREATE TABLE "saved_jobs" (
  "userId" INTEGER NOT NULL,
  "jobId" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "saved_jobs_pkey" PRIMARY KEY ("userId", "jobId")
);

ALTER TABLE "saved_jobs"
  ADD CONSTRAINT "saved_jobs_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "saved_jobs"
  ADD CONSTRAINT "saved_jobs_jobId_fkey"
  FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
