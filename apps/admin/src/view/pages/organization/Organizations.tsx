import React, { useEffect, useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import {
  APIRoute,
  authenticatedQuery,
  authenticatedMutation,
  HTTPMethod,
  type PaginatedData,
} from "@/core";
import { OrganizationLoader, OrganizationTabBar } from "@/view/components/organizations";
import { OrganizationModal } from "@/view/components/organizations/modals";
import { useOrganizationStore } from "@/core/store";
import { OrganizationList } from "@/view/components/organizations";
import { type Organization, type PartialOrganization } from "@/core/interface";

export const Organizations: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { createOrganization, selectedOrganization, setCreateOrganization } =
    useOrganizationStore();

  const createNewOrganization = async (organization: PartialOrganization) => {
    const { success, reply, error } = await authenticatedMutation<Organization>(
      APIRoute.ORGANIZATION,
      organization
    );

    if (error) {
      console.error(error);
    }

    if (success && reply) {
      navigate(0);
    }
  };

  const updateOrganization = async (organizationId: string, organization: PartialOrganization) => {
    const { error } = await authenticatedMutation<Organization>(
      APIRoute.ORGANIZATION,
      organization,
      undefined,
      HTTPMethod.PATCH,
      organizationId + "/"
    );

    if (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    authenticatedQuery<PaginatedData<Organization>>(APIRoute.ORGANIZATION)
      .then((response) => {
        if (isMounted) {
          if (response.success)
            setTimeout(() => {
              setOrganizations(response.reply!.results);
            }, 100);
          else setError("Failed to fetch organizations");
        }
      })
      .catch(() => {
        if (isMounted) setError("Failed to load organizations");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <OrganizationTabBar />
      {createOrganization && (
        <OrganizationModal
          organization={selectedOrganization}
          onDismiss={() => setCreateOrganization(false)}
          onCreate={(organization: PartialOrganization) => createNewOrganization(organization)}
          onSave={(organizationId: string, organization: PartialOrganization) =>
            updateOrganization(organizationId, organization)
          }
        />
      )}
      <Suspense fallback={<OrganizationLoader count={5} />}>
        <OrganizationList organizations={organizations} />
      </Suspense>
    </>
  );
};
