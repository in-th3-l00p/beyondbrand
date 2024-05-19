import NameGenerator from "@/app/brands/[id]/components/tabs/generate/NameGenerator";
import DescriptionGeneration from "@/app/brands/[id]/components/tabs/generate/DescriptionGenerator";

export default function Generate() {
    return (
        <div className={"grid grid-cols-1 gap-8"}>
            <NameGenerator />
            <DescriptionGeneration />
        </div>
    );
}