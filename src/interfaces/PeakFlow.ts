import SelectedRadio from "../types/SelectedRadio";

import CommonDataProps from "./CommonDataProps";

// tslint:disable-next-line:interface-name
export default interface PeakFlow extends CommonDataProps {
    peakFlow: number;
    medication: SelectedRadio;
}