import { useEffect, useState } from "react";

import { IonAlert, IonBadge, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from "@ionic/react";

import RescueTreatmentUse from "../interfaces/RescueTreatmentUse";

import EditRescueTreatmentUseModal from "./EditRescueTreatmentUseModal";

import useStateContext from "../functions/useStateContext";

// tslint:disable-next-line:interface-name
interface Props {
    rescueTreatmentUse: RescueTreatmentUse;
}

// tslint:disable-next-line:typedef
export default function({ rescueTreatmentUse }: Props) {
    const [shouldToggleEditingModal, setShouldToggleEditingModal] = useState(false);
    const [shouldDisplayDeletionAlert, setShouldDisplayDeletionAlert] = useState(false);
    const [shouldDeleteRescueTreatmentUse, setShouldDeleteRescueTreatmentUse] = useState(false);
    const { deleteRescueTreatmentUse } = useStateContext();

    useEffect(() => {
        if (shouldDeleteRescueTreatmentUse) {
            setShouldDisplayDeletionAlert(false);

            // tslint:disable-next-line:typedef
            let id = setTimeout(() => {
                deleteRescueTreatmentUse(rescueTreatmentUse.id);
            }, 300);

            return () => clearTimeout(id);
        }
    }, [shouldDeleteRescueTreatmentUse]);

    return (
        <>
            <EditRescueTreatmentUseModal
                shouldShowModal={shouldToggleEditingModal}
                setShouldShowModal={setShouldToggleEditingModal}
                rescueTreatmentUse={rescueTreatmentUse} />
            <IonAlert
                isOpen={shouldDisplayDeletionAlert}
                header="Delete this use?"
                buttons={[{ text: "Cancel", role: "cancel" }, { text: "Delete", handler: () => setShouldDeleteRescueTreatmentUse(true) }]}
                message="Are you sure you want to delete this rescue treatment use?" />
            <IonItemSliding>
                <IonItem onClick={() => setShouldToggleEditingModal(true)} button lines="full">
                    <IonLabel className="none-flex">
                        {rescueTreatmentUse.when.toLocaleTimeString().slice(0, 5)}
                    </IonLabel>
                    <IonLabel className="margin-left-10px">
                        {rescueTreatmentUse.comment ? rescueTreatmentUse.comment : "Rescue treatment use"}
                    </IonLabel>
                    <IonBadge className="rescue-treatment-use-badge" color="primary">
                        {rescueTreatmentUse.doses}
                    </IonBadge>
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