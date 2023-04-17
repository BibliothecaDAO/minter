import { useWizardContext } from "./WizardProvider";
import { Generator } from "./Generator";
import { Creator } from "./Creator";
import { Minter } from "./Minter";
import { Button } from "./ui/button";
import { useAccount } from "@starknet-react/core";

export const AdventurerWizard = () => {
    const { creation, step, setStep, nextStep, prevStep } = useWizardContext();
    const { address } = useAccount()

    if (!address) return (
        <div className="container mx-auto ">Please connect your wallet</div>
    )

    return (
        <div className="container mx-auto ">
            <div className="flex justify-between w-full h-12">
                <Button onClick={prevStep}>back</Button>
                <Button onClick={nextStep}>next</Button>
            </div>
            {step === 0 && <Creator />}
            {step === 1 && <Generator />}
            {step === 2 && <Minter />}
        </div>
    );
};