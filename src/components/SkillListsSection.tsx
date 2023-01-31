import React from "react";
import { HerosEntity } from "../utilities/Interfaces";

export const SkillListsSection = ({ Unit }: { Unit: HerosEntity }) => {
    const skilllists = Unit.skilllists;
    return skilllists ? <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="bold-text-with-margins">Skill Lists: </div>
        <div className="text-with-margins">{skilllists}</div>
    </div> : <React.Fragment />;
};
