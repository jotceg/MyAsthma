import Action from "../interfaces/Action";

export default (payload: string): Action<string> => ({
    type: "DELETE_SOLID_TREATMENT",
    payload
});