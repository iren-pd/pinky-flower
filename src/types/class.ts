export interface TrainingClass {
    id: string;
    organizationId: string;
    title: string;
    description?: string;
    startTime: string;
    endTime: string;
    coachId: string;
    capacity: number;
    location?: string;
    createdAt: string;
}
