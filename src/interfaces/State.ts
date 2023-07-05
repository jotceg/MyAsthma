import PeakFlow from "./PeakFlow";
import RescueTreatmentUse from "./RescueTreatmentUse";
import SolidTreatment from "./SolidTreatment";
import SymptomsRecord from "./SymptomsRecord";

// tslint:disable-next-line:interface-name
export default interface State {
    peakFlows: Array<PeakFlow>;
    rescueTreatmentUses: Array<RescueTreatmentUse>;
    symptomsRecords: Array<SymptomsRecord>;
    selectedDate: Date;
    solidTreatments: Array<SolidTreatment>;
}