import React from "react";
import { HenchmenEntity, HerosEntity } from "../utilities/Interfaces";
import { getStatLine } from "../utilities/RosterUtils";

export const StatsAndEquipmentSection = ({ Unit }: { Unit: HerosEntity | HenchmenEntity }) => {
    const statLine = getStatLine(Unit.stats);
    const WeaponsPart = () => {
        const weapons = Unit.weapons;
        return weapons ? <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="bold-text-with-margins">Weapons: </div>
            <div className="text-with-margins">{weapons}</div>
        </div> : <React.Fragment />;
    };
    const ArmourPart = () => {
        const armour = Unit.armour;
        return armour ? <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="bold-text-with-margins">Armour:</div>
            <div className="text-with-margins">{armour}</div>
        </div> : <React.Fragment />;
    };

    return <div className="unit-layout" style={{ borderTop: "0.1rem solid" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
                {Object.entries(statLine).map(([key, value]) =>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className="bold-text-with-margins">{key}</div>
                        <div className="text-with-margins" style={{ textAlign: "center" }}>{value}</div>
                    </div>
                )}
            </div>
        </div>
        <WeaponsPart />
        <ArmourPart />
    </div >;
};
