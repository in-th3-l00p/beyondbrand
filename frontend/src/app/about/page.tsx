import {tv} from "tailwind-variants";
import clsx from "clsx";

const gradientText = tv({
    base: "bg-clip-text bg-gradient-to-br from-cyan to-tomato text-transparent"
})
export default function Page() {
    return (
        <section className="my-12">
            <div className={"h-screen px-4"}>
                <div className={"text-center space-y-6"}>
                    <p className="text-2xl 2xl:text-4xl font-medium text-gray-500">About Us</p>
                    <h1 className={"text-6xl 2xl:text-8xl font-extrabold"}>WE CHANGE THE WAY YOU DO <br/> BRANDING</h1>
                    <p className={"text-xl 2xl:text-3xl"}><span className={clsx(
                        "font-bold",
                        gradientText()
                    )}>BeyondBrand</span> helps you build the brand of your business <br/>faster, and easier, than ever
                    </p>
                </div>
                <div className={"flex w-full justify-center my-6"}>
                    <button
                        className={"text-xl 2xl:text-2xl text-center bg-black text-white px-6 py-2 rounded-3xl shadow-black/50 shadow-xl"}>Try <span
                        className={clsx(
                            "font-bold",
                            gradientText()
                        )}>BeyondBrand</span> now
                    </button>
                </div>
            </div>
            <div className="grid mx-4 sm:mx-20 lg:mx-52 2xl:mx-12 grid-cols-1 md:grid-cols-2 2xl:flex 2xl:justify-center gap-20 items-center 2xl:items-start">
                <div className="flex justify-center">
                    <div className="w-80 h-40 bg-gray-200 rounded-xl shadow-md shadow-gray-500/50">
                        <div className="pt-4 pl-6">
                            <p className="text-2xl 2xl:text-4xl font-bold">5000+</p>
                            <p className="text-2xl 2xl:text-4xl">Rewritten lines of code</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-80 h-40 bg-gray-200 rounded-xl shadow-md shadow-gray-500/50">
                        <div className="pt-4 pl-6">
                            <p className="text-2xl 2xl:text-4xl font-bold">1000+</p>
                            <p className="text-2xl 2xl:text-4xl">Coffe’s drinked</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-80 h-40 bg-gray-200 rounded-xl shadow-md shadow-gray-500/50">
                        <div className="pt-4 pl-6">
                            <p className="text-2xl 2xl:text-4xl font-bold">10+</p>
                            <p className="text-2xl 2xl:text-4xl">Oops i pushed to main</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-80 h-40 bg-gray-200 rounded-xl shadow-md shadow-gray-500/50">
                        <div className="pt-4 pl-6">
                            <p className="text-2xl 2xl:text-4xl font-bold">5+</p>
                            <p className="text-2xl 2xl:text-4xl">Unslept nights</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}