import { Ref, useRef } from "react";

import { IonContent, IonList, IonPage, IonRouterLink } from "@ionic/react";

import CollapsibleLargeTitle from "../components/CollapsibleLargeTitle";
import PageHeader from "../components/PageHeader";
import PlaceholderText from "../components/PlaceholderText";

import useStateContext from "../functions/useStateContext";
import SolidTreatmentReminder from "../components/SolidTreatmentReminder";

export default () => {
    const pageHeaderRef = useRef<HTMLIonHeaderElement>();
    const { solidTreatments } = useStateContext();

    return (
        <IonPage>
            <PageHeader ref={pageHeaderRef as unknown as Ref<HTMLIonHeaderElement>} datePicker>
                Reminders
            </PageHeader>
            <IonContent fullscreen>
                <CollapsibleLargeTitle shouldDisplayDatePicker>
                    Reminders
                </CollapsibleLargeTitle>
                {solidTreatments.length > 0 ? (
                    <IonList className="ion-no-padding">
                        {solidTreatments.map(solidTreatment => <SolidTreatmentReminder key={solidTreatment.id} solidTreatment={solidTreatment} />)}
                    </IonList>
                ) : (
                    <PlaceholderText
                        title="All treatments taken!"
                        text={
                            <>You can fill the daily dairy <IonRouterLink routerLink="/diary" routerDirection="forward">here</IonRouterLink></>
                        } />
                )}
            </IonContent>
        </IonPage>
    );
};