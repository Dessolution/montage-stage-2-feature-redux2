import { CounterSchema } from "src/app/entities/Counter";
import { TestDataSchema } from "src/app/entities/TestFeature/model";

export interface StateSchema {
    COUNTER: CounterSchema,
    TESTFEATURE: TestDataSchema,
}