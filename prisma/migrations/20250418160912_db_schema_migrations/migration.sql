-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('FREE', 'PREBOOKED', 'BOOKED');

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSlot" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "status" "BookingStatus" NOT NULL,
    "patientId" TEXT,
    "doctorId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "TimeSlot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
