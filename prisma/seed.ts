import { BookingStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.doctor.deleteMany({});
  await prisma.timeSlot.deleteMany({});

  await prisma.doctor.createMany({
    data: [
      {
        id: 'ad325e97-5a6d-4972-ab84-c83198c36c9a',
        name: 'Dr. John Doe',
      },
    ],
  });
  await prisma.timeSlot.createMany({
    data: [
      {
        id: 'ad325e97-5a6d-4972-ab84-c83198c36c9a',
        time: '2025-04-18T10:00:00.000Z',
        status: BookingStatus.FREE,
        doctorId: 'ad325e97-5a6d-4972-ab84-c83198c36c9a',
      },
      {
        id: 'ad325e97-5a6d-4972-ab84-c83198c36c9b',
        time: '2025-04-18T10:30:00.000Z',
        status: BookingStatus.FREE,
        doctorId: 'ad325e97-5a6d-4972-ab84-c83198c36c9a',
      },
      {
        id: 'ad325e97-5a6d-4972-ab84-c83198c36c9c',
        time: '2025-04-18T11:00:00.000Z',
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
