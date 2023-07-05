import { useState } from "react";

import { IonModal, IonItem, IonLabel, IonDatetime, IonItemDivider, IonInput, IonTextarea, IonButton } from "@ionic/react";

import ModalHeader from "./ModalHeader";

import useStateContext from "../functions/useStateContext";

import ModalProps from "../interfaces/ModalProps";

export default ({ shouldShowModal, setShouldShowModal }: ModalProps) => {
    const [when, setWhen] = useState<string>();
    const [doses, setDoses] = useState<number>();
    const [comment, setComment] = useState<string>();
    const { addRescueTreatmentUse, selectedDate } = useStateContext();
    // tslint:disable-next-line:typedef
    const today = new Date();
    // tslint:disable-next-line:typedef
    const timeLimit = selectedDate.getFullYear() === today.getFullYear() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getDate() === today.getDate() ? today.toLocaleTimeString() : undefined;

    // tslint:disable-next-line:typedef
    function submitRescueTreatmentUse() {
        if (when !== undefined && when !== null && doses !== undefined && doses !== null && doses !== 0 && !isNaN(doses)) {
            addRescueTreatmentUse({
                when: new Date(when),
                doses,
                comment,
                id: `${Math.random() * 1000}${Math.random() * 1000}`
            });

            setWhen(undefined);
            setDoses(undefined);
            setComment(undefined);
            setShouldShowModal(false);
        }
    }

    // tslint:disable-next-line:typedef
    function closeModal() {
        setWhen(undefined);
        setDoses(undefined);
        setComment(undefined);
        setShouldShowModal(false);
    }

    return (
        <IonModal swipeToClose onDidDismiss={() => setShouldShowModal(false)} isOpen={shouldShowModal}>
            <div className="modal-container">
                <ModalHeader>
                    Add new use
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
                        Doses
                    </IonLabel>
                </IonItemDivider>
                <IonItem className="ion-margin-top modal-item">
                    {/* tslint:disable-next-line:radix */}
                    <IonInput value={doses} onIonChange={event => setDoses(parseInt(event.detail.value as string))} placeholder="0" type="number" inputmode="numeric" />
                    <IonLabel position="fixed">
                        doses
                    </IonLabel>
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
                    <IonButton onClick={submitRescueTreatmentUse} className="ion-margin-horizontal" color="success" shape="round" size="large">
                        Add
                    </IonButton>
                </div>
            </div>
        </IonModal>
    );
};