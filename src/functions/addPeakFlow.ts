import Action from "../interfaces/Action";
import PeakFlow from "../interfaces/PeakFlow";

export default (payload: PeakFlow): Action<PeakFlow> => ({
    type: "ADD_PEAK_FLOW",
    payload
});