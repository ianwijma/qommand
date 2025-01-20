'use client'

import {useRef} from "react";
import {useSearchParams} from "next/navigation";
import {useButtonClick} from "../../../hooks/useButtonClick";

export const PageContent = () => {
    const {emitButtonClick} = useButtonClick();
    const ref = useRef<HTMLInputElement>(null);
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const inputPlaceholder = searchParams.get('inputPlaceholder');

    const handleCancel = () => emitButtonClick('cancel');
    const handleConfirm = () => emitButtonClick('confirm', {input: ref.current.value});

    return (
        <>
            <span>
                {message}
            </span>
            <input ref={ref} placeholder={inputPlaceholder} className='text-black'/>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleConfirm}>Confirm</button>
        </>
    )
}