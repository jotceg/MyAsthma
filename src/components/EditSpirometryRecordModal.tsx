import { useState } from "react";

import { IonModal, IonItem, IonLabel, IonDatetime, IonItemDivider, IonInput, IonRadioGroup, IonRadio, IonTextarea, IonButton } from "@ionic/react";

import ModalHeader from "./ModalHeader";

import "../index.css";

import PeakFlow from "../interfaces/PeakFlow";
import ModalProps from "../interfaces/ModalProps";

import useStateContext from "../functions/useStateContext";

// tslint:disable-next-line:typedef
export default function({ setShouldShowModal, shouldShowModal, peakFlow }: ModalProps & { peakFlow: PeakFlow }) {
    const [when, setWhen] = useState<string>(peakFlow.when.toLocaleTimeString());
    const [peakFlowValue, setPeakFlowValue] = useState<number>(peakFlow.peakFlow);
    const [selectedRadio, setSelectedRadio] = useState(peakFlow.medication);
    const [comment, setComment] = useState(peakFlow.comment);
    const { updatePeakFlow } = useStateContext();
    // tslint:disable-next-line:typedef
    const today = new Date();
    // tslint:disable-next-line:typedef
    const timeLimit = peakFlow.when.getFullYear() === today.getFullYear() &&
        peakFlow.when.getMonth() === today.getMonth() &&
        peakFlow.when.getDate() === today.getDate() ? today.toLocaleTimeString() : undefined;

    // tslint:disable-next-line:typedef
    const applyChanges = () => {
        updatePeakFlow({
            id: peakFlow.id,
            // tslint:disable-next-line:radix
            when: new Date(new Date(peakFlow.when).setHours(parseInt(when.slice(0, 2)), parseInt(when.slice(3, 5)),
                // tslint:disable-next-line:radix
                parseInt(when.slice(6)))),
            peakFlow: peakFlowValue,
            medication: selectedRadio,
            comment
        });

        setShouldShowModal(false);
    };

    // tslint:disable-next-line:typedef
    const onModalDismiss = function() {
        setShouldShowModal(false);
        setWhen(peakFlow.when.toLocaleTimeString());
        setPeakFlowValue(peakFlow.peakFlow);
        setSelectedRadio(peakFlow.medication);
        setComment(peakFlow.comment);
    };

    return (
        <IonModal swipeToClose onDidDismiss={onModalDismiss} isOpen={shouldShowModal}>
            <div className="modal-container">
                <ModalHeader>
                    Edit peak flow
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
                        value={peakFlowValue}
                        // tslint:disable-next-line:radix
                        onIonChange={event => setPeakFlowValue(parseInt(event.detail.value as string))} />
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
                            <IonRadio value="before" />
                            <IonLabel className="ion-margin-start">
                                Before medication
                            </IonLabel>
                        </IonItem>
                        <IonItem lines="none" className="modal-item">
                            <IonRadio value="after" />
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
}