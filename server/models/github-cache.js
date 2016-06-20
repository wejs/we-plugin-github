/**
 * github-cache
 *
 * @module      :: Model
 * @description :: github-cache model
 *
 */

module.exports = function githubCacheModel(we) {
  var model = {
    definition: {
      name: {
        type: we.db.Sequelize.STRING,
        allowNull: false,
        skipSanitizer: true,
        get: function()  {
          if (this.getDataValue('name'))
            return JSON.parse( this.getDataValue('name') );
          return {};
        },
        set: function(object) {
          if (typeof object == 'object') {
            this.setDataValue('name', JSON.stringify(object));
          } else {
            throw new Error('invalid error in githubCache name value: ', object);
          }
        }
      },
      response: {
        type: we.db.Sequelize.TEXT('medium'),
        allowNull: false,
        skipSanitizer: true,
        get: function()  {
          if (this.getDataValue('response'))
            return JSON.parse( this.getDataValue('response') );
          return {};
        },
        set: function(object) {
          if (typeof object == 'object') {
            this.setDataValue('response', JSON.stringify(object));
          } else {
            throw new Error('invalid error in githubCache response value: ', object);
          }
        }
      },
      expires: {
        type: we.db.Sequelize.BIGINT
      }
    },
    options: {
      // title field, for default title record pages
      // titleField: 'title',

      // Class methods for use with: we.db.models.[yourmodel].[method]
      classMethods: {},
      // record method for use with record.[method]
      instanceMethods: {},
      // Sequelize hooks
      // See http://docs.sequelizejs.com/en/latest/api/hooks
      hooks: {
        beforeCreate: function(r, opts, done) {
          r.expires = (new Date().getTime() + we.config.github.expireDate);
          done();
        }
      }
    }
  };

  return model;
};