import * as Equipment from "../data/Equipment.json";
import * as EquipmentRules from "../data/EquipmentRules.json";
import * as Skills from "../data/Skills.json";
import * as Spells from "../data/Spells.json";
import { ArmourEntity, EquipmentEntity, EquipmentRulesEntity, HenchmenEntity, HerosEntity, MeleeWeaponsEntity, MiscallaneousEntity, MissileWeaponsEntity, SkillsEntity, SpellsEntity } from "./Interfaces";

const AllSkills = Skills.Skills as SkillsEntity[];
const AllSpells = Spells.Spells as SpellsEntity[];
const AllEquipment = Equipment.equipment as EquipmentEntity[];
const AllArmour = AllEquipment.filter((eq) => eq.Armour)[0].Armour as ArmourEntity[];
const AllMeleeWeapons = AllEquipment.filter((eq) => eq.MeleeWeapons)[0].MeleeWeapons as MeleeWeaponsEntity[];
const AllMissileWeapons = AllEquipment.filter((eq) => eq.MissileWeapons)[0].MissileWeapons as MissileWeaponsEntity[];
const AllMiscallaneous = AllEquipment.filter((eq) => eq.Miscallaneous)[0].Miscallaneous as MiscallaneousEntity[];

export const findSkills = (units: Array<HerosEntity | HenchmenEntity>): Array<SpellsEntity | SkillsEntity | undefined> => {
    const unitsWithRules = units.filter((unit) => unit.rules);
    const uniqueRules = [...new Set(unitsWithRules.reduce((acc, unit) => {
        if (unit.rules) {
            const regex = new RegExp(/(?<!\(),(?![\w\s]*[)])/);
            const unitRules = unit.rules.split(regex).map((rule) => rule.trim());
            return [...acc, ...unitRules];
        }
        return acc;
    }, [] as string[]))];
    // tslint:disable: no-console
    const skills = uniqueRules.reduce((acc, rule) => {
        const foundSkill = AllSkills.find((skill) => skill.name === rule);
        if (foundSkill) {
            return [...acc, foundSkill];
        }
        if (rule.indexOf("Wizard") !== -1) {
            const classStart = rule.lastIndexOf("(");
            const classEnd = rule.lastIndexOf(")");
            const spellName = rule.substring(classStart + 1, classEnd);
            const allSpells = spellName.split(",").map((entry) => entry.trim());
            const mappedSpells = allSpells.reduce((accum, element) => {
                const foundSpell = AllSpells.find((spell) => spell.name === element);
                if (foundSpell) {
                    return [...accum, foundSpell];
                }
                return accum;
            }, [] as SpellsEntity[]);
            return [...acc, ...mappedSpells];
        }
        if (rule.indexOf("Hatred") !== -1) {
            return [...acc, AllSkills.find((skill) => skill.name === "Hatred") as SkillsEntity];
        }
        return acc;
    }, [] as Array<SpellsEntity | SkillsEntity>);
    console.log(skills);
    return skills;
};

export const findEquipment = (units: Array<HerosEntity | HenchmenEntity>): Array<MeleeWeaponsEntity | MissileWeaponsEntity | ArmourEntity | MiscallaneousEntity> => {
    const unitsWithEquipment = units.filter((unit) => unit.weapons || unit.armour);
    const uniqueEquipment = [...new Set(unitsWithEquipment.reduce((acc, unit) => {
        let unitWeapons: string[] = [];
        let unitArmour: string[] = [];
        if (unit.weapons) {
            unitWeapons = unit.weapons.split(",").map((weapon) => weapon.trim());
        }
        if (unit.armour) {
            unitArmour = unit.armour.split(",").map((armour) => armour.trim());
        }
        return [...acc, ...unitWeapons, ...unitArmour];
    }, [] as string[]))];
    const foundArmour = uniqueEquipment.map((equi) => {
        const foundEquipment = AllArmour.find((equipment) => equipment.type === equi.trim());
        if (foundEquipment) {
            return foundEquipment;
        }
        return undefined;
    }).filter((equi) => equi) as ArmourEntity[];
    const melee = uniqueEquipment.map((equi) => {
        const foundEquipment = AllMeleeWeapons.find((equipment) => equipment.type === equi.trim());
        if (foundEquipment) {
            return foundEquipment;
        }
        return undefined;
    }).filter((equi) => equi) as MeleeWeaponsEntity[];
    const missile = uniqueEquipment.map((equi) => {
        const foundEquipment = AllMissileWeapons.find((equipment) => equipment.type === equi.trim());
        if (foundEquipment) {
            return foundEquipment;
        }
        return undefined;
    }).filter((equi) => equi) as MissileWeaponsEntity[];
    const misc = uniqueEquipment.map((equi) => {
        const foundEquipment = AllMiscallaneous.find((equipment) => equipment.type === equi.trim());
        if (foundEquipment) {
            return foundEquipment;
        }
        return undefined;
    }).filter((equi) => equi) as MiscallaneousEntity[];
    return [...foundArmour, ...melee, ...missile, ...misc];
};

export const getEquipmentRules = (rules: string[]): EquipmentRulesEntity[] => {
    const mappedRules = rules.map((ruleString) => EquipmentRules.rules.find((rule) => rule.name === ruleString));
    return mappedRules.filter((entry) => entry) as EquipmentRulesEntity[];
};
