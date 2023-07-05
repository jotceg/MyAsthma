import { ReactNode, useMemo, useRef } from "react";

import { IonContent, IonList, IonPage } from "@ionic/react";

import AddDiaryRecord from "../components/AddDiaryRecord";
import PeakFlowRecord from "../components/PeakFlowRecord";
import RescueTreatmentUse from "../components/RescueTreatmentUse";
import SymptomsRecord from "../components/SymptomsRecord";
import PageHeader from "../components/PageHeader";
import PlaceholderText from "../components/PlaceholderText";
import CollapsibleLargeTitle from "../components/CollapsibleLargeTitle";

import PeakFlow from "../interfaces/PeakFlow";
import IRescueTreatmentUse from "../interfaces/RescueTreatmentUse";
import ISymptomsRecord from "../interfaces/SymptomsRecord";

import useStateContext from "../functions/useStateContext";

import "../index.css";

// tslint:disable-next-line:typedef
export default function() {
    const { peakFlows, symptomsRecords, rescueTreatmentUses, selectedDate } = useStateContext();
    // tslint:disable-next-line:typedef
    const list = useMemo<Array<IRescueTreatmentUse | PeakFlow | ISymptomsRecord>>(() =>
    ([...peakFlows, ...rescueTreatmentUses, ...symptomsRecords]
        .filter(value => value.when.getFullYear() === selectedDate.getFullYear() &&
            value.when.getMonth() === selectedDate.getMonth() &&
            value.when.getDate() === selectedDate.getDate())
        .sort((a, b) => b.when.getTime() - a.when.getTime())),
        [peakFlows, rescueTreatmentUses, symptomsRecords, selectedDate]);
    const pageHeaderRef = useRef<HTMLIonHeaderElement>();

    return (
        <IonPage>
            <PageHeader ref={pageHeaderRef as unknown as React.Ref<HTMLIonHeaderElement>} datePicker>
                Diary ({selectedDate.toLocaleDateString()})
            </PageHeader>
            <IonContent fullscreen>
                <CollapsibleLargeTitle shouldDisplayDatePicker>
                    Diary ({selectedDate.toLocaleDateString()})
                </CollapsibleLargeTitle>
                {
                    list.length > 0 ? (
                        <IonList className="ion-no-padding">
                            {list.map(value => {
                                    let item: ReactNode;
                                    // tslint:disable-next-line:curly
                                    if ((value as any).peakFlow) item = <PeakFlowRecord key={value.id} peakFlow={value as PeakFlow} />;
                                    // tslint:disable-next-line:curly
                                    if ((value as any).doses)
                                        item = <RescueTreatmentUse key={value.id} rescueTreatmentUse={value as IRescueTreatmentUse} />;
                                    // tslint:disable-next-line:curly
                                    if ((value as any).cough !== undefined && (value as any).cough !== null)
                                        item = <SymptomsRecord key={value.id} symptomsRecord={value as ISymptomsRecord} />;

                                    return item;
                                })
                            }
                        </IonList>
                    ) : <PlaceholderText title="No data added!" text="Fill the daily dairy by clicking the button below!" />
                }
                <AddDiaryRecord />
            </IonContent>
        </IonPage>
    );
}