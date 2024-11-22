const products = [
  // Sofa products
  {
    id: '1',
    name: 'Bellagio 3 seater sofa',
    price: '89,950,000 ₫',
    type: 'Sofa',
    color: [
      {
        color_id: '1',
        color_name: 'brown',
        picture: require('../productPicture/bellagio_brown.jpg')
      },
      {
        color_id: '2',
        color_name: 'green',
        picture: require('../productPicture/bellagio_green.jpg')
      }
    ]
  },
  {
    id: '2',
    name: 'Amsterdam corner sofa',
    price: '182,490,000 ₫',
    type: 'Sofa',
    color: [
      {
        color_id: '1',
        color_name: 'green',
        picture: require('../productPicture/amsterdam_green.jpg')
      },
      {
        color_id: '2',
        color_name: 'blue',
        picture: require('../productPicture/amsterdam_blue.jpg')
      }
    ]
  },
  {
    id: '3',
    name: 'Salamanca corner sofa',
    price: '188,600,000 ₫',
    type: 'Sofa',
    color: [
      {
        color_id: '1',
        color_name: 'tan',
        picture: require('../productPicture/salamanca_sand.jpg')
      },
      {
        color_id: '2',
        color_name: 'dimgrey',
        picture: require('../productPicture/salamanca_grey.jpg')
      }
    ]
  },
  {
    id: '4',
    name: 'Southampton 2,5 seater sofa',
    price: '141,140,000 ₫',
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
    price: '94,490,000 ₫',
    type: 'Sofa',
    color: [
      {
        color_id: '1',
        color_name: 'lightskyblue',
        picture: require('../productPicture/carmo_blue.jpg')
      },
      {
        color_id: '2',
        color_name: 'saddlebrown',
        picture: require('../productPicture/carmo_brown.jpg')
      },
      {
        color_id: '3',
        color_name: 'darkblue',
        picture: require('../productPicture/carmo_dblue.jpg')
      }
    ]
  },

  // Bed products
  {
    id: '6',
    name: 'Lugano bed',
    price: '25,590,000',
    type: 'Bed',
    color: [
      {
        color_id: '1',
        color_name: 'white',
        picture: require('../productPicture/lugano_white.jpg')
      },
      {
        color_id: '2',
        color_name: 'grey',
        picture: require('../productPicture/lugano_grey.jpg')
      }
    ]
  },
  {
    id: '7',
    name: 'Lugano storage bed',
    price: '38,490,000',
    type: 'Bed',
    color: [
      {
        color_id: '1',
        color_name: 'white',
        picture: require('../productPicture/lugano_storage_white.jpg')
      }
    ]
  },
  {
    id: '8',
    name: 'Arlington bed',
    price: '34,990,000',
    type: 'Bed',
    color: [
      {
        color_id: '1',
        color_name: 'saddlebrown',
        picture: require('../productPicture/arlington_bed_brown.jpg')
      },
      {
        color_id: '2',
        color_name: 'lightgrey',
        picture: require('../productPicture/arlington_bed_grey.jpg')
      },
      {
        color_id: '3',
        color_name: 'black',
        picture: require('../productPicture/arlington_bed_black.jpg')
      }
    ]
  },
  {
    id: '9',
    name: 'Fusion day bed',
    price: '25,000,000',
    type: 'Bed',
    color: [
      {
        color_id: '1',
        color_name: 'white',
        picture: require('../productPicture/fusionday_white.jpg')
      }
    ]
  },
  {
    id: '10',
    name: 'Austin bed',
    price: '56,030,000',
    type: 'Bed',
    color: [
      {
        color_id: '1',
        color_name: 'indianred',
        picture: require('../productPicture/austin_bed_red.jpg')
      },
      {
        color_id: '2',
        color_name: 'goldenrod',
        picture: require('../productPicture/austin_bed_gold.jpg')
      }
    ]
  },

  // Table products
  {
    id: '11',
    name: 'Ottawa table',
    price: '75,490,000',
    type: 'Table',
    color: [
      {
        color_id: '1',
        color_name: 'saddlebrown',
        picture: require('../productPicture/ottawa_brown.jpg')
      }
    ]
  },
  {
    id: '12',
    name: 'Lugo coffee table',
    price: '29,590,000',
    type: 'Table',
    color: [
      {
        color_id: '1',
        color_name: 'bisque',
        picture: require('../productPicture/lugo_beige.jpg')
      },
      {
        color_id: '2',
        color_name: 'silver',
        picture: require('../productPicture/lugo_silver.jpg')
      }
    ]
  },
  {
    id: '13',
    name: 'Billund round table',
    price: '26,490,000',
    type: 'Table',
    color: [
      {
        color_id: '1',
        color_name: 'white',
        picture: require('../productPicture/billund_white.jpg')
      }
    ]
  },
  {
    id: '14',
    name: 'Fiorentina extendable table',
    price: '92,690,000',
    type: 'Table',
    color: [
      {
        color_id: '1',
        color_name: 'dimgrey',
        picture: require('../productPicture/fiorentina_grey.jpg')
      },
      {
        color_id: '2',
        color_name: 'floralwhite',
        picture: require('../productPicture/fiorentina_white.jpg')
      }
    ]
  },
  {
    id: '15',
    name: 'Augusta extendable table',
    price: '118,900,000',
    type: 'Table',
    color: [
      {
        color_id: '1',
        color_name: 'black',
        picture: require('../productPicture/augusta_black.jpg')
      },
      {
        color_id: '2',
        color_name: 'saddlebrown',
        picture: require('../productPicture/augusta_brown.jpg')
      },
      {
        color_id: '3',
        color_name: 'silver',
        picture: require('../productPicture/augusta_silver.jpg')
      }
    ]
  },

  // Chair products
  {
    id: '16',
    name: 'Hamilton dining chair',
    price: '4,751,500',
    type: 'Chair',
    color: [
      {
        color_id: '1',
        color_name: 'black',
        picture: require('../productPicture/hamilton_dining_chair_black.jpg')
      }
    ]
  },
  {
    id: '17',
    name: 'Ottawa chair',
    price: '5,601,500',
    type: 'Chair',
    color: [
      {
        color_id: '1',
        color_name: 'black',
        picture: require('../productPicture/ottawa_chair_black.jpg')
      }
    ]
  },
  {
    id: '18',
    name: 'Hauge dining chair',
    price: '6,366,500',
    type: 'Chair',
    color: [
      {
        color_id: '1',
        color_name: 'white',
        picture: require('../productPicture/hauge_dining_chair_white.jpg')
      }
    ]
  },
  {
    id: '19',
    name: 'Princeton chair',
    price: '8,049,500',
    type: 'Chair',
    color: [
      {
        color_id: '1',
        color_name: 'beige',
        picture: require('../productPicture/princeton_chair_beige.jpg')
      },
      {
        color_id: '2',
        color_name: 'maroon',
        picture: require('../productPicture/princeton_chair_maroon.jpg')
      }
    ]
  },
  {
    id: '20',
    name: 'Seoul dining chair',
    price: '17,501,500',
    type: 'Chair',
    color: [
      {
        color_id: '1',
        color_name: 'darkblue',
        picture: require('../productPicture/seoul_dining_chair_blue.jpg')
      },
      {
        color_id: '2',
        color_name: 'darkolivegreen',
        picture: require('../productPicture/seoul_dining_chair_green.jpg')
      }
    ]
  }
];

export default products;
