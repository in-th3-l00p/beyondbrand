import {createContext} from "react";
import {IInstagramPost} from "@/database/schema/instagramPost";

export enum Tools {
    SELECT = 'select',
    RECTANGLE = 'rectangle',
    CIRCLE = 'circle'
}

interface IEditorContext {
    post: IInstagramPost;
    setPost: (post: IInstagramPost) => void;

    tool: Tools;
    setTool: (tool: Tools) => void;

    color: string;
    setColor: (color: string) => void;
}

const EditorContext = createContext({} as IEditorContext);
export default EditorContext;