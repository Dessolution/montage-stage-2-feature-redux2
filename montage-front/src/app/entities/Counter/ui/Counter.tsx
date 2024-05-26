import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../model/slice/CounterSlice";
import { getCounterValue } from "../model/selectors/getCounterValue/getCounterValue";
import Button from "src/components/Button/Button";
import { TestFeature } from "../../TestFeature/ui";

export const Counter = () => {
    const dispatch = useDispatch();
    const counterValue = useSelector(getCounterValue);

    const increment = () => {
        dispatch(counterActions.increment());
    };

    const decrement = () => {
        dispatch(counterActions.decrement());
    };

    return (
        <div>
            <h1 >{counterValue}</h1>
            <Button className='primary'
                onClick={increment}
            >Increment
            </Button>
            <Button className='primary'
                onClick={decrement}
            >Decrement
            </Button>
            <TestFeature />
        </div>
    );
};