import { BookingStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  prisma.doctor.deleteMany({});
  prisma.timeSlot.deleteMany({});

  prisma.doctor.createMany({
    data: [
      {
        id: 'ad325e97-5a6d-4972-ab84-c83198c36c9a',
        name: 'Dr. John Doe',
      },
    ],
  });
  prisma.timeSlot.createMany({
    data: [
      {
        id: 'ad325e97-5a6d-4972-ab84-c83198c36c9a',
        time: '09:00',
        status: BookingStatus.FREE,
        doctorId: 'ad325e97-5a6d-4972-ab84-c83198c36c9a',
      },
      {
        id: 'ad325e97-5a6d-4972-ab84-c83198c36c9b',
        time: '09:30',
        status: BookingStatus.FREE,
        doctorId: 'ad325e97-5a6d-4972-ab84-c83198c36c9a',
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
