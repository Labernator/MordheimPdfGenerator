export interface WarbandState {
    warband: string;
    campaign: number;
    gc: number;
    shards: number;
    objective: string;
    alignment: string;
    heros?: HerosEntity[];
    henchmen?: HenchmenEntity[];
    notes?: string;
}

export interface HerosEntity {
    hero: string;
    stats: string;
    weapons: string;
    armour?: string;
    rules?: string;
    skilllists: string;
}

export interface HenchmenEntity {
    group: string;
    stats: string;
    weapons?: string;
    armour?: string;
    rules?: string;
}

export interface Stats {
    M: string;
    WS: string;
    BS: string;
    S: string;
    T: string;
    W: string;
    I: string;
    A: string;
    LD: string;
    Sv: string;
}

export interface SkillsEntity {
    name: string;
    type: string;
    text: string;
    prerequisite?: Prerequisite;
}

export interface Prerequisite {
    type: string;
    condition: number | string;
    lookup?: string;
}

export interface SpellsEntity {
    name: string;
    type: string;
    castingCost: string;
    text: string;
}

export interface EquipmentEntity {
    MeleeWeapons?: MeleeWeaponsEntity[];
    MissileWeapons?: MissileWeaponsEntity[];
    Armour?: ArmourEntity[];
    Miscallaneous?: MiscallaneousEntity[];
}
export interface MeleeWeaponsEntity {
    type: string;
    cost: number;
    rarity: number;
    weaponType: string;
    rules?: string[];
    strengthModifier: string;
}
export interface MissileWeaponsEntity {
    type: string;
    cost: number;
    rarity: number;
    weaponType: string;
    rules?: string[];
    strength: number | string;
    range: number;
    variableCost?: string;
}
export interface ArmourEntity {
    type: string;
    cost: number;
    rarity: number;
    armourType: string;
    rules?: string[];
    armour: number;
    variableCost?: string;
}
export interface MiscallaneousEntity {
    type: string;
    cost: number;
    variableCost?: string;
    rarity: number;
    genus: string;
    rules?: string[];
    text?: string;
}

export interface EquipmentRulesEntity {
    name: string;
    text: string;
}

// Type guards
export const isHero = (unit: HenchmenEntity | HerosEntity): unit is HerosEntity => (unit as HerosEntity).hero !== undefined;
export const isSpell = (skillOrSpell: SkillsEntity | SpellsEntity): skillOrSpell is SpellsEntity => (skillOrSpell as SpellsEntity).castingCost !== undefined;
export const isArmour = (equipment: ArmourEntity | MiscallaneousEntity | MissileWeaponsEntity | MeleeWeaponsEntity): equipment is ArmourEntity => (equipment as ArmourEntity).armourType !== undefined;
export const isMisc = (equipment: ArmourEntity | MiscallaneousEntity | MissileWeaponsEntity | MeleeWeaponsEntity): equipment is MiscallaneousEntity => (equipment as MiscallaneousEntity).genus !== undefined;
export const isMelee = (equipment: ArmourEntity | MiscallaneousEntity | MissileWeaponsEntity | MeleeWeaponsEntity): equipment is MeleeWeaponsEntity => (equipment as MeleeWeaponsEntity).strengthModifier !== undefined;
export const isMissile = (equipment: ArmourEntity | MiscallaneousEntity | MissileWeaponsEntity | MeleeWeaponsEntity): equipment is MissileWeaponsEntity => (equipment as MissileWeaponsEntity).range !== undefined;
