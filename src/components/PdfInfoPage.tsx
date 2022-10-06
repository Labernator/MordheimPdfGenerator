import React from "react";
import { findEquipment, findSkills, getEquipmentRules } from "../utilities/InfoUtils";
import { ArmourEntity, isArmour, isMelee, isMisc, isMissile, isSpell, MeleeWeaponsEntity, MiscallaneousEntity, MissileWeaponsEntity, SkillsEntity, SpellsEntity, WarbandState } from "../utilities/Interfaces";
import { WarbandHeader } from "./WarbandHeader";

export const PdfInfoPage = ({ state }: { state: WarbandState }) => {
    const heroes = state.heros || [];
    const henchmen = state.henchmen || [];
    const units = [...heroes, ...henchmen];
    const spells = findSkills(units).filter((entity) => entity && isSpell(entity)) as SpellsEntity[];
    const skills = findSkills(units).filter((entity) => entity && !isSpell(entity)) as SkillsEntity[];
    const equipment = findEquipment(units);
    return <React.Fragment>
        <div className="pdf-container" id="pdf-info-page" style={{ top: "-10000px" }}>
            <WarbandHeader warband={state} />
            <div className="unit-container">
                <NotesSection notes={state.notes} />
                <SkillsSection skills={skills} />
                <SpellsSection spells={spells} />
                <EquipmentSection equipment={equipment} />
            </div>
        </div>
    </React.Fragment>;
};

const NotesSection = ({ notes }: { notes: string | undefined }) => {
    if (!notes) {
        return null;
    }
    return <React.Fragment>
        <div className="large-header">Notes</div>
        <div className="text-with-margins">{notes}</div>
    </React.Fragment>;
};

const SkillsSection = ({ skills }: { skills: SkillsEntity[] }) => <React.Fragment>
    {skills.length > 0 ? <div className="large-header">Skills and other Rules</div> : undefined}
    {skills.map((entity) => <div className="info-page-flexbox">
        <div className="bold-text-with-margins">{entity.type === "Generic" ? `${entity.name}` : `${entity.name} (${entity.type})`}</div>
        <div className="text-with-margins">{entity.text}</div>
    </div>)}
</React.Fragment>;

const SpellsSection = ({ spells }: { spells: SpellsEntity[] }) => <React.Fragment>
    {spells.length > 0 ? <div className="large-header">Spells</div> : undefined}
    {spells.map((entity) => <div className="info-page-flexbox">
        <div className="bold-text-with-margins">{`${entity.name} (${entity.type}) [${entity.castingCost}]`}</div>
        <div className="text-with-margins">{entity.text}</div>
    </div>)}
</React.Fragment>;

const EquipmentSection = ({ equipment }: { equipment: Array<MeleeWeaponsEntity | MissileWeaponsEntity | ArmourEntity | MiscallaneousEntity> }) => <React.Fragment>
    {equipment.length > 0 ? <div className="large-header">Equipment</div> : undefined}
    {equipment.map((entity) => {
        if (isArmour(entity)) {
            return <div className="info-page-flexbox">
                <div className="bold-text-with-margins">{`${entity.type}`}</div>
                <div className="text-with-margins"><div>{`Add +${entity.armour} to your armour save.`}</div>{getEquipmentRules(entity.rules || []).map((rule) => <div>{rule.text}</div>)}</div>
            </div>;
        }
        if (isMelee(entity)) {
            return <div className="info-page-flexbox">
                <div className="bold-text-with-margins">{`${entity.type} (Strength ${entity.strengthModifier || "+0"})`}</div>
                <div className="text-with-margins">{getEquipmentRules(entity.rules || []).map((rule) => <div>{rule.text}</div>)}</div>
            </div>;
        }
        if (isMisc(entity)) {
            return <div className="info-page-flexbox">
                <div className="bold-text-with-margins">{`${entity.type}`}</div>
                {entity.rules ? <div className="text-with-margins">{getEquipmentRules(entity.rules).map((rule) => <div>{rule.text}</div>)}</div> : <div className="text-with-margins">{entity.text}</div>}
            </div>;
        }
        if (isMissile(entity)) {
            return <div className="info-page-flexbox">
                <div className="bold-text-with-margins">{`${entity.type} (Strength ${entity.strength}, Range ${entity.range})`}</div>
                <div className="text-with-margins">{getEquipmentRules(entity.rules || []).map((rule) => <div>{rule.text}</div>)}</div>
            </div>;
        }
        return undefined;
    }
    )}
</React.Fragment>;
