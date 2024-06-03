import Image from "next/image";
import logo from "../../../public/logo.svg";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className={"w-full px-8 md:px-16 py-8 bg-dark-gray text-ghost-white"}>
            <div className={"w-full flex pb-4"}>
                <div className={"w-full flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 md:gap-0"}>
                    <div>
                        <h2 className={"text-4xl font-bold pb-4"}>Services</h2>
                        <ul className={"space-y-2"}>
                            <li><Link href={"/brands/create"}>Name generation</Link></li>
                            <li><Link href={"/brands/create"}>Description generation</Link></li>
                            <li><Link href={"/brands/create"}>Color scheme generation</Link></li>
                            <li><Link href={"/brands/create"}>Logo generation</Link></li>
                            <li><Link href={"/brands/create"}>Business plan generation</Link></li>
                            <li><Link href={"/brands"}>Social media posts creation</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className={"text-4xl font-bold pb-4"}>Networking</h2>
                        <ul className={"space-y-2"}>
                            <li><Link href={"/blog/posts"}>Blog</Link></li>
                            <li><Link href={"/forum/posts"}>Forum</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className={"text-4xl font-bold pb-4"}>Social</h2>
                        <ul className={"space-y-2"}>
                            <li><Link href={"/"}>Tiktok</Link></li>
                            <li><Link href={"/"}>Instagram</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className={"text-4xl font-bold pb-4"}>Company</h2>
                        <ul className={"space-y-2"}>
                            <li><Link href={"/about"}>About</Link></li>
                            <li><Link href={"/contact"}>Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className={"items-start"}>
                    <Image src={logo} alt={"logo"} width={75} height={75}/>
                </div>
            </div>
            <p className={"text-jet"}>
                © 2024 Beyond Brand. All rights reserved.
            </p>
        </footer>
    )
}