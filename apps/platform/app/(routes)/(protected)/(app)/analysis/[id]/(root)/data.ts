"use client";
import { SimulationStatus, SimulationType } from "ui/components";

export interface Simulation {
  id: string;
  title: string;
  description: string;
  status: SimulationStatus;
  type: SimulationType;
  lastRun: Date;
  pinned: boolean;
}

const simulations: Array<Simulation> = [
  {
    id: "sim-1",
    title: "Strategy Simulation-1",
    description: "Strategy Simulation",
    status: SimulationStatus.READY,
    type: SimulationType.STRATEGY,
    lastRun: new Date(),
    pinned: false,
  },
  {
    id: "sim-2",
    title: "Margin Simulation-1",
    description: "Margin Simulation",
    status: SimulationStatus.READY,
    type: SimulationType.MARGIN,
    lastRun: new Date(),
    pinned: false,
  },
  {
    id: "sim-3",
    title: "Hedge IRR-1",
    description: "Hedge IRR",
    status: SimulationStatus.READY,
    type: SimulationType.HEDGE,
    lastRun: new Date(),
    pinned: false,
  },
  {
    id: "sim-4",
    title: "Strategy Simulation-2",
    description: "Strategy Simulation",
    status: SimulationStatus.READY,
    type: SimulationType.STRATEGY,
    lastRun: new Date(),
    pinned: false,
  },
  {
    id: "sim-5",
    title: "Margin Simulation-2",
    description: "Margin Simulation",
    status: SimulationStatus.READY,
    type: SimulationType.MARGIN,
    lastRun: new Date(),
    pinned: false,
  },
  {
    id: "sim-6",
    title: "Hedge IRR-2",
    description: "Hedge IRR",
    status: SimulationStatus.READY,
    type: SimulationType.HEDGE,
    lastRun: new Date(),
    pinned: false,
  },
  {
    id: "sim-1-pinned",
    title: "Strategy Simulation-1",
    description: "Strategy Simulation",
    status: SimulationStatus.READY,
    type: SimulationType.STRATEGY,
    lastRun: new Date(),
    pinned: true,
  },
  {
    id: "sim-2-pinned",
    title: "Margin Simulation-1",
    description: "Margin Simulation",
    status: SimulationStatus.READY,
    type: SimulationType.MARGIN,
    lastRun: new Date(),
    pinned: true,
  },
];

export default simulations;
