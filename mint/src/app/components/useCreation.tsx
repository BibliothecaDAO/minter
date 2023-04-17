"use client"

import { useState } from "react"

export interface WizardContext {
    race: CreationObject,
    sex: CreationObject,
    class: CreationObject,
}

export interface CreationObject {
    id: 'race' | 'sex' | 'class',
    content: string,
    value: string,
}

export interface Image {
    url: string,
    uuid: string,
    id: number,
    user_id?: string,
    label?: string
}

export const useCreation = () => {
    const [step, setStep] = useState(0)
    const [selectedImage, setSelectedImage] = useState<Image>({ url: "", uuid: "", id: 0 })

    const [creation, setCreation] = useState<WizardContext>({
        race: { id: "race", content: "", value: "" },
        sex: { id: "sex", content: "", value: "" },
        class: { id: "class", content: "", value: "" },
    })

    const updateCreation = (update: CreationObject) => {
        console.log(update);
        setCreation((prevState) => {
            const newState = { ...prevState, [update.id]: update };
            return prevState ? newState : (newState as WizardContext);
        });
    };

    // Function to move to the next step
    const nextStep = () => {
        setStep(prevStep => prevStep + 1)
    }

    // Function to move to the previous step
    const prevStep = () => {
        setStep(prevStep => prevStep - 1)
    }

    return { creation, setCreation, updateCreation, selectedImage, setSelectedImage, step, setStep, nextStep, prevStep }
}