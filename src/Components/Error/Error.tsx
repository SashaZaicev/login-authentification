import React from 'react';
import style from './Error.module.scss'

type ErrorType = {
    error: string
    condition?: boolean
}

export const Error: React.FC<ErrorType> = React.memo(({error, condition}) => {
    return (
        <div className={condition ? style.dNone : style.errorWrapper}>
            <div className={style.error}>{error && error}</div>
        </div>
    )
});

