import { CreationObject } from "../components/useCreation";

export const race: CreationObject[] = [
    {
        id: 'race',
        content: 'Hippo',
        value: 'strong muscular hippo,',

    },
    {
        id: 'race',
        content: 'Elephant',
        value: 'old war elephant,',
    },
    {
        id: 'race',
        content: 'Human',
        value: 'beautiful human,',
    },
    {
        id: 'race',
        content: 'Orc',
        value: 'ugly Orc,',
    },

];

export const sexes: CreationObject[] = [
    {
        id: 'sex',
        content: 'male',
        value: 'male,',

    },
    {
        id: 'sex',
        content: 'female',
        value: 'female,',

    },
    {
        id: 'sex',
        content: 'n/a',
        value: '',

    }
];

export const classes: CreationObject[] = [
    {
        id: 'class',
        content: 'mage',
        value: 'mage in silk clothing and pointy hat,',

    },
    {
        id: 'class',
        content: 'warrior',
        value: 'warrior with detailed iron armour,',

    },
    {
        id: 'class',
        content: 'noble',
        value: 'king with crown,',

    },
    {
        id: 'class',
        content: 'assassin',
        value: 'deadly assassin with a linen hooded cloak with forehead jewelry and headband,',

    },
];

export const objects = [race, sexes, classes]
