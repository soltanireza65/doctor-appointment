export class BookSlotCommand {
  constructor(
    public readonly doctorId: string,
    public readonly patientId: string,
    public readonly time: string,
  ) {}
}
