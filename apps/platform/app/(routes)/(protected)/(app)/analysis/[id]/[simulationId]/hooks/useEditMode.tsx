import { useQueryParams } from "@/app/hooks";

export const useEditMode = () => {
  const { params, clear, set } = useQueryParams();

  const setEditMode = (edit: boolean, ctx?: { key: string; value: string }) => {
    edit ? set([{ key: "edit", value: "true" }, ...(ctx ? [ctx] : [])]) : clear();
  };

  return {
    editMode: params.get("edit") === "true",
    setEditMode,
  };
};
