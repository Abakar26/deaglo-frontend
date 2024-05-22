import { Logger, ILogObj } from "tslog";

const logger: Logger<ILogObj> = new Logger();

export const logInfo = (message: string, additional?: Record<string, any>) => {
  const logObj: ILogObj = { message, additional };
  logger.info(logObj);
};

export const logError = (message: string, additional?: Record<string, any>) => {
  const logObj: ILogObj = { message, additional };
  logger.error(logObj);
};

export const logWarn = (message: string, additional?: Record<string, any>) => {
  const logObj: ILogObj = { message, additional };
  logger.warn(logObj);
};

export const logDebug = (message: string, additional?: Record<string, any>) => {
  const logObj: ILogObj = { message, additional };
  logger.debug(logObj);
};
