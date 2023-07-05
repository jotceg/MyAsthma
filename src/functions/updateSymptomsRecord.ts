import Action from "../interfaces/Action";
import SymptomsRecord from "../interfaces/SymptomsRecord";

export default (payload: Partial<SymptomsRecord> & Pick<SymptomsRecord, "id" | "when">):
    Action<Partial<SymptomsRecord> & Pick<SymptomsRecord, "id" | "when">> => ({
        type: "UPDATE_SYMPTOMS_RECORD",
        payload
    });