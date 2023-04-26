import { useWizardContext } from "./WizardProvider";
import { Generator } from "./Generator";
import { Creator } from "./Creator";
import { Minter } from "./Minter";
import { Button } from "./ui/button";
import { useAccount } from "@starknet-react/core";

export const AdventurerWizard = () => {
    const { creation, step, setStep, nextStep, prevStep, fullPrompt, checkAllValuesSet } = useWizardContext();
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
        <div className="w-full mx-auto bg-black/40 backdrop-blur-sm h-full flex-grow flex">
            <div className="w-96 border-r p-6 bg-black/40 border-white/40">
                <h5>Adventurer</h5>
                <div className="flex flex-col space-y-3">
                    {Object.values(creation).map((item) => (
                        <Button className="w-full">{item.id}: {item.content}</Button>
                    ))}
                </div>


            </div>
            <div className=" p-10 w-full mx-auto">
                <div className="flex justify-between w-full  border-b border-white/40">
                    <Button disabled={step === 0} variant={'ghost'} onClick={prevStep}>back</Button>

                    <h5>{getStepText(step)}</h5>

                    <Button disabled={step === stepText.length - 1 || !checkAllValuesSet()} variant={'ghost'} onClick={nextStep}>next</Button>
                </div>
                {getStep(step)}
            </div>
        </div>
    );
};