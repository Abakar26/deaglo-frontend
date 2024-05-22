import { type Organization } from "@/core/interface";
import { create } from "zustand";

interface OrganizationState {
  createOrganization: boolean;
  selectedOrganization: Organization | undefined;
  setCreateOrganization: (createOrganization: boolean, selectedOrganization?: Organization) => void;
}

export const useOrganizationStore = create<OrganizationState>((set) => ({
  createOrganization: false,
  selectedOrganization: undefined,
  setCreateOrganization: (createOrganization: boolean, selectedOrganization = undefined) =>
    set(() => ({ createOrganization, selectedOrganization })),
}));
