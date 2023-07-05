import React, { forwardRef, PropsWithChildren, useEffect, useRef, useState } from "react";

import { IonButton, IonButtons, IonDatetime, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";

import { calendarOutline } from "ionicons/icons";

import "../index.css";

import useStateContext from "../functions/useStateContext";

// tslint:disable-next-line:interface-name
interface Props {
    datePicker?: boolean;
}

export default forwardRef<HTMLIonHeaderElement, PropsWithChildren<Props>>(({ children, datePicker }, ref) => {
    const [shouldToggleDayPicker, setShouldToggleDayPicker] = useState(false);
    // tslint:disable-next-line:typedef
    const datePickerRef = useRef<HTMLIonDatetimeElement>();
    const { selectedDate, updateSelectedDate } = useStateContext();
    // tslint:disable-next-line:typedef
    const today = new Date();
    const [hidePicker, setHidePicker] = useState(true);

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

    useEffect(() => {
        let id = setInterval(() => {
            if (ref) {
                setHidePicker((ref as React.MutableRefObject<HTMLIonHeaderElement>).current.classList.contains("header-collapse-condense-inactive"));
            }
        }, 1);

        return () => clearInterval(id);
    }, []);

    return (
        <>
            <IonHeader ref={ref} translucent>
                <IonToolbar>
                    <IonTitle>
                        {children}
                    </IonTitle>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    {datePicker && (
                        <IonButtons style={hidePicker ? {"display": "none"} : {}} slot="primary">
                            <IonButton onClick={() => setShouldToggleDayPicker(true)}>
                                <IonIcon slot="icon-only" icon={calendarOutline} />
                            </IonButton>
                        </IonButtons>
                    )}
                </IonToolbar>
            </IonHeader>
            {datePicker && (
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
});