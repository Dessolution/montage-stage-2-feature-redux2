import { StateSchema } from "src/app/providers/StoreProvider";

export const getCounter = (state: StateSchema) => state.COUNTER;