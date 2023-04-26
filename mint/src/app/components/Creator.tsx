import { useState } from "react";
import { useWizardContext } from "./WizardProvider";
import { objects } from '../data'
import CardGroup from "./CardGroup";
import { Button } from "./ui/button";

export const Creator = () => {
    const { creation, nextStep } = useWizardContext();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? objects.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === objects.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="container w-full">
            {/* <div>
                {creation.sex} {" "}
                {creation.race} {" "}

                {creation.class}
            </div> */}


            <div className="flex justify-center w-full mx-auto">

                <div className="flex flex-col">

                    <h4 className="text-center uppercase">Select {objects[currentIndex][0].id}</h4>
                    <CardGroup onClick={objects.length === currentIndex + 1 ? nextStep : handleNext} items={objects[currentIndex]} />


                    <div className="flex justify-between mt-2">
                        <Button
                            size={"xs"}
                            variant={"ghost"}
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                        >
                            back
                        </Button>
                        <div>
                            {currentIndex + 1} / {objects.length}
                        </div>

                    </div>

                </div>
            </div>
        </div>)
}