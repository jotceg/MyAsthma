import { useState } from "react";

import { IonModal, IonItem, IonLabel, IonDatetime, IonItemDivider, IonInput, IonRadioGroup, IonRadio, IonTextarea, IonButton } from "@ionic/react";

import SelectedRadio from "../types/SelectedRadio";

import ModalHeader from "./ModalHeader";

import "../index.css";

import useStateContext from "../functions/useStateContext";

import ModalProps from "../interfaces/ModalProps";

export default ({ setShouldShowModal, shouldShowModal }: ModalProps) => {
    const { selectedDate } = useStateContext();
    const [when, setWhen] = useState<string>();
    const [peakFlow, setPeakFlow] = useState<number>();
    const [selectedRadio, setSelectedRadio] = useState<SelectedRadio>();
    const [comment, setComment] = useState<string>();
    const { addPeakFlow } = useStateContext();
    // tslint:disable-next-line:typedef
    const today = new Date();
    // tslint:disable-next-line:typedef
    const timeLimit = selectedDate.getFullYear() === today.getFullYear() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getDate() === today.getDate() ? today.toLocaleTimeString() : undefined;

    // tslint:disable-next-line:typedef
    function submitPeakFlow() {
        if (when !== undefined && peakFlow !== undefined && peakFlow !== null && selectedRadio !== undefined && !isNaN(peakFlow)) {
            addPeakFlow({
                when: new Date(when),
                peakFlow: peakFlow ? peakFlow : 0,
                medication: selectedRadio === "before" ? "before" : "after",
                id: `${Math.round(Math.random() * 1000) * Math.round(Math.random() * 1000)}`,
                comment
            });

            setPeakFlow(undefined);
            setSelectedRadio(undefined);
            setComment(undefined);
            setWhen(undefined);
            setShouldShowModal(false);
        }
    }

    // tslint:disable-next-line:typedef
    function closeModal() {
        setPeakFlow(undefined);
        setSelectedRadio(undefined);
        setComment(undefined);
        setWhen(undefined);
        setShouldShowModal(false);
    }

    return (
        <IonModal swipeToClose onDidDismiss={() => setShouldShowModal(false)} isOpen={shouldShowModal}>
            <div className="modal-container">
                <ModalHeader>
                    Add new peak flow
                </ModalHeader>
                <IonItem className="ion-margin-top modal-item">
                    <IonLabel>
                        When?
                    </IonLabel>
                    <IonDatetime
                        max={timeLimit}
                        value={when}
                        onIonChange={event => setWhen(event.detail.value as string)}
                        displayFormat="HH:mm"
                        pickerFormat="HH:mm"
                        placeholder="Select time" />
                </IonItem>
                <IonItemDivider className="ion-margin-top">
                    <IonLabel>
                        Peak flow
                    </IonLabel>
                </IonItemDivider>
                <IonItem className="ion-margin-top modal-item">
                    <IonInput
                        placeholder="Typically between 0-999"
                        type="number"
                        inputmode="numeric"
                        value={peakFlow}
                        // tslint:disable-next-line:radix
                        onIonChange={event => setPeakFlow(parseInt(event.detail.value as string))} />
                    <IonLabel position="fixed">
                        l/min
                    </IonLabel>
                </IonItem>
                <IonItem className="ion-margin-top modal-item">
                    <IonLabel>
                        Medication
                    </IonLabel>
                    <IonRadioGroup value={selectedRadio} onIonChange={event => setSelectedRadio(event.detail.value)}>
                        <IonItem className="modal-item">
                            <IonRadio value="before medication" />
                            <IonLabel className="ion-margin-start">
                                Before medication
                            </IonLabel>
                        </IonItem>
                        <IonItem lines="none" className="modal-item">
                            <IonRadio value="after medication" />
                            <IonLabel className="ion-margin-start">
                                After medication
                            </IonLabel>
                        </IonItem>
                    </IonRadioGroup>
                </IonItem>
                <IonItemDivider className="ion-margin-top">
                    <IonLabel>
                        Comment
                    </IonLabel>
                </IonItemDivider>
                <IonItem className="ion-margin-top modal-item">
                    <IonTextarea value={comment} onIonChange={event => setComment(event.detail.value as string)} />
                </IonItem>
                <div className="modal-buttons-container">
                    <IonButton onClick={closeModal} className="ion-margin-horizontal" color="danger" shape="round" size="large">
                        Cancel
                    </IonButton>
                    <IonButton onClick={submitPeakFlow} className="ion-margin-horizontal" color="success" shape="round" size="large">
                        Add
                    </IonButton>
                </div>
            </div>
        </IonModal>
    );
};