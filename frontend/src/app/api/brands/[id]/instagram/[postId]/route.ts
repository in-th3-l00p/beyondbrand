import GET from "./get";
import PUT from "./update";
import DELETE from "./delete";

export type Params = { params: { id: string, postId: string } };

export { GET, PUT, DELETE };