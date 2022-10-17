import { MiddenheimPng, NurglePng, OnGPng, SigmarPng } from "../images";
import { HenchmenEntity, HerosEntity, isHero, Stats } from "./Interfaces";

export const extractExperience = (hero: HerosEntity): number => {
    const nameAndXp = hero.hero;
    const bracketStart = nameAndXp.lastIndexOf("[");
    const bracketEnd = nameAndXp.lastIndexOf("]");
    return parseInt(nameAndXp.substring(bracketStart + 1, bracketEnd), 10);
};

export const getNextLevelUp = (currentXp: number): number => {
    switch (currentXp) {
        case 0:
        case 1: return 2;
        case 2:
        case 3: return 4;
        case 4:
        case 5: return 6;
        case 6:
        case 7: return 8;
        case 8:
        case 9:
        case 10: return 11;
        case 11:
        case 12:
        case 13: return 14;
        case 14:
        case 15:
        case 16: return 17;
        case 17:
        case 18:
        case 19: return 20;
        case 20:
        case 21:
        case 22:
        case 23: return 24;
        case 24:
        case 25:
        case 26:
        case 27: return 28;
        case 28:
        case 29:
        case 30:
        case 31: return 32;
        case 32:
        case 33:
        case 34:
        case 35: return 36;
        case 36:
        case 37:
        case 38:
        case 39:
        case 40: return 41;
        default: return 0;
    }
};

export const extractName = (unit: HerosEntity | HenchmenEntity): string => {
    const nameAndXp = isHero(unit) ? unit.hero : unit.group;
    const classStart = nameAndXp.lastIndexOf("(");
    return nameAndXp.substring(0, classStart);
};

export const extractClass = (unit: HerosEntity | HenchmenEntity): string => {
    const nameAndXp = isHero(unit) ? unit.hero : unit.group;
    const classStart = nameAndXp.lastIndexOf("(");
    const classEnd = nameAndXp.lastIndexOf(")");
    return nameAndXp.substring(classStart + 1, classEnd);
};

export const extractHenchmenBodies = (henchmen: HenchmenEntity): number => {
    const nameAndXp = henchmen.group;
    const bracketStart = nameAndXp.lastIndexOf("(");
    const numberEnd = isNaN(parseInt(nameAndXp.charAt(bracketStart + 2), 10)) ? bracketStart + 2 : bracketStart + 3;
    const bodyCount = parseInt(nameAndXp.substring(bracketStart + 1, numberEnd), 10);
    return bodyCount;
};

export const isLargeHenchman = (henchmanGroup: HenchmenEntity): boolean => {
    const rules = henchmanGroup.rules;
    if (rules) {
        return rules.indexOf("Large") !== -1;
    }
    return false;
};

export const getWarbandRating = (heroes: HerosEntity[], henchmen: HenchmenEntity[]): number => {
    const experience = heroes.reduce((prev, curr) => prev + extractExperience(curr), 0) || 0;
    const heroBodies = heroes.length * 5;
    const henchmenBodies = henchmen.reduce((prev, curr) => prev + extractHenchmenBodies(curr) + (isLargeHenchman(curr) ? 3 : 0), 0) * 5;
    return experience + heroBodies + henchmenBodies;
};

const getWarbandSize = (heroes: HerosEntity[], henchmen: HenchmenEntity[]): number => heroes.length + henchmen.reduce((prev, curr) => prev + extractHenchmenBodies(curr), 0);
export const getRoutLimit = (heroes: HerosEntity[], henchmen: HenchmenEntity[]): number => Math.ceil(getWarbandSize(heroes, henchmen) / 4);

export const getStatLine = (statString: string): Stats => {
    const statArr = statString.split(",").map((subString) => subString.replace(/^\D+/g, ""));
    return {
        M: statArr[0],
        WS: statArr[1],
        BS: statArr[2],
        S: statArr[3],
        T: statArr[4],
        W: statArr[5],
        I: statArr[6],
        A: statArr[7],
        LD: statArr[8],
        Sv: statString.substring(statString.indexOf("Sv") + 2),
    };
};

export const getWatermark = (warbandName: string) => {
    const warbandType = warbandName.substring(warbandName.lastIndexOf("(") + 1, warbandName.lastIndexOf(")"));
    switch (warbandType) {
        case "Orcs & Goblins": return OnGPng;
        case "Sisters of Sigmar": return SigmarPng;
        case "Carnival of Chaos": return NurglePng;
        case "Mercenaries of Middenheim": return MiddenheimPng;
        default: return "";
    }
};
