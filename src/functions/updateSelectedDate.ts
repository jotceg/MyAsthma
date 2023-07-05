import Action from "../interfaces/Action";

export default (payload: Date): Action<Date> => ({
    type: "UPDATE_SELECTED_DATE",
    payload
});