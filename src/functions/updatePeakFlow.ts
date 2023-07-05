import Action from "../interfaces/Action";
import PeakFlow from "../interfaces/PeakFlow";

export default (payload: Partial<PeakFlow> & Pick<PeakFlow, "id" | "when">):
    Action<Partial<PeakFlow> & Pick<PeakFlow, "id" | "when">> => ({
        type: "UPDATE_PEAK_FLOW",
        payload
    });