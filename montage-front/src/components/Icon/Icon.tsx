import { classNames } from '../../utils/classNames';
import React, { memo } from 'react';
import './Icon.css';

interface IconProps {
    className?: string;
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = memo((props: IconProps) => {
    const { className, Svg } = props;

    return (
        <Svg className={classNames('Icon', {}, [className])} />
    );
});