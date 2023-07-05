import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { homeOutline, analyticsOutline, alarmOutline } from "ionicons/icons";

import { Redirect, Route } from "react-router-dom";

import Diary from "./Diary";
import Reminders from "./Reminders";
import Stats from "./Stats";

export default () => (
  <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet id="main-content">
        <Route exact path="/diary" component={Diary} />
        <Route exact path="/stats" component={Stats} />
        <Route exact path="/reminders" component={Reminders} />
        <Redirect exact path="/" to="/diary" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton href="/reminders" tab="reminders">
          <IonIcon icon={alarmOutline} />
          <IonLabel>
            Reminders
          </IonLabel>
        </IonTabButton>
        <IonTabButton href="/diary" tab="diary">
          <IonIcon icon={homeOutline} />
          <IonLabel>
            Diary
          </IonLabel>
        </IonTabButton>
        <IonTabButton href="/stats" tab="stats">
          <IonIcon icon={analyticsOutline} />
          <IonLabel>
            Stats
          </IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonReactRouter>
);