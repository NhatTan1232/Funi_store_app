const products = [
    {
        id: '1',  
        name: 'Bellagio 3 seater sofa',
        price: '89,950,000',
        type: 'Sofa',
        color: [
            {
                color_id: '1',
                color_name: 'brown',
                picture: require('../productPicture/bellagio_brown.jpg')
            },{
                color_id: '2',
                color_name: 'green',
                picture: require('../productPicture/bellagio_green.jpg')
            }
        ]
    },
    {
        id: '2',
        name: 'Amsterdam corner sofa',
        price: '182,490,000',
        type: 'Sofa',
        color: [
            {
                color_id: '1',
                color_name: 'green',
                picture: require('../productPicture/amsterdam_green.jpg')
            },{
                color_id: '2',
                color_name: 'blue',
                picture: require('../productPicture/amsterdam_blue.jpg')
            }
        ]
    },
    {
        id: '3',
        name: 'Salamanca corner sofa',
        price: '188,600,000',
        type: 'Sofa',
        color: [
            {
                color_id: '1',
                color_name: 'tan',
                picture: require('../productPicture/salamanca_sand.jpg')
            },{
                color_id: '2',
                color_name: 'dimgrey',
                picture: require('../productPicture/salamanca_grey.jpg')
            }
        ]
    },
    {
        id: '4',
        name: 'Southampton 2,5 seater sofa',
        price: '141,140,000',
        type: 'Sofa',
        color: [
            {
                color_id: '1',
                color_name: 'white',
                picture: require('../productPicture/southampton_white.jpg')
            }
        ]
    },
    {
        id: '5',
        name: 'Carmo corner sofa',
        price: '94,490,000',
        type: 'Sofa',
        color: [
            {
                color_id: '1',
                color_name: 'lightskyblue',
                picture: require('../productPicture/carmo_blue.jpg')
            },{
                color_id: '2',
                color_name: 'saddlebrown',
                picture: require('../productPicture/carmo_brown.jpg')
            },{
                color_id: '3',
                color_name: 'darkblue',
                picture: require('../productPicture/carmo_dblue.jpg')
            }
        ]
    },
];

export default products;
