import { IonModal, IonItem, IonLabel, IonDatetime, IonItemDivider, IonTextarea, IonButton, IonRange, IonIcon } from "@ionic/react";

import { happyOutline, sadOutline } from "ionicons/icons";

import { useState } from "react";

import useStateContext from "../functions/useStateContext";

import SymptomsRecord from "../interfaces/SymptomsRecord";
import ModalProps from "../interfaces/ModalProps";

import ModalHeader from "./ModalHeader";

// tslint:disable-next-line:typedef
export default function({ shouldShowModal, setShouldShowModal, symptomsRecord }: ModalProps & { symptomsRecord: SymptomsRecord }) {
    const [when, setWhen] = useState<string>(symptomsRecord.when.toLocaleTimeString());
    const [cough, setCough] = useState(symptomsRecord.cough);
    const [breathlessness, setBreathlessness] = useState(symptomsRecord.breathlessness);
    const [generalWellbeing, setGeneralWellbeing] = useState(symptomsRecord.generalWellbeing);
    const [comment, setComment] = useState(symptomsRecord.comment);
    const { updateSymptomsRecord } = useStateContext();
    // tslint:disable-next-line:typedef
    const today = new Date();
    // tslint:disable-next-line:typedef
    const timeLimit = symptomsRecord.when.getFullYear() === today.getFullYear() &&
        symptomsRecord.when.getMonth() === today.getMonth() &&
        symptomsRecord.when.getDate() === today.getDate() ? today.toLocaleTimeString() : undefined;

    // tslint:disable-next-line:typedef
    function onModalDismiss() {
        setShouldShowModal(false);
        setWhen(symptomsRecord.when.toLocaleTimeString());
        setCough(symptomsRecord.cough);
        setBreathlessness(symptomsRecord.breathlessness);
        setGeneralWellbeing(symptomsRecord.generalWellbeing);
        setComment(symptomsRecord.comment);
    }

    // tslint:disable-next-line:typedef
    function applyChanges() {
        updateSymptomsRecord({
            id: symptomsRecord.id,
            // tslint:disable-next-line:radix
            when: new Date(new Date(symptomsRecord.when).setHours(parseInt(when.slice(0, 2)), parseInt(when.slice(3, 5)),
            // tslint:disable-next-line:radix
            parseInt(when.slice(6)))),
            breathlessness,
            cough,
            generalWellbeing,
            comment
        });

        setShouldShowModal(false);
    }

    return (
        <IonModal swipeToClose onDidDismiss={onModalDismiss} isOpen={shouldShowModal}>
            <div className="modal-container">
                <ModalHeader>
                    Edit symptoms
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
                        pickerFormat="HH:mm" placeholder="Select time" />
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