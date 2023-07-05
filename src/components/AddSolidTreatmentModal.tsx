import { useState } from "react";

import { IonModal, IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";

import useStateContext from "../functions/useStateContext";

import ModalProps from "../interfaces/ModalProps";

import ModalHeader from "./ModalHeader";

export default function({ shouldShowModal, setShouldShowModal }: ModalProps) {
    const [name, setName] = useState<string>();
    const [activeSubstance, setActiveSubstance] = useState<string>();
    const { addSolidTreatment } = useStateContext();
    
    function onModalDismiss() {
        setName(undefined);
        setActiveSubstance(undefined);
        setShouldShowModal(false);
    };
    
    
    function addNewSolidTreatment() {
        if (name && activeSubstance) {
            addSolidTreatment({
                name,
                activeSubstance,
                id: `${Math.random() * 1000}${Math.random() * 1000}`
            });
            setShouldShowModal(false);
            setName(undefined);
            setActiveSubstance(undefined);
        };
    };

    return (
        <IonModal
            isOpen={shouldShowModal}
            swipeToClose
            onDidDismiss={onModalDismiss}>
            <div className="modal-container">
                <ModalHeader>
                    New solid treatment
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
                    <IonButton onClick={addNewSolidTreatment} className="ion-margin-horizontal" color="success" shape="round" size="large">
                        Add
                    </IonButton>
                </div>
            </div>
        </IonModal>
    );
};