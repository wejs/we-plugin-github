/**
 * Github Model
 *
 * @module      :: Model
 * @description :: github model
 *
 */
module.exports = function Model(we) {
  var model = {
    definition: {
      name: {type: we.db.Sequelize.STRING(1500)},
      description: {type: we.db.Sequelize.TEXT},
      expireDate: {type: we.db.Sequelize.DATE}
    },
    options: {
      classMethods: {},
      instanceMethods: {},
      hooks: {}
    }
  };

  return model;
};