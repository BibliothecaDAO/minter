"use client"
import React from 'react';
import { CreationObject, useCreation } from './useCreation';
import { useWizardContext } from './WizardProvider';


const Card = (props: CreationObject & { onClick?: (object: CreationObject) => void; }) => {

    const { updateCreation, creation } = useWizardContext();

    const handleClick = () => {
        updateCreation({ ...props })
        props.onClick?.({ ...props })
    }

    return (
        <div onClick={() => handleClick()} className={`${creation[props.id].content === props.content ? "bg-stone-900 text-white" : ""} flex justify-center p-4 hover:bg-stone-900 hover:text-white border-white/30 rounded cursor-pointer w-72 h-16  align-center duration-300 transition-all uppercase font-display bg-black/30`}>
            {/* <img src={image} alt={content} /> */}
            <p className='self-center text-2xl'>{props.content}</p>
        </div>
    );
};

export default Card;