export interface ItemType {
    name:string;
    id:number;
    data:{};
}

export const NavItems = [
    {
        name: 'HOME',
        id: 0,
        data: {
            help: false,
            page: 3,
            info: 11,
            vis: [true, false, false, false]
        },
    },
    {
        name: 'VERSLAG',
        id: 1,
        data: {
            help: false,
            page: 3,
            info: 12,
            vis: [false, true, false, false]
        },
    },
    {
        name: 'KAART',
        id: 1,
        data: {
            help: true,
            page: 3,
            info: 13,
            vis: [false, false, true, false]
        },
    },
    {
        name: 'FOTO`S',
        id: 2,
        data: {
            help: true,
            page: 3,
            info: 14,
            vis: [false, false, false, true]
        },
    },
];

export const BackFoto = [
    {   id:     0,
        name:   'url(./resources/acht/0.jpg)',
        width: 2500,
        height: 1666
    },
    {   id:     1,
        name:   'url(./resources/acht/1.jpg)',
        width: 2500,
        height: 1584
    },
    {   id:     2,
        name:   'url(./resources/acht/2.jpg)',
        width: 2500,
        height: 1667
    },
    {   id:     3,
        name:   'url(./resources/acht/3.jpg)',
        width: 2500,
        height: 1667
    },
    {   id:     4,
        name:   'url(./resources/acht/4.jpg)',
        width: 2500,
        height: 1667
    },
    {   id:     5,
        name:   'url(./resources/acht/5.jpg)',
        width: 2500,
        height: 1667
    },
    {   id:     6,
        name:   'url(./resources/acht/6.jpg)',
        width: 2599,
        height: 1406
    },
    {   id:     7,
        name:   'url(./resources/acht/7.jpg)',
        width: 2500,
        height: 1213
    },
    {   id:     8,
        name:   'url(./resources/plaster.jpg)',
        width: 1014,
        height: 768
    },
    {   id:     9,
        name:   'url(./resources/achtergrond02.jpg)',
        width: 1600,
        height: 899
    },
    {   id:     10,
        name:   'url(./resources/achtergrond03.jpg)',
        width: 674,
        height: 350
    },

];

export enum KEY_CODE {
    LEFT_ARROW = 37,
    UP_ARROW = 38,
    RIGHT_ARROW = 39,
    DOWN_ARROW = 40
}

