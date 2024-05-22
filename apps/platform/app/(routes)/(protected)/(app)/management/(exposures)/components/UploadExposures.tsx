"use client";

import MOCKS from "./_mocks";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  DataTable,
  SuspenseBlock,
  TableHeader,
  TableRow,
  type SortDescriptor,
} from "ui/components";
import { Color, Typography } from "ui/styles";
import type { Exposure } from "@/app/interface/management";
import { UploadFile } from "../../components/upload-file";
import { type ExposuresType, FIELD_MAP } from "../utilities";
import { ExposuresTableRow } from "./ExposuresTableRow";

type UploadExposuresProps = {
  type: ExposuresType;
};

const fields: (keyof Exposure)[] = [
  "exposureType",
  "theoreticalPaymentDate",
  "realizedPaymentDate",
  "foreignCurrency",
  "exposureId",
  "theoreticalInterestPayment",
  "realizedInterestPayment",
  "theoreticalPrincipalPayment",
  "realizedPrincipalPayment",
];

type UploadError = {
  id: string;
  key: string;
  message: string;
};

type GroupedErrors = Record<UploadError["id"], Record<UploadError["key"], UploadError["message"]>>;

export function UploadExposures({ type }: UploadExposuresProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<Exposure[]>([]);
  const [errors, setErrors] = useState<UploadError[]>([]);

  // TODO: Pagination for this table is not determined yet.
  const page = 1;
  const totalPages = 1;

  function getSortDescriptor() {
    // TODO: Sorting for this table is not determined yet.
    return undefined;
  }

  function handleSorting(descriptor: SortDescriptor) {
    // TODO: Sorting for this table is not determined yet.
  }

  function changePage(page: number) {
    // TODO: Pagination for this table is not determined yet.
  }

  function handleChange(id: string, name: keyof Exposure) {
    return function (value: unknown) {
      setFormState((current) => {
        return current.map((exposure) => {
          return exposure.id === id ? { ...exposure, [name]: value } : exposure;
        });
      });
    };
  }

  function save() {
    router.push(`/management/${type}`);
  }

  useEffect(() => {
    setLoading(true);

    MOCKS.getUploadResults(page)
      .then(({ results, errors }) => {
        setFormState(results);
        setErrors(errors);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page]);

  const groupedErrors = errors.reduce<GroupedErrors>((acc, item) => {
    acc[item.id] = acc[item.id] ? acc[item.id]! : {};
    acc[item.id]![item.key] = item.message;
    return acc;
  }, {});

  const TableForm = (
    <>
      {!loading ? (
        <DataTable page={page} totalPages={totalPages} setPage={changePage}>
          <thead>
            <TableRow>
              {fields.map((field) => (
                <TableHeader
                  key={field}
                  sort={getSortDescriptor()}
                  sortKey={FIELD_MAP[type][field].key}
                  onSort={handleSorting}
                  align={FIELD_MAP[type][field].align}
                >
                  {FIELD_MAP[type][field].label}
                </TableHeader>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {formState.map((exposure) => (
              <ExposuresTableRow
                key={exposure.id}
                editable
                errors={groupedErrors[exposure.id]}
                exposure={exposure}
                onChange={(name) => handleChange(exposure.id, name)}
              />
            ))}
          </tbody>
        </DataTable>
      ) : (
        <SuspenseBlock height="480px" />
      )}

      {errors.length > 0 ? (
        <ErrorContainer>
          <ErrorTitle>
            {errors.length > 1 ? `${errors.length} errors` : "1 error"} occurred:
          </ErrorTitle>
          <ErrorList>
            {errors.map((error, index) => (
              <li key={`${error.id}_${error.key}`}>
                {index + 1}. {error.message}
              </li>
            ))}
          </ErrorList>
        </ErrorContainer>
      ) : null}
    </>
  );

  return <UploadFile type={type} save={save} slot={TableForm} />;
}

const ErrorContainer = styled.div`
  color: ${Color.DANGER_700};
`;

const ErrorTitle = styled.span`
  ${Typography.LABEL_3}
`;

const ErrorList = styled.ol`
  ${Typography.LABEL_4}
  list-style: none;
  margin-top: 8px;
`;
