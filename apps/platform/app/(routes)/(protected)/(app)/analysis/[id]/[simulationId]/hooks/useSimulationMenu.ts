"use client";

import { MenuKey, MenuOptions } from "@/app/(routes)/(protected)/(app)/menus";
import { AnalysisInteractor } from "@/app/interactors";
import type { SimulationInstance } from "@/app/interface";
import { useSnackbarStore } from "@/app/store";
import { SimulationType, SnackbarLevel, type Selectable } from "ui/components";

export const simulationOptions: Array<Selectable> = [
  // MenuOptions.SHARE,
  // MenuOptions.RENAME,
  // MenuOptions.DUPLICATE,
  MenuOptions.PIN,
  MenuOptions.DELETE,
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useSimulationMenu = (simulation: SimulationInstance) => {
  const { setSnack } = useSnackbarStore();

  const pin = () => {
    AnalysisInteractor.pinSimulation(simulation.id, simulation.type)
      .then(([success]) => {
        if (success) {
          setSnack({
            message: "Simulation pinned",
            icon: "circle-check",
            level: SnackbarLevel.SUCCESS,
            duration: 5,
          });
        } else {
          setSnack({
            message: "Couldn't pin simulation",
            icon: "x",
            level: SnackbarLevel.ERROR,
            duration: 5,
          });
        }
      })
      .catch(console.error);
  };

  const execute = () => {
    // TODO
  };

  const rename = () => {
    // TODO
  };

  const duplicate = () => {
    // TODO
  };

  const deleteSimulation = () => {
    // TODO
    switch (simulation.type) {
      case SimulationType.STRATEGY:
        break;

      case SimulationType.MARGIN:
        break;

      case SimulationType.HEDGE:
        break;

      default:
        return;
    }
  };

  const onSelect = (key: string) => {
    const _key = key as MenuKey;
    switch (_key) {
      case MenuKey.PIN:
        return pin();
      case MenuKey.EXECUTE:
        return execute();
      case MenuKey.RENAME:
        return rename();
      case MenuKey.DUPLICATE:
        return duplicate();
      case MenuKey.DELETE:
        return deleteSimulation();
    }
  };

  return {
    onSelect: (option: Selectable) => onSelect(option.key),
    options: simulationOptions,
  };
};
