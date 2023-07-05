import { useEffect, useMemo, useState } from "react";

import { IonItem, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonAlert, IonNote, isPlatform } from "@ionic/react";

import PeakFlow from "../interfaces/PeakFlow";

import EditSpirometryRecordModal from "./EditSpirometryRecordModal";

import useStateContext from "../functions/useStateContext";

// tslint:disable-next-line:interface-name
interface Props {
    peakFlow: PeakFlow;
}

// tslint:disable-next-line:typedef
export default function({ peakFlow }: Props) {
    const [shouldToggleEditingModal, setShouldToggleEditingModal] = useState(false);
    const [shouldDeleteSpirometryRecord, setShouldDeleteSpirometryRecord] = useState(false);
    const [shouldDisplaySpirometryDeletionAlert, setShouldDisplaySpirometryDeletionAlert] = useState(false);
    const { deletePeakFlow } = useStateContext();

    // tslint:disable-next-line:typedef
    const badgeColor = useMemo(() => {
        let color: "danger" | "warning" | "success" = "" as any;

        if (peakFlow.peakFlow < 300) {
            color = "danger";
        } else if (peakFlow.peakFlow < 500) {
            color = "warning";
        // tslint:disable-next-line:curly
        } else color = "success";

        return color;
    }, [peakFlow.peakFlow]);

    useEffect(() => {
        if (shouldDeleteSpirometryRecord) {
            setShouldDisplaySpirometryDeletionAlert(false);

            // tslint:disable-next-line:typedef
            let id = setTimeout(() => {
                deletePeakFlow(peakFlow.id);
            }, 300);

            return () => clearTimeout(id);
        }
    }, [shouldDeleteSpirometryRecord]);

    return (
        <>
            <EditSpirometryRecordModal
                peakFlow={peakFlow}
                shouldShowModal={shouldToggleEditingModal}
                setShouldShowModal={setShouldToggleEditingModal} />
            <IonAlert
                isOpen={shouldDisplaySpirometryDeletionAlert}
                buttons={[{ text: "Cancel", role: "cancel" }, { text: "Delete", handler: () => setShouldDeleteSpirometryRecord(true) }]}
                header="Delete this spirometry record?"
                message="Are you sure you want to delete this spirometry record?" />
            <IonItemSliding>
                <IonItem onClick={() => setShouldToggleEditingModal(true)} button lines="full">
                    <IonLabel className="none-flex">
                        {peakFlow.when.toLocaleTimeString().slice(0, 5)}
                    </IonLabel>
                    <IonLabel className="margin-left-10px">
                        {peakFlow.comment ? peakFlow.comment : "Peak flow read"}
                    </IonLabel>
                    <IonNote className={isPlatform("android") || isPlatform("desktop") ? "note-android" : ""} color={badgeColor}>
                        {peakFlow.peakFlow}
                    </IonNote>
                </IonItem>

                <IonItemOptions onIonSwipe={() => setShouldDisplaySpirometryDeletionAlert(true)}>
                    <IonItemOption color="danger" expandable>
                        Delete
                    </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>
        </>
    );
}