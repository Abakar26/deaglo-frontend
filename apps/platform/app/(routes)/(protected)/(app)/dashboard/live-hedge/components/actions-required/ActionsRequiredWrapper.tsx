import { ActionsRequiredContent } from "./ActionsRequiredContent";

import MOCKS from "../_mocks";

export async function ActionsRequiredWrapper() {
  const actions = await MOCKS.getActions();

  return <ActionsRequiredContent actions={actions} />;
}
