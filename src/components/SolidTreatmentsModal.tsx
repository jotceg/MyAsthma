import { useState } from "react";

import { IonButton, IonIcon, IonList, IonModal } from "@ionic/react";

import { addOutline } from "ionicons/icons";

import useStateContext from "../functions/useStateContext";

import ModalProps from "../interfaces/ModalProps";

import ModalHeader from "./ModalHeader";
import AddSolidTreatmentModal from "./AddSolidTreatmentModal";
import SolidTreatment from "./SolidTreatment";

export default function({ shouldShowModal, setShouldShowModal }: ModalProps) {
    const { solidTreatments } = useStateContext();

    const [shouldDisplayAddSolidTreatmentModal, setShouldDisplayAddSolidTreatmentModal] = useState(false)

    return (
        <>
            <AddSolidTreatmentModal shouldShowModal={shouldDisplayAddSolidTreatmentModal} setShouldShowModal={setShouldDisplayAddSolidTreatmentModal} />
            <IonModal onDidDismiss={() => setShouldShowModal(false)} swipeToClose isOpen={shouldShowModal}>
                <div className="modal-container">
                    <ModalHeader>
                        Solid treatments
                    </ModalHeader>
                    <IonList style={{"width": "100%"}} className="ion-no-padding">
                        {solidTreatments.map(solidTreatment => <SolidTreatment key={solidTreatment.id} solidTreatment={solidTreatment} />)}
                    </IonList>
                    <div className="modal-buttons-container">
                        <IonButton onClick={() => setShouldDisplayAddSolidTreatmentModal(true)} expand="block" size="large" strong>
                            <IonIcon icon={addOutline} />&nbsp;Add new treatment
                        </IonButton>
                    </div>
                </div>
            </IonModal>
        </>
    )
}