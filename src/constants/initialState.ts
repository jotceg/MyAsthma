import jsonDateReviver from "../functions/jsonDateReviver";

import PeakFlow from "../interfaces/PeakFlow";
import RescueTreatmentUse from "../interfaces/RescueTreatmentUse";
import SolidTreatment from "../interfaces/SolidTreatment";
import State from "../interfaces/State";
import SymptomsRecord from "../interfaces/SymptomsRecord";

export default {
    peakFlows: JSON.parse(localStorage.getItem("peakFlows") as string, jsonDateReviver) as PeakFlow[] || [],
    rescueTreatmentUses: JSON.parse(localStorage.getItem("rescueTreatmentUses") as string, jsonDateReviver) as RescueTreatmentUse[] || [],
    symptomsRecords: JSON.parse(localStorage.getItem("symptomsRecords") as string, jsonDateReviver) as SymptomsRecord[] || [],
    selectedDate: new Date(),
    solidTreatments: JSON.parse(localStorage.getItem("solidTreatments") as string) as SolidTreatment[] || []
} as State;