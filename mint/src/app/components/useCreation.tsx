"use client"

import { useState } from "react"

export interface WizardContext {
    race: CreationObject,
    sex: CreationObject,
    class: CreationObject,
    eyes: CreationObject,
    skin: CreationObject,
}

export interface CreationObject {
    id: 'race' | 'sex' | 'class' | 'eyes' | 'skin',
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
        eyes: { id: "eyes", content: "", value: "" },
        skin: { id: "skin", content: "", value: "" },
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

    const isAnimal = () => {
        return creation.race.value != ("Human" || "Elf" || "Dwarf" || "Orc") ? "" : creation.sex.value
    }

    const fullPrompt = () => {
        return isAnimal() + creation.race.value + creation.class.value + creation.eyes.value + creation.skin.value
    }

    return { creation, setCreation, updateCreation, selectedImage, setSelectedImage, step, setStep, nextStep, prevStep, fullPrompt }
}