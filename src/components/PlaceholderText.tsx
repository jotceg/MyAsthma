import { ReactNode } from "react";

// tslint:disable:interface-name
// tslint:disable:semicolon

interface Props {
    title: ReactNode | string;
    text: ReactNode | string;
};

export default ({ title, text }: Props) => (
    <div className="placeholder-text">
        <strong style={{fontSize: "20px", lineHeight: "26px"}}>
            {title}
        </strong>
        <p style={{fontSize: "16px", lineHeight: "22px", color: "#8c8c8c", marginBottom: 0, marginTop: 4}}>
            {text}
        </p>
    </div>
);