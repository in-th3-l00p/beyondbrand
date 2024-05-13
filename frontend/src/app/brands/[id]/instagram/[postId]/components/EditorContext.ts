import {createContext} from "react";

export enum Tools {
    SELECT = 'select',
}

interface IEditorContext {
    postId: string;
    brandId: string;

    tool: Tools;
    setTool: (tool: Tools) => void;
}

const EditorContext = createContext({} as IEditorContext);
export default EditorContext;