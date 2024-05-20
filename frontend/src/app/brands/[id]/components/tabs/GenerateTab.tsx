import NameGenerator from "@/app/brands/[id]/components/tabs/generate/NameGenerator";
import DescriptionGeneration from "@/app/brands/[id]/components/tabs/generate/DescriptionGenerator";
import ColorSchemeGenerator from "@/app/brands/[id]/components/tabs/generate/ColorSchemeGenerator";
import LogoGenerator from "@/app/brands/[id]/components/tabs/generate/LogoGenerator";

export default function GenerateTab() {
    return (
        <div className={"grid grid-cols-1 gap-8"}>
            <NameGenerator />
            <DescriptionGeneration />
            <ColorSchemeGenerator />
            <LogoGenerator />
        </div>
    );
}