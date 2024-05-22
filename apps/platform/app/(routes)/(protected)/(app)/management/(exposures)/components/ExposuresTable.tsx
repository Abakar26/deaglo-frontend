"use client";

import MOCKS from "./_mocks";

import { useEffect, useState } from "react";
import {
  DataTable,
  SuspenseBlock,
  TableHeader,
  TableRow,
  type SortDescriptor,
} from "ui/components";
import { useQueryParams } from "@/app/hooks";
import type { Exposure } from "@/app/interface/management";
import { type ExposuresType, FIELD_MAP } from "../utilities";
import { EditExposuresBar } from "./EditExposuresBar";
import { ExposuresTableRow } from "./ExposuresTableRow";

type ExposuresTableProps = {
  type: ExposuresType;
};

const headers: (keyof Exposure)[] = [
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

export function ExposuresTable({ type }: ExposuresTableProps) {
  const { params, update } = useQueryParams();

  const page = parseInt(params.get("page") ?? "1", 10);

  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState<number>();
  const [exposures, setExposures] = useState<Exposure[]>([]);
  const [editableExposures, setEditableExposures] = useState<Exposure[]>([]);

  function getSortDescriptor() {
    const sortString = params.get("sort");
    if (sortString === null) return undefined;

    const [key, direction] = sortString.split(" ");
    return { key, direction } as SortDescriptor;
  }

  function handleSorting(descriptor: SortDescriptor) {
    const sortString = `${descriptor.key}+${descriptor.direction}`;
    update("sort", sortString);
  }

  function setExposureAsEditable(exposure: Exposure) {
    setEditableExposures((current) => {
      const alreadyEditable = current.some((editableExposure) => {
        return editableExposure.id === exposure.id;
      });
      if (alreadyEditable) return current;

      return [...current, exposure];
    });
  }

  function editExposure(id: string, field: keyof Exposure) {
    return function (value: unknown) {
      setEditableExposures((current) => {
        return current.map((exposure) => {
          return exposure.id === id ? { ...exposure, [field]: value } : exposure;
        });
      });
    };
  }

  const resetEditableExposures = () => setEditableExposures([]);

  function saveEditedExposures() {
    // TODO: Missing server-side implementation
    setExposures((current) => {
      return current.map((exposure) => {
        const editedExposure = editableExposures.find((editedExposure) => {
          return editedExposure.id === exposure.id;
        });
        return editedExposure ?? exposure;
      });
    });

    resetEditableExposures();
  }

  function deleteExposures() {
    // TODO: Missing server-side implementation
    setExposures((current) => {
      return current.filter((exposure) => {
        return !editableExposures.some((editableExposure) => {
          return editableExposure.id === exposure.id;
        });
      });
    });

    resetEditableExposures();
  }

  function changePage(page: number) {
    setLoading(true);

    update("page", page.toString());
    const args = Object.fromEntries(params.entries());

    MOCKS.getExposures(args)
      .then(({ exposures }) => setExposures(exposures))
      .catch(() => setExposures([]));
  }

  useEffect(() => {
    setLoading(true);

    const args = Object.fromEntries(params.entries());

    MOCKS.getExposures(args)
      .then(({ exposures, totalPages }) => {
        setExposures(exposures);
        setTotalPages(totalPages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params]);

  return (
    <>
      {editableExposures.length > 0 ? (
        <EditExposuresBar
          type={type}
          onSave={saveEditedExposures}
          onCancel={resetEditableExposures}
          onDelete={deleteExposures}
        />
      ) : null}

      {!loading ? (
        <DataTable page={page} totalPages={totalPages} setPage={changePage}>
          <thead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader
                  key={header}
                  sort={getSortDescriptor()}
                  sortKey={FIELD_MAP[type][header].key}
                  onSort={handleSorting}
                  align={FIELD_MAP[type][header].align}
                >
                  {FIELD_MAP[type][header].label}
                </TableHeader>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {exposures.map((exposure) => {
              const editableExposure = editableExposures.find((editableExposure) => {
                return editableExposure.id === exposure.id;
              });
              const data = editableExposure ?? exposure;

              return (
                <ExposuresTableRow
                  key={data.id}
                  editable={editableExposure !== undefined}
                  exposure={data}
                  onChange={(field) => editExposure(data.id, field)}
                  onClick={() => setExposureAsEditable(exposure)}
                />
              );
            })}
          </tbody>
        </DataTable>
      ) : (
        <SuspenseBlock height="480px" />
      )}
    </>
  );
}
