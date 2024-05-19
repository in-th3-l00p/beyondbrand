import {panel, panelTitle} from "@/app/brands/[id]/instagram/[postId]/components/primitives";

export default function ColorSchemeGenerator() {
    return (
        <div className={panel()}>
            <h2 className={panelTitle()}>Generate color scheme</h2>
        </div>
    );
}
