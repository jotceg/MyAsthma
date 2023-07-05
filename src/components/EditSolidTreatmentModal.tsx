import { useState } from "react";

import { IonModal, IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";

import useStateContext from "../functions/useStateContext";

import ModalProps from "../interfaces/ModalProps";
import SolidTreatment from "../interfaces/SolidTreatment";

import ModalHeader from "./ModalHeader";

export default function({ shouldShowModal, setShouldShowModal, solidTreatment }: ModalProps & { solidTreatment: SolidTreatment }) {
    const [name, setName] = useState<string>(solidTreatment.name);
    const [activeSubstance, setActiveSubstance] = useState<string>(solidTreatment.activeSubstance);
    const { updateSolidTreatment } = useStateContext();
    
    function onModalDismiss() {
        setShouldShowModal(false);
        setName(solidTreatment.name);
        setActiveSubstance(solidTreatment.activeSubstance);
    };
    
    function applyChanges() {
        updateSolidTreatment({
            name,
            activeSubstance,
            id: solidTreatment.id
        });
        
        setShouldShowModal(false);
    };

    return (
        <IonModal
            isOpen={shouldShowModal}
            swipeToClose
            onDidDismiss={onModalDismiss}>
            <div className="modal-container">
                <ModalHeader>
                    Edit solid treatment
                </ModalHeader>
                <IonItem className="ion-margin-top modal-item">
                    <IonLabel>
                        Name
                    </IonLabel>
                    <IonInput value={name} onIonChange={event => setName(event.detail.value as string)} />
                </IonItem>
                <IonItem className="ion-margin-top modal-item">
                    <IonLabel>
                        Active substance
                    </IonLabel>
                    <IonInput value={activeSubstance} onIonChange={event => setActiveSubstance(event.detail.value as string)} />
                </IonItem>
                <div className="modal-buttons-container">
                    <IonButton onClick={onModalDismiss} className="ion-margin-horizontal" color="danger" shape="round" size="large">
                        Cancel
                    </IonButton>
                    <IonButton onClick={applyChanges} className="ion-margin-horizontal" color="success" shape="round" size="large">
                        Update
                    </IonButton>
                </div>
            </div>
        </IonModal>
    );
};