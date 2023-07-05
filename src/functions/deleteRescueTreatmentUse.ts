import Action from "../interfaces/Action";

export default (payload: string): Action<string> => ({
    type: "DELETE_RESCUE_TREATMENT_USE",
    payload
});