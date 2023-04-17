import { postData } from "../functions";
import { Image } from "../components/useCreation";

interface Images {
    images: Image[]
}

export default async function Page() {
    const data: Images = await postData({}, "all");
    return (
        <div className="min-h-screen">
            <div className="grid grid-cols-8 pt-14">
                {data.images.map(a =>
                    <div><img src={a.url} alt="" /></div>
                )}
            </div>
        </div>

    )
}