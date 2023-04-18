"use client"

import React, { createContext, useContext } from "react";
import { useCreation, WizardContext as WizardState, CreationObject, Image } from "./useCreation";

interface WizardContextType {
    creation: WizardState;
    setCreation: (creation: WizardState) => void;
    updateCreation: (update: CreationObject) => void;
    selectedImage: Image;
    setSelectedImage: (image: Image) => void;
    step: number;
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    fullPrompt: () => string;
}


const WizardContext = createContext<WizardContextType>({} as WizardContextType);

export const WizardProvider = ({ children }: any) => {
    const creationState = useCreation();

    return (
        <WizardContext.Provider value={creationState}>{children}</WizardContext.Provider>
    );
};

export const useWizardContext = () => useContext(WizardContext);