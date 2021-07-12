import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import style from './Input.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    inputLabelName: string
    inputLabel: string

};

const Input: React.FC<SuperInputTextPropsType> = (
    {
        inputLabel, inputLabelName,
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e)

        e.key === 'Enter'
        && onEnter
        && onEnter()
    }

    const finalInputClassName = className ? `${style.superInput} ${className}` : style.superInput
    const finalSpanClassName = spanClassName ? `${style.spanError} ${spanClassName}` : style.spanError

    return (

        <div className={style.inputWrapper}>
            <input type={'text'}
                   id={inputLabelName}
                   onChange={onChangeCallback}
                   onKeyPress={onKeyPressCallback}
                   className={finalInputClassName}

                   {...restProps}
            />
            <label htmlFor={inputLabelName}>*{inputLabel}</label>
            {error && <span className={finalSpanClassName}>{error}</span>}
        </div>
    )
}

export default Input
