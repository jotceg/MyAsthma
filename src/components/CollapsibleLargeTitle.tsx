import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

import { IonButton, IonButtons, IonDatetime, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/react";

import useStateContext from "../functions/useStateContext";

import { addOutline, calendarOutline } from "ionicons/icons";

// tslint:disable-next-line: interface-name
interface Props {
    shouldDisplayDatePicker?: boolean;
}

// tslint:disable-next-line:typedef
export default function({ children, shouldDisplayDatePicker }: PropsWithChildren<Props>) {
    const [shouldToggleDayPicker, setShouldToggleDayPicker] = useState(false);
    // tslint:disable-next-line:typedef
    const datePickerRef = useRef<HTMLIonDatetimeElement>();
    const { selectedDate, updateSelectedDate } = useStateContext();
    // tslint:disable-next-line:typedef
    const today = new Date();

    // tslint:disable-next-line:typedef
    function onDateSelected(date: string) {
        updateSelectedDate(new Date(date));
        setShouldToggleDayPicker(false);
    }

    useEffect(() => {
        if (shouldToggleDayPicker) {
            (datePickerRef.current as HTMLIonDatetimeElement).open();
        }
    }, [shouldToggleDayPicker]);

    return (
        <>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">
                        {children}
                    </IonTitle>
                    {shouldDisplayDatePicker && (
                        <IonButtons slot="primary">
                            <IonButton onClick={() => setShouldToggleDayPicker(true)}>
                                <IonIcon slot="icon-only" icon={calendarOutline} />
                            </IonButton>
                        </IonButtons>
                    )}
                </IonToolbar>
            </IonHeader>
            {shouldDisplayDatePicker && (
                <IonDatetime
                    className="no-date-visible"
                    pickerFormat="DD:MMM:YYYY"
                    value={selectedDate.toISOString()}
                    onIonChange={event => onDateSelected(event.detail.value as string)}
                    onIonCancel={() => setShouldToggleDayPicker(false)}
                    ref={datePickerRef as unknown as React.Ref<HTMLIonDatetimeElement>}
                    max={today.toISOString()} />
            )}
        </>
    );
}