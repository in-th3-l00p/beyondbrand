import {createContext} from "react";
import {IInstagramPost} from "@/database/schema/instagramPost";

export enum Tools {
    SELECT = 'select',
}

interface IEditorContext {
    post: IInstagramPost;
    setPost: (post: IInstagramPost) => void;

    tool: Tools;
    setTool: (tool: Tools) => void;
}

const EditorContext = createContext({} as IEditorContext);
export default EditorContext;