import { useWizardContext } from "./WizardProvider";
import { Generator } from "./Generator";
import { Creator } from "./Creator";
import { Minter } from "./Minter";
import { Button } from "./ui/button";
import { useAccount } from "@starknet-react/core";

export const AdventurerWizard = () => {
    const { creation, step, setStep, nextStep, prevStep, fullPrompt } = useWizardContext();
    const { address } = useAccount()

    if (!address) return (
        <div className="container mx-auto ">Please connect your wallet</div>
    )

    const stepText = ["Create", "Generate", "Mint"]

    const getStep = (step: number) => {
        switch (step) {
            case 0:
                return <Creator />
            case 1:
                return <Generator />
            case 2:
                return <Minter />
            default:
                return <Creator />
        }
    }

    const getStepText = (step: number) => {
        return stepText[step]
    }

    return (
        <div className="container mx-auto ">
            <div className="flex justify-between w-full h-12 mb-10">
                <Button disabled={step === 0} variant={'ghost'} onClick={prevStep}>back</Button>
                <div>
                    <h1>{getStepText(step)}</h1>
                    {/* {fullPrompt()} */}
                </div>
                <Button disabled={step === stepText.length - 1} variant={'ghost'} onClick={nextStep}>next</Button>
            </div>
            {getStep(step)}
        </div>
    );
};