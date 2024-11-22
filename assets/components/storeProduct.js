const products = [
  // Sofa products
  {
    id: 1,
    name: 'Bellagio 3 seater sofa',
    price: '89,950,000',
    type: 'Sofa',
    color: [
      {
        color_id: 1,
        color_name: 'brown',
        picture: require('../productPicture/bellagio_brown.jpg')
      },
      {
        color_id: 2,
        color_name: 'green',
        picture: require('../productPicture/bellagio_green.jpg')
      }
    ],
    detail: 'The Bellagio 3-seater sofa is a statement piece that commands attention – compelling you to sit and experience its comfort. With its low-back design, clean lines and minimalist aesthetic, this modern sofa offers a tactile experience like no other.',
    comment: [
      {
        reviewId: 1,
        profilePic: 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg',
        rating: 4,
        userName: 'John Doe',
        date: '30 May, 2022',
        reviewDetail: 'Great product! Really enjoyed using it.',
      },
      {
        reviewId: 2,
        profilePic: 'https://png.pngtree.com/thumb_back/fw800/background/20230817/pngtree-lotus-flower-jpg-pink-lotus-flower-image_13023952.jpg',
        rating: 5,
        userName: 'Jane Smith',
        date: '18 Nov, 2022',
        reviewDetail: 'Absolutely loved it! Highly recommend.',
      },
      {
        reviewId: 3,
        profilePic: 'https://png.pngtree.com/thumb_back/fh260/background/20230519/pngtree-landscape-jpg-wallpapers-free-download-image_2573540.jpg',
        rating: 4,
        userName: 'Mike Johnson',
        date: '17 Nov, 2022',
        reviewDetail: 'It was okay, could be better.',
      },
    ]
  },
  {
    id: 2,
    name: 'Amsterdam corner sofa',
    price: '182,490,000',
    type: 'Sofa',
    color: [
      {
        color_id: 1,
        color_name: 'green',
        picture: require('../productPicture/amsterdam_green.jpg')
      },
      {
        color_id: 2,
        color_name: 'blue',
        picture: require('../productPicture/amsterdam_blue.jpg')
      }
    ],
    detail: 'The Amsterdam 3 seater sofa is your choice for the perfect, luxurious sofa statement.',
  },
  {
    id: 3,
    name: 'Salamanca corner sofa',
    price: '188,600,000',
    type: 'Sofa',
    color: [
      {
        color_id: 1,
        color_name: 'tan',
        picture: require('../productPicture/salamanca_sand.jpg')
      },
      {
        color_id: 2,
        color_name: 'dimgrey',
        picture: require('../productPicture/salamanca_grey.jpg')
      }
    ],
    detail: 'Embrace the art of lounging with Salamanca. A low \'floating\' sofa with a 1970s bohemian feel, this family lounge style is crafted with oversized proportions for serious comfort. Designed by Henrik Pedersen, it’s complete with super soft foam seats for great depth and moveable back cushions for modern flexibility. Available as a modular and freestanding design, add a sense of warmth to your living room with Salamanca.',
  },
  {
    id: 4,
    name: 'Southampton 2,5 seater sofa',
    price: '141,140,000',
    type: 'Sofa',
    color: [
      {
        color_id: 1,
        color_name: 'white',
        picture: require('../productPicture/southampton_white.jpg')
      }
    ],
    detail: 'The Southampton 2.5-seater sofa bed is the ultimate spot for relaxation and recreation, effortlessly combining esthetics and function to ensure that your guests feel at home. In addition to its modern quilted look and convenient storage provision, it features a small fabric skirt that hides the mechanism, for a flawless finish.',
  },
  {
    id: 5,
    name: 'Carmo corner sofa',
    price: '94,490,000',
    type: 'Sofa',
    color: [
      {
        color_id: 1,
        color_name: 'lightskyblue',
        picture: require('../productPicture/carmo_blue.jpg')
      },
      {
        color_id: 2,
        color_name: 'saddlebrown',
        picture: require('../productPicture/carmo_brown.jpg')
      },
      {
        color_id: 3,
        color_name: 'darkblue',
        picture: require('../productPicture/carmo_dblue.jpg')
      }
    ],
    detail: 'With its cubic Danish design expression, our signature Carmo sofa has been updated for a more refined look and enhanced comfort. Its free-standing design allows you to easily reorganise its modules at any time, for any occasion. Whether you are hosting guests or seeking a quiet moment, Carmo effortlessly adapts to your needs.',
  },

  // Bed products
  {
    id: 6,
    name: 'Lugano bed',
    price: '25,590,000',
    type: 'Bed',
    color: [
      {
        color_id: 1,
        color_name: 'white',
        picture: require('../productPicture/lugano_white.jpg')
      },
      {
        color_id: 2,
        color_name: 'grey',
        picture: require('../productPicture/lugano_grey.jpg')
      }
    ],
    detail: 'Let your body sink down and feel relaxation wash over you. Sleep like an angel in the elegant Lugano bed. Keeping a minimalist look with a clean wooden frame, this modern bed will bring a sense of calm and serenity to your bedroom.',
  },
  {
    id: 7,
    name: 'Lugano storage bed',
    price: '38,490,000',
    type: 'Bed',
    color: [
      {
        color_id: 1,
        color_name: 'white',
        picture: require('../productPicture/lugano_storage_white.jpg')
      }
    ],
    detail: 'Let your body sink down and feel relaxation wash over you. Sleep like an angel in the elegant Lugano bed. Keeping a minimalist look with a clean wooden frame, this modern bed will bring a sense of calm and serenity to your bedroom.',
  },
  {
    id: 8,
    name: 'Arlington bed',
    price: '34,990,000',
    type: 'Bed',
    color: [
      {
        color_id: 1,
        color_name: 'saddlebrown',
        picture: require('../productPicture/arlington_bed_brown.jpg')
      },
      {
        color_id: 2,
        color_name: 'lightgrey',
        picture: require('../productPicture/arlington_bed_grey.jpg')
      },
      {
        color_id: 3,
        color_name: 'black',
        picture: require('../productPicture/arlington_bed_black.jpg')
      }
    ],
    detail: 'Great support when sitting against the headboard and a soft landing make the Arlington bed an amazing addition to the bedroom. Just like the extension of a pillow, the soft headboard invites you in for a good night sleep.',
  },
  {
    id: 9,
    name: 'Fusion day bed',
    price: '25,000,000',
    type: 'Bed',
    color: [
      {
        color_id: 1,
        color_name: 'white',
        picture: require('../productPicture/fusionday_white.jpg')
      }
    ],
    detail: 'The fusion daybed is a beautiful and iconic piece of design furniture, mixing Japanese aesthetics with Danish functionality. The loose pillows can be arranged freely, giving you the opportunity to change the look according to usage situation, while slim legs and clean lines keep the style light.',
  },
  {
    id: 10,
    name: 'Austin bed',
    price: '56,030,000',
    type: 'Bed',
    color: [
      {
        color_id: 1,
        color_name: 'indianred',
        picture: require('../productPicture/austin_bed_red.jpg')
      },
      {
        color_id: 2,
        color_name: 'goldenrod',
        picture: require('../productPicture/austin_bed_gold.jpg')
      }
    ],
    detail: 'Be embraced by the cocooning effect of the Austin bed. The headboard not only looks great, it defines your space and offers a comfortable place to rest. Choose your personal upholstery and create your bedroom haven.',
  },

  // Table products
  {
    id: 11,
    name: 'Ottawa table',
    price: '75,490,000',
    type: 'Table',
    color: [
      {
        color_id: 1,
        color_name: 'saddlebrown',
        picture: require('../productPicture/ottawa_brown.jpg')
      }
    ],
    detail: 'Defined by smooth, rounded edges and a sensual minimalism, the Ottawa dining table creates a serene atmosphere in your dining room. Unique, twig-like legs inspired by nature accentuates the natural beauty of the oval Ottawa dining table. Need extra seats? Just pull out the clever, built-in extension leaf and go from a 4-person family meal to a dinner party seating 14.',
  },
  {
    id: 12,
    name: 'Kingston table',
    price: '36,990,000',
    type: 'Table',
    color: [
      {
        color_id: 1,
        color_name: 'brown',
        picture: require('../productPicture/kingston_table_brown.jpg')
      },
      {
        color_id: 2,
        color_name: 'saddlebrown',
        picture: require('../productPicture/kingston_table_sbrown.jpg')
      },
      {
        color_id: 3,
        color_name: 'lightgrey',
        picture: require('../productPicture/kingston_table_grey.jpg')
      }
    ],
    detail: 'A minimalistic look with maximum seating options. The Kingston table has an elegant expression that will be an eye-catcher in your dining room. The slender, conical legs add a playful look while ensuring ample legroom for your guests.',
  },
  {
    id: 13,
    name: 'Milano table',
    price: '33,990,000',
    type: 'Table',
    color: [
      {
        color_id: 1,
        color_name: 'saddlebrown',
        picture: require('../productPicture/milano_brown.jpg')
      }
    ],
    detail: 'The soft, curved lines of the Milano table are an elegant and modern interpretation of Scandinavian design. This table will instantly add character to your dining space and make any meal an experience. Thanks to the integrated extension leaf, you’ll have room for a few extra guests whenever you need.',
  },
  {
    id: 14,
    name: 'Bristol table',
    price: '15,990,000',
    type: 'Table',
    color: [
      {
        color_id: 1,
        color_name: 'black',
        picture: require('../productPicture/bristol_table_black.jpg')
      },
      {
        color_id: 2,
        color_name: 'brown',
        picture: require('../productPicture/bristol_table_brown.jpg')
      }
    ],
    detail: 'With its simple design and beautiful smooth finish, the Bristol table will quickly become the heart of your dining room. The visible structure of the wood offers a natural feel and adds character to your dining area. The option to extend the table makes it both practical and stylish.',
  },
  {
    id: 15,
    name: 'Lisbon table',
    price: '10,000,000',
    type: 'Table',
    color: [
      {
        color_id: 1,
        color_name: 'lightgrey',
        picture: require('../productPicture/lisbon_table_grey.jpg')
      }
    ],
    detail: 'Bring family and friends together around the Lisbon table. The unique conical legs add a modern feel and ensure plenty of legroom for everyone. With its slender proportions, this table is ideal for those who love the clean lines of Nordic design and the intimacy of a cosy meal.',
  },

  // Chair products
  {
    id: 16,
    name: 'Adelaide chair',
    price: '9,990,000',
    type: 'Chair',
    color: [
      {
        color_id: 1,
        color_name: 'black',
        picture: require('../productPicture/adelaide_black.jpg')
      },
      {
        color_id: 2,
        color_name: 'saddlebrown',
        picture: require('../productPicture/adelaide_brown.jpg')
      }
    ],
    detail: 'The iconic Adelaide chair offers exquisite comfort and style. The graceful lines and organic curves are combined with a unique swivel base, giving it a contemporary edge. The fully upholstered seat adds a touch of luxury and is available in a wide range of beautiful colours to match your personal style.',
  },
  {
    id: 17,
    name: 'Vienna chair',
    price: '9,990,000',
    type: 'Chair',
    color: [
      {
        color_id: 1,
        color_name: 'black',
        picture: require('../productPicture/vienna_black.jpg')
      }
    ],
    detail: 'The Vienna chair is a modern take on a classic design. Its elegant and simple lines make it a versatile piece that fits perfectly in any dining area. The comfortable seat and backrest are upholstered in high-quality fabric, available in various colours to suit your interior.',
  },
  {
    id: 18,
    name: 'Oslo chair',
    price: '9,990,000',
    type: 'Chair',
    color: [
      {
        color_id: 1,
        color_name: 'black',
        picture: require('../productPicture/oslo_black.jpg')
      },
      {
        color_id: 2,
        color_name: 'white',
        picture: require('../productPicture/oslo_white.jpg')
      }
    ],
    detail: 'The Oslo chair combines contemporary design with ultimate comfort. Its sleek lines and smooth curves create a stylish look, while the ergonomic design ensures maximum support. Available in various colours, the Oslo chair will be a striking addition to any dining room.',
  },
  {
    id: 19,
    name: 'Athens chair',
    price: '9,990,000',
    type: 'Chair',
    color: [
      {
        color_id: 1,
        color_name: 'saddlebrown',
        picture: require('../productPicture/athens_brown.jpg')
      }
    ],
    detail: 'Inspired by classic designs, the Athens chair features clean lines and a timeless aesthetic. Its solid construction and comfortable seating make it a perfect choice for any dining area. The high-quality upholstery is available in a range of colours to complement your décor.',
  },
  {
    id: 20,
    name: 'Berlin chair',
    price: '9,990,000',
    type: 'Chair',
    color: [
      {
        color_id: 1,
        color_name: 'black',
        picture: require('../productPicture/berlin_black.jpg')
      },
      {
        color_id: 2,
        color_name: 'grey',
        picture: require('../productPicture/berlin_grey.jpg')
      }
    ],
    detail: 'The Berlin chair is a blend of modern elegance and superior comfort. Its sleek design and high-quality materials make it a standout piece in any dining room. Choose from a variety of colours to match your personal style and create a cohesive look in your space.',
  }
];

export default products;
