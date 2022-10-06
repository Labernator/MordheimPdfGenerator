import { WarbandState } from "../utilities/Interfaces";
import { getRoutLimit, getWarbandRating } from "../utilities/RosterUtils";

export const WarbandHeader = ({ warband }: { warband: WarbandState }) =>
    <div className="unit-container" >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1rem" }}>

            <div style={{ display: "flex" }}>
                <div className="bold-text-with-margins">Warband Name: </div>
                <div className="bold-text-with-margins">{warband.warband}</div>
            </div>
            <div style={{ display: "flex" }}>
                <div className="bold-text-with-margins">Warband Rating: </div>
                <div className="bold-text-with-margins">{getWarbandRating(warband.heros || [], warband.henchmen || [])}</div>
            </div>
            <div style={{ display: "flex" }}>
                <div className="bold-text-with-margins">Rout Limit: </div>
                <div className="bold-text-with-margins">{getRoutLimit(warband.heros || [], warband.henchmen || [])}</div>
            </div>
            <div style={{ display: "flex" }}>
                <div className="bold-text-with-margins">Gold Coins: </div>
                <div className="bold-text-with-margins">{warband.gc}</div>
            </div>
            <div style={{ display: "flex" }}>
                <div className="bold-text-with-margins">Shards: </div>
                <div className="bold-text-with-margins">{warband.shards}</div>
            </div>
        </div>
    </div>;
