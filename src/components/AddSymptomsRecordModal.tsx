import { IonButton, IonDatetime, IonIcon, IonItem, IonItemDivider, IonLabel, IonModal, IonRange, IonTextarea } from "@ionic/react";

import { happyOutline, sadOutline } from "ionicons/icons";

import { useState } from "react";

import useStateContext from "../functions/useStateContext";

import ModalProps from "../interfaces/ModalProps";

import ModalHeader from "./ModalHeader";

// tslint:disable-next-line:typedef
export default function({ shouldShowModal, setShouldShowModal }: ModalProps) {
    const [when, setWhen] = useState<string>();
    const [cough, setCough] = useState(0);
    const [breathlessness, setBreathlessness] = useState(0);
    const [generalWellbeing, setGeneralWellbeing] = useState(1);
    const [comment, setComment] = useState<string>();
    const { selectedDate, addSymptomsRecord } = useStateContext();
    // tslint:disable-next-line:typedef
    const today = new Date();
    // tslint:disable-next-line:typedef
    const timeLimit = selectedDate.getFullYear() === today.getFullYear() &&
        selectedDate.getMonth() === today.getMonth() &&
        selectedDate.getDate() === today.getDate() ? today.toLocaleTimeString() : undefined;

    // tslint:disable-next-line:typedef
    function closeModal() {
        setShouldShowModal(false);
        setWhen(undefined);
        setCough(0);
        setBreathlessness(0);
        setGeneralWellbeing(1);
        setComment(undefined);
    }

    // tslint:disable-next-line:typedef
    function submitSymptomsRecord() {
        if (when !== undefined && when !== null) {
            addSymptomsRecord({
                when: new Date(when),
                breathlessness: breathlessness,
                generalWellbeing: generalWellbeing,
                comment,
                cough: cough,
                id: `${Math.random() * 1000}${Math.random() * 1000}`
            });

            setShouldShowModal(false);
            setWhen(undefined);
            setCough(0);
            setBreathlessness(0);
            setGeneralWellbeing(1);
            setComment(undefined);
        }
    }

    return (
        <IonModal swipeToClose onDidDismiss={() => setShouldShowModal(false)} isOpen={shouldShowModal}>
            <div className="modal-container">
                <ModalHeader>
                    Add symptoms
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
                        Cough
                    </IonLabel>
                </IonItemDivider>
                <IonItem className="modal-item display-flex">
                    <IonRange
                        className="no-padding-on-left"
                        value={cough}
                        onIonChange={({ detail: { value } }) => setCough(value as number)}
                        min={0}
                        max={4}
                        pin
                        snaps>
                        <IonIcon size="large" className="margin-right-22px" slot="start" icon={happyOutline} />
                        <IonIcon size="large" className="margin-left-22px" slot="end" icon={sadOutline} />
                    </IonRange>
                </IonItem>
                <IonItemDivider className="ion-margin-top">
                    <IonLabel>
                        Breathlessness
                    </IonLabel>
                </IonItemDivider>
                <IonItem className="modal-item display-flex">
                    <IonRange
                        className="no-padding-on-left"
                        value={breathlessness}
                        onIonChange={({ detail: { value } }) => setBreathlessness(value as number)}
                        min={0}
                        max={4}
                        pin
                        snaps>
                        <IonIcon size="large" className="margin-right-22px" slot="start" icon={happyOutline} />
                        <IonIcon size="large" className="margin-left-22px" slot="end" icon={sadOutline} />
                    </IonRange>
                </IonItem>
                <IonItemDivider className="ion-margin-top">
                    <IonLabel>
                        General well-being
                    </IonLabel>
                </IonItemDivider>
                <IonItem className="modal-item display-flex">
                    <IonRange
                        className="no-padding-on-left"
                        value={generalWellbeing}
                        onIonChange={({ detail: { value } }) => setGeneralWellbeing(value as number)}
                        min={1}
                        max={5}
                        pin
                        snaps>
                        <IonIcon size="large" className="margin-right-22px" slot="start" icon={sadOutline} />
                        <IonIcon size="large" className="margin-left-22px" slot="end" icon={happyOutline} />
                    </IonRange>
                </IonItem>
                <IonItemDivider className="ion-margin-top">
                    <IonLabel>
                        Comment
                    </IonLabel>
                </IonItemDivider>
                <IonItem className="modal-item ion-margin-top">
                    <IonTextarea value={comment} onIonChange={({ detail: { value } }) => setComment(value as string)} />
                </IonItem>
                <div className="modal-buttons-container">
                    <IonButton onClick={closeModal} className="ion-margin-horizontal" color="danger" shape="round" size="large">
                        Cancel
                    </IonButton>
                    <IonButton onClick={submitSymptomsRecord} className="ion-margin-horizontal" color="success" shape="round" size="large">
                        Add
                    </IonButton>
                </div>
            </div>
        </IonModal>
    );
}