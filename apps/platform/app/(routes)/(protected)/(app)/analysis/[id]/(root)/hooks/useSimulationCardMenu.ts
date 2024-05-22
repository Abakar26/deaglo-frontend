"use client";

import { MenuKey, MenuOptions } from "@/app/(routes)/(protected)/(app)/menus";
import { AnalysisInteractor, SimulationInteractor } from "@/app/interactors";
import { type SimulationInstance } from "@/app/interface";
import { useSnackbarStore } from "@/app/store";
import { SimulationType, SnackbarLevel, type MenuProps, type Selectable } from "ui/components";
import { reloadAnalysisSimulations } from "../actions";
import { useAnalysisDetailStore } from "../store";

export const simulationOptions: Array<Selectable> = [
  // MenuOptions.EXECUTE,
  // MenuOptions.RENAME,
  // MenuOptions.DUPLICATE,
  MenuOptions.PIN,
  MenuOptions.DELETE,
];

export const useSimulationCardMenu = (analysisId: string) => {
  const { setUpdateStatus } = useAnalysisDetailStore();
  const { setSnack } = useSnackbarStore();

  const pin = (simulation: SimulationInstance) => {
    AnalysisInteractor.pinSimulation(simulation.id, simulation.type)
      .then(([success]) => {
        if (success) {
          setSnack({
            message: simulation.pin ? "Simulation unpinned" : "Simulation pinned",
            icon: "circle-check",
            level: SnackbarLevel.SUCCESS,
            duration: 5,
          });
        } else {
          setSnack({
            message: simulation.pin ? "Couldn't unpin simulation" : "Couldn't pin simulation",
            icon: "x",
            level: SnackbarLevel.ERROR,
            duration: 5,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setSnack({
          message: simulation.pin ? "Couldn't unpin simulation" : "Couldn't pin simulation",
          icon: "x",
          level: SnackbarLevel.ERROR,
          duration: 5,
        });
      })
      .finally(() => {
        void reloadAnalysisSimulations(analysisId);
      });
  };

  const execute = (_: SimulationInstance) => {
    // TODO
  };

  const rename = (_: SimulationInstance) => {
    // TODO
  };

  const duplicate = (_: SimulationInstance) => {
    // TODO
  };

  const changeStatus = (simulation: SimulationInstance) => {
    setUpdateStatus(simulation);
  };

  const deleteSimulation = async (simulation: SimulationInstance) => {
    switch (simulation.type) {
      case SimulationType.STRATEGY:
        const res = await SimulationInteractor.strategy.del(analysisId, simulation.id);
        console.log(res);
        const [strategySuccess] = res;
        if (strategySuccess) {
          setSnack({
            message: "Simulation deleted.",
            icon: "circle-check",
            level: SnackbarLevel.SUCCESS,
            duration: 5,
          });
        }
        void reloadAnalysisSimulations(analysisId);
        return;
      case SimulationType.MARGIN:
        const [marginSuccess] = await SimulationInteractor.margin.del(analysisId, simulation.id);
        if (marginSuccess) {
          setSnack({
            message: "Simulation deleted.",
            icon: "circle-check",
            level: SnackbarLevel.SUCCESS,
            duration: 5,
          });
        }
        void reloadAnalysisSimulations(analysisId);
        return;
      case SimulationType.HEDGE:
        const [hedgeSuccess] = await SimulationInteractor.margin.del(analysisId, simulation.id);
        if (hedgeSuccess) {
          setSnack({
            message: "Simulation deleted.",
            icon: "circle-check",
            level: SnackbarLevel.SUCCESS,
            duration: 5,
          });
        }
        void reloadAnalysisSimulations(analysisId);
        return;
    }
  };

  const onSelect = (key: string, simulation: SimulationInstance) => {
    const _key = key as MenuKey;
    switch (_key) {
      case MenuKey.PIN:
        return pin(simulation);
      // case MenuKey.EXECUTE:
      //   return execute(simulation);
      case MenuKey.RENAME:
        return rename(simulation);
      // case MenuKey.DUPLICATE:
      //   return duplicate(simulation);
      case MenuKey.DELETE:
        return deleteSimulation(simulation);
      default:
        return;
    }
  };

  return (simulation: SimulationInstance): MenuProps<Selectable> => {
    return {
      onSelect: (option: Selectable) => void onSelect(option.key, simulation),
      options: simulation.pin
        ? simulationOptions.map((option) =>
            option.key === String(MenuKey.PIN) ? { ...option, value: "Unpin Simulation" } : option
          )
        : simulationOptions,
    };
  };
};
