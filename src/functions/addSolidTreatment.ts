import Action from "../interfaces/Action";
import SolidTreatment from "../interfaces/SolidTreatment";

export default (payload: SolidTreatment): Action<SolidTreatment> => ({
    type: "ADD_SOLID_TREATMENT",
    payload
});