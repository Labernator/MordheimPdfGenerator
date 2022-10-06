import { HenchmenEntity, HerosEntity, isHero } from "../utilities/Interfaces";
import { extractClass, extractExperience, extractName, getNextLevelUp } from "../utilities/RosterUtils";

export const UnitHeader = ({ Unit }: { Unit: HerosEntity | HenchmenEntity }) =>
    <div className="unit-layout">
        <div style={{ display: "flex" }}>
            <div className="bold-text-with-margins">Name: </div>
            <div className="text-with-margins">{extractName(Unit)}</div>
        </div>
        <div style={{ display: "flex" }}>
            <div className="bold-text-with-margins">Type: </div>
            <div className="text-with-margins">{extractClass(Unit)}</div>
        </div>
        {isHero(Unit) ? <div style={{ display: "flex" }}>
            <div className="bold-text-with-margins">Experience: </div>
            <div className="text-with-margins">{`${extractExperience(Unit)} [ +${getNextLevelUp(extractExperience(Unit)) - extractExperience(Unit)} ]`}</div>
        </div> : <div></div>}
    </div>;
