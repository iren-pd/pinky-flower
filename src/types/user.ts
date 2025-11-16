export enum UserRole {
    Owner = 'owner',
    Manager = 'manager',
    Coach = 'coach',
    Client = 'client'
}

export interface AppUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    avatarEmodji?: string;

    memberships?: UserOrganizationSummary[];
}

export interface UserOrganizationSummary {
    organizationId: string;
    roles: UserRole[];
}

export interface OrganizationMember {
    id: string;
    organizationId: string;
    userId: string;
    roles: UserRole[];
    isActive: boolean;
    createdAt: string;
}
