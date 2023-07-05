import { isPlatform, IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, IonButton } from "@ionic/react";

import { chevronBackOutline } from "ionicons/icons";

import { PropsWithChildren } from "react";

// tslint:disable-next-line:interface-name
interface Props {
    backButton?: boolean;
    dismissModal?: () => void;
}

export default ({ children, backButton, dismissModal }: PropsWithChildren<Props>) => (
    <IonHeader translucent>
        <IonToolbar className={isPlatform("ios") ? "toolbar-ios" : ""}>
            {backButton === true && isPlatform("android") && (
                <IonButtons slot="start">
                    <IonButton onClick={dismissModal}>
                        <IonIcon icon={chevronBackOutline} />
                    </IonButton>
                </IonButtons>
            )}
            <IonTitle size="large">
                {children}
            </IonTitle>
        </IonToolbar>
    </IonHeader>
);