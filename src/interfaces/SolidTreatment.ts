import CommonDataProps from "./CommonDataProps";

export default interface SolidTreatment extends Pick<CommonDataProps, "id"> {
    name: string;
    activeSubstance: string;
}