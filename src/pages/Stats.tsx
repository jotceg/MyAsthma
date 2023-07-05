import PageHeader from "../components/PageHeader";
import PlaceholderText from "../components/PlaceholderText";
import CollapsibleLargeTitle from "../components/CollapsibleLargeTitle";

import { IonContent, IonPage, IonRouterLink } from "@ionic/react";

export default () => (
    <IonPage>
        <PageHeader>
            Stats
        </PageHeader>
        <IonContent fullscreen>
            <CollapsibleLargeTitle>
                Stats
            </CollapsibleLargeTitle>
            <PlaceholderText title="No data available!"
                text={<>You can fill the daily dairy <IonRouterLink routerLink="/diary" routerDirection="back">here</IonRouterLink></>} />
        </IonContent>
    </IonPage>
);