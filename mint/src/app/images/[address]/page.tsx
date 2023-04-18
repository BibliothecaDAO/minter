import { postData } from "../../functions";
import { Image } from "../../components/useCreation";

interface Images {
    images: Image[]
}

export default async function Page({
    params,
}: {
    params: { address: string };
}) {
    // const data: Images = await postData({ username: params.address }, "user");

    // console.log(data)
    return (
        <div className="grid grid-cols-8">

            {/* {data.images.map((a, index) =>
                <div key={index}><img src={a.url} alt="" /></div>
            )} */}
        </div>
    )
}