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
        <div onClick={() => handleClick()} className={`${creation[props.id].content === props.content ? "bg-black text-white" : ""} flex justify-center p-4 border hover:bg-black hover:text-white border-black rounded cursor-pointer w-72 h-32  align-center`}>
            {/* <img src={image} alt={content} /> */}
            <p className='self-center text-2xl'>{props.content}</p>
        </div>
    );
};

export default Card;