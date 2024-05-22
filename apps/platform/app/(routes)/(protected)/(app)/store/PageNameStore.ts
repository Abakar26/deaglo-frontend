import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PageNameStore {
  map: Record<string, string>;
  set: (id: string, name: string) => void;
  get: (id: string) => string | undefined;
  destroy: () => void;
}

export const usePageNameStore = create<PageNameStore>()(
  persist(
    (set, get) => ({
      map: {},
      set: (id: string, name: string) =>
        set(({ map }) => ({
          map: { ...map, [id]: name },
        })),
      get: (id: string) => {
        const state = get();
        return state.map[id];
      },
      destroy: () => {
        localStorage.removeItem("id-mapping-storage");
      },
    }),
    {
      name: "id-mapping-storage",
    }
  )
);
