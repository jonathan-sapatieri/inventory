const models = [
  require('./providers_model'),
  require('./products_model'),
];

async function create_tables() {
  try {
    models.forEach(async model => {
      await model.sync();
    });
    console.log('Tables created succesfully!');
  } catch (error) {
    console.log('ERROR: ' + error.message);
  };
};

create_tables();