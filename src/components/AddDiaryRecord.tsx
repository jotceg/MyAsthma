import { useState } from "react";

import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";

import { addOutline, alertOutline, analyticsOutline, clipboardOutline } from "ionicons/icons";

import AddSpirometryRecordModal from "./AddPeakFlowRecordModal";
import AddRescueTreatmentUseModal from "./AddRescueTreatmentUseModal";
import AddSymptomsRecordModal from "./AddSymptomsRecordModal";

// tslint:disable-next-line:typedef
export default function() {
    const [shouldShowAddPeakFlowRecordModal, setShouldShowAddPeakFlowRecordModal] = useState(false);
    const [shouldShowAddRescueTreatmentUseModal, setShouldShowAddRescueTreatmentUseModal] = useState(false);
    const [shouldShowAddSymptomsRecordModal, setShouldShowAddSymptomsRecordModal] = useState(false);

    return (
        <>
            <AddSpirometryRecordModal
                shouldShowModal={shouldShowAddPeakFlowRecordModal}
                setShouldShowModal={setShouldShowAddPeakFlowRecordModal} />
            <AddRescueTreatmentUseModal
                shouldShowModal={shouldShowAddRescueTreatmentUseModal}
                setShouldShowModal={setShouldShowAddRescueTreatmentUseModal} />
            <AddSymptomsRecordModal
                shouldShowModal={shouldShowAddSymptomsRecordModal}
                setShouldShowModal={setShouldShowAddSymptomsRecordModal} />
            <IonFab slot="fixed" className="add-diary-record-button" horizontal="end" vertical="bottom">
                <IonFabButton color="tertiary">
                    <IonIcon icon={addOutline} />
                </IonFabButton>
                <IonFabList side="top">
                    <IonFabButton onClick={() => setShouldShowAddSymptomsRecordModal(true)} color="secondary">
                        <IonIcon icon={clipboardOutline} />
                    </IonFabButton>
                    <IonFabButton onClick={() => setShouldShowAddRescueTreatmentUseModal(true)} color="danger">
                        <IonIcon icon={alertOutline} />
                    </IonFabButton>
                    <IonFabButton onClick={() => setShouldShowAddPeakFlowRecordModal(true)} color="warning">
                        <IonIcon icon={analyticsOutline} />
                    </IonFabButton>
                </IonFabList>
            </IonFab>
        </>
    );
}