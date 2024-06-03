export enum EventType {
    USER_CREATED,
    USER_UPDATED,
    USER_DELETED,
    BRAND_CREATED,
    BRAND_UPDATED,
    BRAND_DELETED
}

export interface Event {
    type: EventType;
    data: any;
}