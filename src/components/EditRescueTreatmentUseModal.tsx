import { useState } from "react";

import { IonModal, IonItem, IonLabel, IonDatetime, IonItemDivider, IonInput, IonTextarea, IonButton } from "@ionic/react";

import RescueTreatmentUse from "../interfaces/RescueTreatmentUse";
import ModalProps from "../interfaces/ModalProps";

import ModalHeader from "./ModalHeader";

import useStateContext from "../functions/useStateContext";

// tslint:disable-next-line:typedef
export default function({ shouldShowModal, setShouldShowModal, rescueTreatmentUse }: ModalProps & {
    rescueTreatmentUse: RescueTreatmentUse
}) {
    const [when, setWhen] = useState<string>(rescueTreatmentUse.when.toLocaleTimeString());
    const [doses, setDoses] = useState<number>(rescueTreatmentUse.doses);
    const [comment, setComment] = useState(rescueTreatmentUse.comment);
    const { updateRescueTreatmentUse } = useStateContext();
    // tslint:disable-next-line:typedef
    const today = new Date();
    // tslint:disable-next-line:typedef
    const timeLimit = rescueTreatmentUse.when.getFullYear() === today.getFullYear() &&
        rescueTreatmentUse.when.getMonth() === today.getMonth() &&
        rescueTreatmentUse.when.getDate() === today.getDate() ? today.toLocaleTimeString() : undefined;

    // tslint:disable-next-line:typedef
    function closeModal() {
        setShouldShowModal(false);
        setWhen(rescueTreatmentUse.when.toLocaleTimeString());
        setDoses(rescueTreatmentUse.doses);
        setComment(rescueTreatmentUse.comment);
    }

    // tslint:disable-next-line:typedef
    function applyChanges() {
        updateRescueTreatmentUse({
            id: rescueTreatmentUse.id,
            // tslint:disable-next-line:radix
            when: new Date(new Date(rescueTreatmentUse.when).setHours(parseInt(when.slice(0, 2)), parseInt(when.slice(3, 5)),
            // tslint:disable-next-line:radix
            parseInt(when.slice(6)))),
            doses,
            comment
        });

        setShouldShowModal(false);
    }

    return (
        <IonModal swipeToClose onDidDismiss={closeModal} isOpen={shouldShowModal}>
            <div className="modal-container">
                <ModalHeader>
                    Edit use
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
                    <IonButton onClick={applyChanges} className="ion-margin-horizontal" color="success" shape="round" size="large">
                        Update
                    </IonButton>
                </div>
            </div>
        </IonModal>
    );
}