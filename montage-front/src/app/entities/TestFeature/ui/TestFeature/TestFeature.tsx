import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import Button from "src/components/Button/Button";
import { useAppDispatch } from "src/shared/lib/hooks";
import './TestFeature.css'
import { getTestData } from "../../model/selectors/getTestData";
import { fetchTestData } from "../../model/services/fetchTestData";



export const TestFeature = memo(() => {
    const dispatch = useAppDispatch();
    const payloadData = useSelector(getTestData);
    console.log(payloadData);
    

    const onBtnClick = useCallback(() => {
        dispatch(fetchTestData());
    }, [dispatch]);

    return (
        <>
                <Button className='primary' onClick={onBtnClick}>
                    получить данные с сервера
                </Button>
                <div className="data">
                    <div className="data-title">{payloadData?.title}</div>
                    <div className="data-body">{payloadData?.body}</div>
                </div>
        </>


    );
});