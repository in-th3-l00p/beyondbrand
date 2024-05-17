import React, {createContext} from "react";
import {IInstagramPost} from "@/database/schema/instagramPost";
import {Tools} from "@/app/brands/[id]/instagram/[postId]/components/tools";

interface IEditorContext {
    post: IInstagramPost;
    setPost: React.Dispatch<React.SetStateAction<IInstagramPost>>;

    tool: Tools;
    setTool: (tool: Tools) => void;

    color: string;
    setColor: (color: string) => void;
}

const EditorContext = createContext({} as IEditorContext);
export default EditorContext;