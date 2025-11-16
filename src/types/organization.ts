export interface Organization {
    id: string;
    name: string;
    address: string;
    description?: string;
    ownerId: string;
    createdAt: string;
}

export interface OrganizationStats {
    organizationId: string;
    totalMembers: number;
    activeMembers: number;
    totalCoaches: number;
    totalManagers: number;
}
