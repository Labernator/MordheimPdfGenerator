import React from "react";
import { isHero, WarbandState } from "../utilities/Interfaces";
import { getWatermark } from "../utilities/RosterUtils";
import { RulesSection } from "./RulesSection";
import { SkillListsSection } from "./SkillListsSection";
import { StatsAndEquipmentSection } from "./StatsAndEquipmentSection";
import { UnitHeader } from "./UnitHeader";
import { WarbandHeader } from "./WarbandHeader";

export const PdfRoster = ({ state }: { state: WarbandState }) => {
    const heroes = state.heros || [];
    const henchmen = state.henchmen || [];
    const units = [...heroes, ...henchmen];
    if (heroes.length + henchmen.length > 7) {
        return <React.Fragment>
            <div className="pdf-container" style={{ top: "-10000px" }} id="pdf-roster">
                <img src={getWatermark(state.warband)} className="pdf-watermark"></img>
                <WarbandHeader warband={state} />
                {heroes.map((unit) =>
                    <div className="unit-container">
                        <UnitHeader Unit={unit} />
                        <StatsAndEquipmentSection Unit={unit} />
                        <SkillListsSection Unit={unit} />
                        <RulesSection Unit={unit} />
                    </div>)}
                <div style={{ marginLeft: "1rem" }}>* the [ +* ] notation behind the experience states how many xp you need to gain the next advance</div>
            </div>
            <div className="pdf-container" style={{ top: "-7000px" }} id="pdf-roster2">
                <img src={getWatermark(state.warband)} className="pdf-watermark"></img>
                <WarbandHeader warband={state} />
                {henchmen.map((unit) =>
                    <div className="unit-container">

                        <UnitHeader Unit={unit} />
                        <StatsAndEquipmentSection Unit={unit} />
                        <RulesSection Unit={unit} />
                    </div>)}
                <div style={{ marginLeft: "1rem" }}>* the [ +* ] notation behind the experience states how many xp you need to gain the next advance</div>
            </div>
        </React.Fragment>;
    }
    return <React.Fragment>
        <div className="pdf-container" style={{ top: "-10000px" }} id="pdf-roster">
            <img src={getWatermark(state.warband)} className="pdf-watermark"></img>
            <WarbandHeader warband={state} />
            {units.map((unit) =>
                <div className="unit-container">

                    <UnitHeader Unit={unit} />
                    <StatsAndEquipmentSection Unit={unit} />
                    {isHero(unit) ? <SkillListsSection Unit={unit} /> : undefined}
                    <RulesSection Unit={unit} />
                </div>)}
            <div style={{ marginLeft: "1rem" }}>* the [ +* ] notation behind the experience states how many xp you need to gain the next advance</div>
        </div>

    </React.Fragment>;
};
