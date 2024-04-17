export enum MessageType {
    BRAND_CREATED,
    BRAND_UPDATED,
    BRAND_DELETED
}

export interface Message {
    type: MessageType;
    data: any;
}