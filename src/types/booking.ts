export enum BookingStatus {
    Booked = 'booked',
    Visited = 'visited',
    Cancelled = 'cancelled',
    NoShow = 'no_show'
}

export interface Booking {
    id: string;
    organizationId: string;
    classId: string;
    userId: string;
    membershipId?: string;
    status: BookingStatus;
    createdAt: string;
}
