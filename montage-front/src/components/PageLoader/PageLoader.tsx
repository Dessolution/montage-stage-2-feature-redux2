// import Spinner from "../Spinner/Spinner";
import {classNames} from "../../utils/classNames";
import './PageLoader.css'
import { Icon } from "../Icon/Icon";
import Loader from '../../assets/images/Spinner.svg'

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames('PageLoader', {}, [className])}>
        <Icon Svg={Loader} className="spinner"/>
    </div>
);