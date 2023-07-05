import ActionType from "../types/ActionType";

// tslint:disable-next-line:interface-name
export default interface Action<Payload = {}> {
    type: ActionType;
    payload: Payload;
}