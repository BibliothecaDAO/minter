import { postData } from "../../functions";
import { Image } from "../../components/useCreation";
import { ImageGrid } from "../ImageGrid";

interface Images {
    images: Image[]
}

export default async function Page({
    params,
}: {
    params: { address: string };
}) {
    const data: Images = await postData({ username: params.address }, "user");
    return (
        <div className="min-h-screen">
            <ImageGrid images={data.images} />
        </div>
    )
}