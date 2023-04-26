"use client"

import { useState } from "react"

export interface WizardContext {
    race: CreationObject,
    sex: CreationObject,
    class: CreationObject,
    skin: CreationObject,
    age: CreationObject,
    expression: CreationObject,
}

export interface CreationObject {
    id: 'race' | 'sex' | 'class' | 'skin' | 'age' | 'expression',
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
        skin: { id: "skin", content: "", value: "" },
        age: { id: "age", content: "", value: "" },
        expression: { id: "expression", content: "", value: "" },
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

    const isAnimal = (value: string) => {
        return (
            creation.race.value == "aarakocra," ||
            creation.race.value == "tabaxi," ||
            creation.race.value == "pepe frog," ||
            creation.race.value == "lizardfolk," ||
            creation.race.value == "hippo," ||
            creation.race.value == "kenku," ||
            creation.race.value == "minotaur," ||
            creation.race.value == "kobold,"
        )
            ? ""
            : value;
    };

    const fullPrompt = () => {
        return isAnimal(creation.age.value) + isAnimal(creation.sex.value) + creation.class.value + creation.race.value + creation.skin.value + creation.expression.value
    }

    const isValidKey = (key: string): key is keyof WizardContext => {
        return ['race', 'sex', 'class', 'skin', 'age', 'expression'].includes(key);
    };

    const checkAllValuesSet = () => {
        for (const key in creation) {
            if (isValidKey(key) && !creation[key].value) {
                return false;
            }
        }
        return true;
    };

    return { checkAllValuesSet, creation, setCreation, updateCreation, selectedImage, setSelectedImage, step, setStep, nextStep, prevStep, fullPrompt }
}