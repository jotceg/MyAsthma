import { PropsWithChildren, useReducer } from "react";

import initialState from "../constants/initialState";
import StateContext from "../constants/StateContext";

import addPeakFlow from "../functions/addPeakFlow";
import addRescueTreatmentUse from "../functions/addRescueTreatmentUse";
import addSolidTreatment from "../functions/addSolidTreatment";
import addSymptomsRecord from "../functions/addSymptomsRecord";
import deletePeakFlow from "../functions/deletePeakFlow";
import deleteRescueTreatmentUse from "../functions/deleteRescueTreatmentUse";
import deleteSolidTreatment from "../functions/deleteSolidTreatment";
import deleteSymptomsRecord from "../functions/deleteSymptomsRecord";
import stateReducer from "../functions/stateReducer";
import updatePeakFlow from "../functions/updatePeakFlow";
import updateRescueTreatmentUse from "../functions/updateRescueTreatmentUse";
import updateSelectedDate from "../functions/updateSelectedDate";
import updateSolidTreatment from "../functions/updateSolidTreatment";
import updateSymptomsRecord from "../functions/updateSymptomsRecord";

// tslint:disable-next-line:typedef
export default function({ children }: PropsWithChildren<{}>) {
    const [state, dispatch] = useReducer(stateReducer, initialState);

    return (
        <StateContext.Provider value={{
            ...state,
            addPeakFlow: peakFlow => dispatch(addPeakFlow(peakFlow)),
            deletePeakFlow: peakFlow => dispatch(deletePeakFlow(peakFlow)),
            updatePeakFlow: peakFlow => dispatch(updatePeakFlow(peakFlow)),
            addRescueTreatmentUse: rescueTreatmentUse => dispatch(addRescueTreatmentUse(rescueTreatmentUse)),
            deleteRescueTreatmentUse: id => dispatch(deleteRescueTreatmentUse(id)),
            updateRescueTreatmentUse: rescueTreatmentUse => dispatch(updateRescueTreatmentUse(rescueTreatmentUse)),
            updateSelectedDate: selectedDate => dispatch(updateSelectedDate(selectedDate)),
            addSymptomsRecord: symptomsRecord => dispatch(addSymptomsRecord(symptomsRecord)),
            deleteSymptomsRecord: symptomsRecord => dispatch(deleteSymptomsRecord(symptomsRecord)),
            updateSymptomsRecord: symptomsRecord => dispatch(updateSymptomsRecord(symptomsRecord)),
            addSolidTreatment: solidTreatment => dispatch(addSolidTreatment(solidTreatment)),
            deleteSolidTreatment: id => dispatch(deleteSolidTreatment(id)),
            updateSolidTreatment: solidTreatment => dispatch(updateSolidTreatment(solidTreatment))
        }}>
            {children}
        </StateContext.Provider>
    );
}