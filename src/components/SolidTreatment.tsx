import { useEffect, useState } from "react";

import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonAlert } from "@ionic/react";

import SolidTreatment from "../interfaces/SolidTreatment";
import useStateContext from "../functions/useStateContext";
import EditSolidTreatmentModal from "./EditSolidTreatmentModal";

export default function({ solidTreatment }: { solidTreatment: SolidTreatment }) {
    const [shouldDisplayEditingModal, setShouldDisplayEditingModal] = useState(false);
    const [shouldDisplayDeletionAlert, setShouldDisplayDeletionAlert] = useState(false);
    const [shouldDeleteSolidTreatment, setShouldDeleteSolidTreatment] = useState(false);
    const { deleteSolidTreatment } = useStateContext();

    useEffect(() => {
        if (shouldDeleteSolidTreatment) {
            setShouldDisplayDeletionAlert(false);

            // tslint:disable-next-line:typedef
            let id = setTimeout(() => {
                deleteSolidTreatment(solidTreatment.id);
            }, 300);

            return () => clearTimeout(id);
        }
    }, [shouldDeleteSolidTreatment]);

    return (
        <>
            <IonAlert
                isOpen={shouldDisplayDeletionAlert}
                header="Delete this record?"
                buttons={[{ text: "Cancel", role: "cancel" }, { text: "Delete", handler: () => setShouldDeleteSolidTreatment(true) }]}
                message="Are you sure you want to delete this solid treatment?" />
            <EditSolidTreatmentModal solidTreatment={solidTreatment} shouldShowModal={shouldDisplayEditingModal} setShouldShowModal={setShouldDisplayEditingModal} />
            <IonItemSliding>
                <IonItem onClick={() => setShouldDisplayEditingModal(true)} button lines="full">
                    <IonLabel className="none-flex">
                        {solidTreatment.name}
                    </IonLabel>
                    <IonLabel className="margin-left-10px">
                        {solidTreatment.activeSubstance}
                    </IonLabel>
                </IonItem>
                <IonItemOptions onIonSwipe={() => setShouldDisplayDeletionAlert(true)}>
                    <IonItemOption color="danger" expandable>
                        Delete
                    </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
        </>
    )
}