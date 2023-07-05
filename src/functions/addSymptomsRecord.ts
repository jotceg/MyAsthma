import Action from "../interfaces/Action";
import SymptomsRecord from "../interfaces/SymptomsRecord";

export default (payload: SymptomsRecord): Action<SymptomsRecord> => ({
    type: "ADD_SYMPTOMS_RECORD",
    payload
});