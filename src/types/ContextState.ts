import PeakFlow from "../interfaces/PeakFlow";
import RescueTreatmentUse from "../interfaces/RescueTreatmentUse";
import SolidTreatment from "../interfaces/SolidTreatment";
import State from "../interfaces/State";
import SymptomsRecord from "../interfaces/SymptomsRecord";

type ContextState = State & {
    updateSelectedDate: (selectedDate: Date) => void;
    addPeakFlow: (peakFlow: PeakFlow) => void;
    deletePeakFlow: (id: string) => void;
    updatePeakFlow: (peakFlow: Partial<PeakFlow> & Pick<PeakFlow, "id" | "when">) => void;
    addRescueTreatmentUse: (rescueTreatmentUse: RescueTreatmentUse) => void;
    deleteRescueTreatmentUse: (id: string) => void;
    updateRescueTreatmentUse: (rescueTreatmentUse: Partial<RescueTreatmentUse> & Pick<RescueTreatmentUse, "id" | "when">) => void;
    addSymptomsRecord: (symptomsRecord: SymptomsRecord) => void;
    deleteSymptomsRecord: (id: string) => void;
    updateSymptomsRecord: (symptomsRecord: Partial<SymptomsRecord> & Pick<SymptomsRecord, "id" | "when">) => void;
    addSolidTreatment: (solidTreatment: SolidTreatment) => void;
    deleteSolidTreatment: (id: string) => void;
    updateSolidTreatment: (solidTreatment: SolidTreatment) => void;
};

export default ContextState;