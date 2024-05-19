import NameGeneration from "@/app/brands/[id]/components/tabs/generate/NameGeneration";
import DescriptionGeneration from "@/app/brands/[id]/components/tabs/generate/DescriptionGenerator";

export default function Generate() {
    return (
        <div className={"grid grid-cols-1 gap-8"}>
            <NameGeneration />
            <DescriptionGeneration />
        </div>
    );
}