import cn from "classnames";
import { ComponentProps, ElementType } from 'react';
import './Button.css'

/*универсальная кнопка*/ 

type ButtonOwnProps<E extends ElementType= ElementType> = {  /*дженерик пропс */   
    children: string;
    primary?: boolean;
    secondary?: boolean;
    as?: E; 
};

type ButtonProps<E extends ElementType> = ButtonOwnProps<E> & Omit <ComponentProps<E>, keyof ButtonOwnProps>;  /*возможные пропсы для определенных типов*/


const defaultElement = 'button'; /*дефолтное значение*/

export default function Button<E extends ElementType = typeof defaultElement>   /*дженерик получили */
({  children, 
    primary, 
    secondary,
    as,
    ...otherProps  /*доп типы */
}: ButtonProps<E>) {                        /*передаем то что получили */
    const classes = cn({ primary, secondary});
    const TagName = as || defaultElement;  
    return <TagName className={classes} {...otherProps}>
        {children}</TagName>
}
