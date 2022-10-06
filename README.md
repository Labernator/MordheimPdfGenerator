# MordheimPdfGenerator
A mobile application that turns a yaml file into a pdf

# Getting Started with Mordheim Pdf Generator

You can open the pdf generator here:
https://labernator.github.io/MordheimPdfGenerator

Simply upload a .yml file and it will generate a nice .pdf file you for printing.

# What kind of fresh hell is this yaml/yml stuff you talk about?

You will need a .yml file to use the generator.

The structure of the yml file is outlined below.
Examples are provided with every property.
If you want to see real examples, then have a look at the test files  [test files](https://github.com/Labernator/MordheimPdfGenerator/tree/master/src/data/testFiles) provided with this repo

###Top level properties

####warband
`Scourge of Sylvania (Undead)`

contains the name of your warband and the type of warband. The type is stated in brackets.

####gc
`30`

states the amount of gold coins your warband currently has in its treasury. The value has to be an integer.


####shards
`3`

states the amount of wyrdstone shards your warband currently has in its treasury. The value has to be an integer.


####heros

full description of every hero in your warband. Every hero is described using the following properties.

#####hero
`Isabella von Carstein (Vampire) [23XP]`

Contains the name of the Hero, followed by its class and the current experience.
The class is stated in round brackets, the experience is stated in square brackets. Experience is an integer value followed by the string <i>XP</i>

#####stats
`M5, WS4, BS4, S4, T4, W2, I5, A2, Ld8, Sv3+`

Contains a value for all characteristics.
The characteristics are separated by comma and have an acronym.
All characteristics are integer values except for the Save characteristic. It is either a minus sign or an integer followed by a plus sign.
Valid Characteristics are:
- Movement (**M**)
- Weapons Skill (**WS**)
- Ballistic Skill (**BS**)
- Strength (**S**)
- Toughness (**T**)
- Wounds (**W**)
- Initiative (**I**)
- Attacks (**A**)
- Leadership (**Ld**)
- Save (**Sv**)

>Note: All characteristics have to be present. None may be omitted!

#####weapons
`Crossbow, Hammer, Dagger`

Contains all weapons the hero carries. The weapons are separated by comma. Can be used to describe special items as well.
#####armour
`Heavy Armour, Helmet, Rabbits Foot`

Contains all armour pieces the hero carries. The armours are separated by comma. Can be used to describe special items as well.
#####rules
`Leader, Fearsome, Immune to Psychology, Immune to Poison, No Pain`

Contains all rules the hero has to adhere to . The rules are separated by comma.
#####skilllists
`Strength, Academic, Combat, Speed`

Contains all skill lists the hero may use. The skill lists are separated by comma.

####henchmen

full description of every henchmen group in your warband. Every henchmen group is described using the following properties.

#####group
`True Believers (2 Flagellants) [0XP]`

Contains the name of the group, followed by the number of henchmen in this group, its class and the current experience.
The number of henchmen and the class are stated together in round brackets, the experience is stated in square brackets. Experience is an integer value followed by the string <i>XP</i>

#####stats
`M5, WS4, BS4, S4, T4, W2, I5, A2, Ld8, Sv3+`

Contains a value for all characteristics.
The characteristics are separated by comma and have an acronym.
All characteristics are integer values except for the Save characteristic. It is either a minus sign or an integer followed by a plus sign.
Valid Characteristics are:
- Movement (**M**)
- Weapons Skill (**WS**)
- Ballistic Skill (**BS**)
- Strength (**S**)
- Toughness (**T**)
- Wounds (**W**)
- Initiative (**I**)
- Attacks (**A**)
- Leadership (**Ld**)
- Save (**Sv**)

>Note: All characteristics have to be present. None may be omitted!

#####weapons
`Crossbow, Hammer, Dagger`

Contains all weapons the henchmen carry. The weapons are separated by comma. Can be used to describe special items as well.
#####armour
`Heavy Armour, Helmet, Rabbits Foot`

Contains all armour pieces the henchmen carry. The armours are separated by comma. Can be used to describe special items as well.
#####rules
`Leader, Fearsome, Immune to Psychology, Immune to Poison, No Pain`

Contains all rules the henchmen have to adhere to . The rules are separated by comma.