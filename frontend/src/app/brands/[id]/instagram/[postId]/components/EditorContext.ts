import React, {createContext} from "react";
import {IInstagramPost, Shape} from "@/database/schema/instagramPost";
import {Tools} from "@/app/brands/[id]/instagram/[postId]/components/tools";

interface IEditorContext {
    post: IInstagramPost;
    setPost: React.Dispatch<React.SetStateAction<IInstagramPost>>;

    selectedShape: Shape | null;
    setSelectedShape: (shape: Shape | null) => void;

    tool: Tools;
    setTool: (tool: Tools) => void;

    color: string;
    setColor: (color: string) => void;
}

const EditorContext = createContext({} as IEditorContext);
export default EditorContext;