import Action from "../interfaces/Action";

export default (payload: string): Action<string> => ({
    type: "DELETE_SYMPTOMS_RECORD",
    payload
});