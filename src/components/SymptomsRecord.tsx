import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonAlert, IonNote } from "@ionic/react";

import { happyOutline, sadOutline } from "ionicons/icons";

import { useEffect, useState } from "react";

import useStateContext from "../functions/useStateContext";

import ISymptomsRecord from "../interfaces/SymptomsRecord";

import EditSymptomsRecordModal from "./EditSymptomsRecordModal";

// tslint:disable-next-line:interface-name
interface Props {
    symptomsRecord: ISymptomsRecord;
}

// tslint:disable-next-line:typedef
export default function({ symptomsRecord }: Props) {
    const [shouldDisplayDeletionAlert, setShouldDisplayDeletionAlert] = useState(false);
    const [shouldDeleteSymptomsRecord, setShouldDeleteSymptomsRecord] = useState(false);
    const [shouldDisplayEditingModal, setShouldDisplayEditingModal] = useState(false);
    const { deleteSymptomsRecord } = useStateContext();

    useEffect(() => {
        if (shouldDeleteSymptomsRecord) {
            setShouldDisplayDeletionAlert(false);

            // tslint:disable-next-line:typedef
            let id = setTimeout(() => {
                deleteSymptomsRecord(symptomsRecord.id);
            }, 300);

            return () => clearTimeout(id);
        }
    }, [shouldDeleteSymptomsRecord]);

    return (
        <>
            <EditSymptomsRecordModal symptomsRecord={symptomsRecord} shouldShowModal={shouldDisplayEditingModal}
                setShouldShowModal={setShouldDisplayEditingModal} />
            <IonAlert
                isOpen={shouldDisplayDeletionAlert}
                header="Delete this record?"
                buttons={[{ text: "Cancel", role: "cancel" }, { text: "Delete", handler: () => setShouldDeleteSymptomsRecord(true) }]}
                message="Are you sure you want to delete this symptoms record?" />
            <IonItemSliding>
                <IonItem onClick={() => setShouldDisplayEditingModal(true)} button lines="full">
                    <IonLabel className="none-flex">
                        {symptomsRecord.when.toLocaleTimeString().slice(0, 5)}
                    </IonLabel>
                    <IonLabel className="margin-left-10px">
                        {symptomsRecord.comment ? symptomsRecord.comment : "Symptoms record"}
                    </IonLabel>
                    <IonNote
                        style={{ display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center" }}
                        color={symptomsRecord.generalWellbeing > 3 ? "success" :
                            symptomsRecord.generalWellbeing < 3 ? "danger" : "warning"}>
                        <IonIcon className="icon-24px" icon={symptomsRecord.generalWellbeing >= 3 ? happyOutline : sadOutline} />
                    </IonNote>
                </IonItem>
                <IonItemOptions onIonSwipe={() => setShouldDisplayDeletionAlert(true)}>
                    <IonItemOption color="danger" expandable>
                        Delete
                    </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
        </>
    );
}