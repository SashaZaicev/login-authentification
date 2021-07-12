import React from 'react';
import style from './Error.module.scss'

type ErrorType = {
    error: string
}

export const Error: React.FC<ErrorType> = React.memo(({error}) => {
    return (
        <div className={style.errorWrapper}>
            <div className={style.error}>{error ? error : ''}</div>
        </div>
    )
});

