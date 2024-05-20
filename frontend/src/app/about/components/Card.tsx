import Image from "next/image";
import wp from "../../../../public/wp.png";

export default function Card(props: {
    cv: string,
    website: string,
    image: string,
    description: string,
    name: string
}) {
    return (
        <div className="rounded-md w-1/3 ">
            <div className="group w-full h-full [perspective:1000px]">
                <div
                    className={
                        "relative w-full h-full " +
                        "rounded-md shadow-xl " +
                        "transition-all duration-1000 " +
                        "[transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                    }
                >
                    <div className="absolute inset-0">
                        <Image
                            src={wp}
                            alt=""
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md shadow-md h-full w-full shadow-black/90"
                            style={{ objectPosition: 'top' }}
                        />
                    </div>
                    <div className="absolute inset-0 h-full w-full rounded-md bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <h2 className="text-2xl font-bold pt-6">{props.name}</h2>
                        <p className="pt-6">{props.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}