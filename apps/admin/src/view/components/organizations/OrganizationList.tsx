import React from "react";
import { type Organization } from "@/core/interface";
import { OrganizationCard } from "@/view/components/organizations";

interface Props {
  organizations: Array<Organization>;
}

export const OrganizationList: React.FunctionComponent<Props> = ({ organizations }) => {
  return organizations?.map((organization) => (
    <OrganizationCard organization={organization} key={organization.organizationId} />
  ));
};
