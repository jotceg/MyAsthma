// tslint:disable-next-line:max-line-length
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon, IonModal, IonButton, IonInput, useIonRouter } from "@ionic/react";

import { addOutline, medicalOutline } from "ionicons/icons";

import { useState } from "react";

import useStateContext from "../functions/useStateContext";

import ModalHeader from "./ModalHeader";
import SolidTreatmentsModal from "./SolidTreatmentsModal";

export default () => {
    const [shouldDisplaySolidTreatmentsModal, setShouldDisplaySolidTreatmentsModal] = useState(false);

    return (
        <>
            <SolidTreatmentsModal shouldShowModal={shouldDisplaySolidTreatmentsModal} setShouldShowModal={setShouldDisplaySolidTreatmentsModal} />
            <IonMenu contentId="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            Menu
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList className="ion-no-padding">
                        <IonItem
                            onClick={() => setShouldDisplaySolidTreatmentsModal(true)}
                            button
                            className="ion-no-padding"
                            detail={false}>
                            <IonLabel className="ion-margin-start">
                                Solid treatments
                            </IonLabel>
                            <IonIcon icon={medicalOutline} />
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonMenu>
        </>
    );
};