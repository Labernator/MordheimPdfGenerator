import React from "react";
import { HenchmenEntity, HerosEntity } from "../utilities/Interfaces";

export const RulesSection = ({ Unit }: { Unit: HerosEntity | HenchmenEntity }) => {
    const rules = Unit.rules;
    return rules ? <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="bold-text-with-margins">Rules: </div>
        <div className="text-with-margins">{rules}</div>
    </div> : <React.Fragment />;
};
