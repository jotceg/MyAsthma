import Action from "../interfaces/Action";
import RescueTreatmentUse from "../interfaces/RescueTreatmentUse";

export default (payload: Partial<RescueTreatmentUse> & Pick<RescueTreatmentUse, "id" | "when">):
    Action<Partial<RescueTreatmentUse> & Pick<RescueTreatmentUse, "id" | "when">> => ({
        type: "UPDATE_RESCUE_TREATMENT_USE",
        payload
    });