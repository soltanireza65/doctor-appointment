export class PrebookSlotCommand {
  constructor(
    public readonly doctorId: string,
    public readonly patientId: string,
    public readonly time: string,
  ) {}
}
