import Action from "../interfaces/Action";
import RescueTreatmentUse from "../interfaces/RescueTreatmentUse";

export default (payload: RescueTreatmentUse): Action<RescueTreatmentUse> => ({
    type: "ADD_RESCUE_TREATMENT_USE",
    payload
});