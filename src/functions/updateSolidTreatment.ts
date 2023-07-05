import SolidTreatment from "../interfaces/SolidTreatment";
import Action from "../interfaces/Action";

export default (payload: SolidTreatment): Action<SolidTreatment> => ({
    type: "UPDATE_SOLID_TREATMENT",
    payload
});