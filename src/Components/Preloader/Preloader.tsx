import React from 'react';
import style from './Preloader.module.scss';

export const Preloader: React.FC = React.memo(() => {
    return (
        <div className={style.preloaderWrapper}>
            <div className={style.loader}>Loading...</div>
        </div>
    );
})

