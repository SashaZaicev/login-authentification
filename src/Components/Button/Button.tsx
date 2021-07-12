import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import style from './Button.module.scss';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

export const Button: React.FC<SuperButtonPropsType> = React.memo((
    {
        red, className,
        ...restProps
    }
) => {
    const finalClassName = red ? `${style.red} ${style.default}` : `${className} ${style.default}`;

    return (
        <button className={finalClassName}
                {...restProps}
        />
    );
})

