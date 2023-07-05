// tslint:disable:semicolon
// tslint:disable:typedef

import { IonApp } from "@ionic/react";

import Tabs from "./pages/Tabs";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import "./index.css";

import { useEffect } from "react";

import useStateContext from "./functions/useStateContext";

import Menu from "./components/Menu";

export default function() {
  const { peakFlows, rescueTreatmentUses, symptomsRecords, solidTreatments } = useStateContext();

  useEffect(() => {
    localStorage.setItem("peakFlows", JSON.stringify(peakFlows));
  }, [peakFlows]);

  useEffect(() => {
    localStorage.setItem("rescueTreatmentUses", JSON.stringify(rescueTreatmentUses));
  }, [rescueTreatmentUses]);

  useEffect(() => {
    localStorage.setItem("symptomsRecords", JSON.stringify(symptomsRecords))
  }, [symptomsRecords]);

  useEffect(() => {
    localStorage.setItem("solidTreatments", JSON.stringify(solidTreatments));
  }, [solidTreatments])

  return (
    <IonApp>
      <Menu />
      <Tabs />
    </IonApp>
  );
};