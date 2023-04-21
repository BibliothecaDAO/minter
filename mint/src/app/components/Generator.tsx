"use client"
import { useState } from "react";
import { postData } from "../functions";
import Image from "next/image";
import { useWizardContext } from "./WizardProvider";
import { Image as ImageInterface } from "./useCreation";
import { useAccount } from "@starknet-react/core";
import { Button } from "./ui/button";

export const Generator = () => {
    const { creation, selectedImage, setSelectedImage, nextStep, fullPrompt } = useWizardContext();
    const [images, setImages] = useState<ImageInterface[]>([]);
    const [loading, setLoading] = useState(false);
    const { address } = useAccount()

    const fetchImages = async () => {
        setLoading(true);
        try {
            const data = await postData(
                {
                    image_label: "8k, " + fullPrompt() + ", in the style of a realist painting",
                    "username": address,
                    "quantity": 4
                },
                "image"
            );

            console.log(data);

            setImages(data.images);
            setSelectedImage(data.images[0]);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const renderImage = (index: any) => {
        if (images && images[index]) {
            return <Image className="transition-all duration-300 border-4 border-transparent cursor-pointer rounded-3xl hover:opacity-50 hover:border-white/30" onClick={() => setSelectedImage(images[index])} width={1000} height={1000} src={images[index].url} alt={`Image ${index + 1}`} />;
        } else {
            return <Image className="rounded-3xl" width={1000} height={1000} src="https://replicate.delivery/pbxt/nCtVHvIlJSpVO9f93UbeoKoNsIiiFXnP6Fw9MBUM7uDherkhA/out_0.png" alt="Dummy image" />;
        }
    }
    return (
        <div className="container w-full mx-auto">
            {loading && <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full text-3xl text-center bg-black bg-opacity-50 animate-pulse overflow-scroll-hidden rounded-3xl">Please wait, searching <br /> the latent Realm for your Adventurer...</div>}

            {
                images.length != 0 && (
                    <div className="grid grid-cols-4 gap-4">
                        <div className={`w-full h-full col-span-2 row-span-2`}>
                            <Image className="border-4 rounded-3xl border-white/30" width={1000} height={1000} src={selectedImage.url ? selectedImage.url : "https://replicate.delivery/pbxt/nCtVHvIlJSpVO9f93UbeoKoNsIiiFXnP6Fw9MBUM7uDherkhA/out_0.png"} alt={`Selected`} />
                        </div>
                        {images.map((image, index) => {
                            return (
                                <div key={index} className="w-full h-64 ">
                                    {renderImage(index)}
                                </div>
                            )
                        })}
                    </div>
                )
            }


            <div>
                <h2>Adventurer</h2>
                <div className="text-3xl">{fullPrompt()}</div>
                <div className="flex justify-start mt-4">
                    <Button onClick={fetchImages}>
                        fetch from the latent realm
                    </Button>
                    {images.length != 0 && <Button disabled={images.length == 0} onClick={nextStep} >to mint</Button>}
                </div>
            </div>

        </div >
    );
}