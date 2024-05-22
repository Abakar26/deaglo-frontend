"use client";

// import {
//   type Flag,
//   type SimulationStatus,
//   type SimulationType,
//   type Strategy,
// } from "ui/components";

// export interface Simulation {
//   id: string;
//   name: string;
//   start: Date;
//   end: Date;
//   baseCurrency: string;
//   quoteCurrency: string;
//   baseFlag: Flag;
//   quoteFlag: Flag;
//   baseAmount: number;
//   quoteAmount: number;
//   type: SimulationType;
//   status: SimulationStatus;
// }

// export interface MarginSimulation extends Simulation {
//   strategy: StrategySimulation;
//   initialMargin: number;
//   variationMargin: number;
//   minTransfer: number;
//   type: SimulationType.MARGIN;
// }

// export interface HedgeSimulation extends Simulation {
//   type: SimulationType.HEDGE;
//   fwdRates: Array<{
//     date: Date;
//     points: number;
//   }>;
//   scenarios: Array<HedgeIRRDistribution>;
//   environment: Environment;
// }

// export interface Distribution {
//   name: string;
//   data: {
//     raw: Array<number>;
//     mean: number;
//     qt25: number;
//     qt75: number;
//     qt90: number;
//     qt95: number;
//   };
// }

// export interface HedgeIRRDistribution {
//   name: string;
//   data: {
//     raw: Array<number>;
//     median: number;
//     q1: number;
//     q3: number;
//     min: number;
//     max: number;
//   };
// }

// export interface StrategySimulation extends Simulation {
//   simulations: Array<Distribution>;
//   strategies: Array<{
//     name: string;
//     strategy: Strategy;
//   }>;
//   marketData: MarketData;
//   environment: Environment;
//   type: SimulationType.STRATEGY;
// }

// export interface MarketData {
//   worst: number;
//   best: number;
//   mean: number;
//   spot: Array<[number, Date]>;
//   simulations: Array<Array<[number, Date]>>;
// }

// export interface Environment {
//   name: string;
//   volatilityModel: string;
//   historicalVolatility: number;
//   skew: number;
// }
