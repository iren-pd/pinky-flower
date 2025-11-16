export interface Membership {
    id: string;
    organizationId: string;
    userId: string;
    totalSessions: number;
    usedSessions: number;
    validFrom: string;
    validTo?: string;
    isActive: boolean;
    createdAt: string;
}
