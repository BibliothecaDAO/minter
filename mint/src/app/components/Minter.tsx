import { useState } from "react";
import { postData } from "../functions";
import Image from "next/image";
import { useWizardContext } from "./WizardProvider";
import { Button } from "./ui/button";

interface UploadData {
    IpfsHash: string
    PinSize: number,
    Timestamp: string
}

export const Minter = () => {
    const { creation, selectedImage, setSelectedImage, nextStep } = useWizardContext();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadData, setUploadData] = useState<UploadData | null>()

    const setIpfs = async () => {
        setLoading(true);
        try {
            const data = await postData(
                {
                    url: selectedImage.url,
                    uuid: selectedImage.uuid
                },
                "upload"
            );

            console.log(data)

            setUploadData(data)

        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const isUploaded = uploadData?.IpfsHash

    return (
        <div className="container flex w-full mx-auto">

            <div className="w-1/2">
                <Image className={`rounded-3xl border-white/20 border-4 ${isUploaded ? "border-green-200  " : ""}`} width={1000} height={1000} src={selectedImage.url ? selectedImage.url : "https://replicate.delivery/pbxt/nCtVHvIlJSpVO9f93UbeoKoNsIiiFXnP6Fw9MBUM7uDherkhA/out_0.png"} alt={`Selected`} />
            </div>



            <div className="w-1/2 p-20 rounded ">
                <h2>Your Adventurer</h2>
                <div className="text-3xl">{creation.sex.value} {creation.race.value} {creation.class.value}</div>
                {/* <div>
                    uuid: {selectedImage.uuid}

                </div> */}
                <div className="flex justify-start mt-4">
                    <Button onClick={setIpfs} >upload to IPFS</Button>
                </div>
            </div>

        </div>
    );
}