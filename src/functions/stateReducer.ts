import initialState from "../constants/initialState";

import Action from "../interfaces/Action";
import PeakFlow from "../interfaces/PeakFlow";
import RescueTreatmentUse from "../interfaces/RescueTreatmentUse";
import SolidTreatment from "../interfaces/SolidTreatment";
import State from "../interfaces/State";
import SymptomsRecord from "../interfaces/SymptomsRecord";

// tslint:disable:typedef
// tslint:disable:semicolon

export default function(state: State = initialState, action: Action): State {
    switch (action.type) {
        case "ADD_PEAK_FLOW": {
            return {
                ...state,
                peakFlows: [
                    ...state.peakFlows,
                    {
                        ...action.payload as PeakFlow
                    }
                ]
            };
        }
        case "DELETE_PEAK_FLOW": {
            const deletedPeakFlowIndex = state.peakFlows.findIndex(value => value.id === (action.payload as string));

            return {
                ...state,
                peakFlows: [
                    ...state.peakFlows.slice(0, deletedPeakFlowIndex),
                    ...state.peakFlows.slice(deletedPeakFlowIndex + 1)
                ]
            };
        }
        case "UPDATE_PEAK_FLOW": {
            const editedPeakFlowIndex = state.peakFlows.findIndex(value => value.id === (action.payload as PeakFlow).id);

            return {
                ...state,
                peakFlows: [
                    ...state.peakFlows.slice(0, editedPeakFlowIndex),
                    {
                        ...state.peakFlows[editedPeakFlowIndex],
                        ...action.payload as PeakFlow
                    },
                    ...state.peakFlows.slice(editedPeakFlowIndex + 1)
                ]
            };
        }
        case "ADD_RESCUE_TREATMENT_USE": {
            return {
                ...state,
                rescueTreatmentUses: [
                    ...state.rescueTreatmentUses,
                    {
                        ...action.payload as RescueTreatmentUse
                    }
                ]
            };
        }
        case "DELETE_RESCUE_TREATMENT_USE": {
            const deletedRescueTreatmentUseIndex = state.rescueTreatmentUses.findIndex(value =>
                value.id === (action.payload as string));

            return {
                ...state,
                rescueTreatmentUses: [
                    ...state.rescueTreatmentUses.slice(0, deletedRescueTreatmentUseIndex),
                    ...state.rescueTreatmentUses.slice(deletedRescueTreatmentUseIndex + 1)
                ]
            };
        }
        case "UPDATE_RESCUE_TREATMENT_USE": {
            const editedRescueTreatmentUseIndex = state.rescueTreatmentUses.findIndex(value =>
                value.id === (action.payload as RescueTreatmentUse).id);

            return {
                ...state,
                rescueTreatmentUses: [
                    ...state.rescueTreatmentUses.slice(0, editedRescueTreatmentUseIndex),
                    {
                        ...state.rescueTreatmentUses[editedRescueTreatmentUseIndex],
                        ...action.payload as RescueTreatmentUse
                    },
                    ...state.rescueTreatmentUses.slice(editedRescueTreatmentUseIndex + 1)
                ]
            };
        }
        case "ADD_SYMPTOMS_RECORD": {
            return {
                ...state,
                symptomsRecords: [
                    ...state.symptomsRecords,
                    {
                        ...action.payload as SymptomsRecord
                    }
                ]
            };
        }
        case "DELETE_SYMPTOMS_RECORD": {
            const deletedSymptomsRecordIndex = state.symptomsRecords.findIndex(value =>
                value.id === (action.payload as string));

            return {
                ...state,
                symptomsRecords: [
                    ...state.symptomsRecords.slice(0, deletedSymptomsRecordIndex),
                    ...state.symptomsRecords.slice(deletedSymptomsRecordIndex + 1)
                ]
            };
        }
        case "UPDATE_SYMPTOMS_RECORD": {
            const editedSymptomsRecordIndex = state.symptomsRecords.findIndex(value =>
                value.id === (action.payload as SymptomsRecord).id);

            return {
                ...state,
                symptomsRecords: [
                    ...state.symptomsRecords.slice(0, editedSymptomsRecordIndex),
                    {
                        ...state.symptomsRecords[editedSymptomsRecordIndex],
                        ...action.payload as SymptomsRecord
                    },
                    ...state.symptomsRecords.slice(editedSymptomsRecordIndex + 1)
                ]
            };
        }
        case "UPDATE_SELECTED_DATE": {
            return {
                ...state,
                selectedDate: action.payload as Date
            };
        }
        case "ADD_SOLID_TREATMENT": {
            return {
                ...state,
                solidTreatments: [
                    ...state.solidTreatments,
                    {
                        ...action.payload as SolidTreatment
                    }
                ]
            }
        }
        case "DELETE_SOLID_TREATMENT": {
            const deletedSolidTreatmentIndex = state.solidTreatments.findIndex(value =>
                value.id === (action.payload as string));

            return {
                ...state,
                solidTreatments: [
                    ...state.solidTreatments.slice(0, deletedSolidTreatmentIndex),
                    ...state.solidTreatments.slice(deletedSolidTreatmentIndex + 1)
                ]
            }
        }
        case "UPDATE_SOLID_TREATMENT": {
            const editedSolidTreatmentIndex = state.solidTreatments.findIndex(value =>
                value.id === (action.payload as SymptomsRecord).id);

            return {
                ...state,
                solidTreatments: [
                    ...state.solidTreatments.slice(0, editedSolidTreatmentIndex),
                    {
                        ...state.solidTreatments[editedSolidTreatmentIndex],
                        ...action.payload as SymptomsRecord
                    },
                    ...state.solidTreatments.slice(editedSolidTreatmentIndex + 1)
                ]
            };
        }
    };
};