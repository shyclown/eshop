app.service('jDB',function(){
  this.pages = [
    { id: 1, name: 'PAGE'}
  ]
  this.items = [
    { id: 1, name: 'PHP', description: 'item description'},
    { id: 2, name: 'JAVASCRIPT', description: 'item description'},
    { id: 3, name: 'CSS', description: 'item description'},
    { id: 4, name: 'HTML', description: 'item description'},
    { id: 5, name: 'ANGULARJS', description: 'item description'},
    { id: 6, name: 'AUTOCAD', description: 'item description'},
    { id: 7, name: 'BLENDER', description: 'item description'},
    { id: 8, name: 'SKETCHUP', description: 'item description'},
    { id: 9, name: 'PHOTOSHOP', description: 'item description'},
    { id: 10, name: 'INDESIGN', description: 'item description'},
    { id: 11, name: 'SUBSTANCE PAINTER', description: 'item description'},
    { id: 12, name: 'SUBSTANCE DESIGNER', description: 'item description'},
    { id: 13, name: 'NODEJS', description: 'item description'}

  ];
  this.item_price = [
    { id: 1, item_id: 1, price: 15 },
    { id: 2, item_id: 1, price: 15 },
    { id: 3, item_id: 1, price: 8 },
    { id: 4, item_id: 1, price: 8 },
    { id: 5, item_id: 1, price: 12 },
    { id: 6, item_id: 1, price: 20 },
    { id: 7, item_id: 1, price: 15 },
    { id: 8, item_id: 1, price: 15 },
    { id: 9, item_id: 1, price: 15 },
    { id: 10, item_id: 1, price: 15 },
    { id: 11, item_id: 1, price: 15 },
    { id: 12, item_id: 1, price: 15 },
    { id: 13, item_id: 1, price: 15 }
  ];
  this.categories = [
    { id: 1, name: 'Backend', description: 'Description' },
    { id: 2, name: 'Frontend', description: 'Description' },
    { id: 3, name: 'Graphic design', description: 'Description' },
    { id: 4, name: 'Architecture', description: 'Description' },
    { id: 5, name: 'Web Design', description: 'Description' },
    { id: 6, name: 'Game development', description: 'Description' },
    { id: 7, name: '3D Modeling', description: 'Description' }
  ];
  this.item_category = [
    { id: 1, category_id: 1, item_id: 1 },
    { id: 2, category_id: 1, item_id: 13 },
    { id: 3, category_id: 2, item_id: 5 },
    { id: 4, category_id: 2, item_id: 4 },
    { id: 5, category_id: 2, item_id: 3 },
    { id: 6, category_id: 3, item_id: 9 },
    { id: 7, category_id: 3, item_id: 10 },
    { id: 8, category_id: 4, item_id: 6 },
    { id: 9, category_id: 4, item_id: 8 },
    { id: 10, category_id: 5, item_id: 4 },
    { id: 11, category_id: 5, item_id: 3 },
    { id: 12, category_id: 5, item_id: 9 },
    { id: 13, category_id: 6, item_id: 7 },
    { id: 14, category_id: 6, item_id: 11 },
    { id: 15, category_id: 6, item_id: 12 },
    { id: 16, category_id: 4, item_id: 7 },
    { id: 17, category_id: 1, item_id: 2 },
    { id: 17, category_id: 2, item_id: 2 },
    { id: 18, category_id: 7, item_id: 7 },
    { id: 19, category_id: 7, item_id: 8 }
  ];

});
