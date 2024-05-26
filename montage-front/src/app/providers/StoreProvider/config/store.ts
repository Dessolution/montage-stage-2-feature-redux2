import { configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./StateSchema";
import { counterReducer } from "src/app/entities/Counter";
import { createAPI } from "./api";
import { testDataReducer } from "src/app/entities/TestFeature/model";

export const api = createAPI();


export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      COUNTER: counterReducer,
      TESTFEATURE: testDataReducer
    },
    //@ts-ignore next line
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),

    preloadedState: initialState,
  });
}


export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];