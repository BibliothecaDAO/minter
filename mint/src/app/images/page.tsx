import { postData } from "../functions";
import { Image as ImageInterface } from "../components/useCreation";
import Image from "next/image";
import BlurImage from "./imageloader";
import { ImageGrid } from "./ImageGrid";

export interface Images {
    images: ImageInterface[]
}

export default async function Page() {

    // const data: Images = await postData({}, "all");
    return (
        <div className="min-h-screen">
            {/* <ImageGrid images={data.images} /> */}
        </div>
    )
}