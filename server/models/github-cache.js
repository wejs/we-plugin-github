/**
 * github-cache
 *
 * @module      :: Model
 * @description :: github-cache model
 *
 */

module.exports = function githubCacheModel(we) {
  const model = {
    definition: {
      name: {
        type: we.db.Sequelize.JSON,
        allowNull: false,
        skipSanitizer: true
      },
      response: {
        type: we.db.Sequelize.JSON,
        allowNull: false,
        skipSanitizer: true
      },
      expires: {
        type: we.db.Sequelize.BIGINT
      }
    },
    options: {
      enableAlias: false,
      tableName: 'github_caches',

      // Class methods for use with: we.db.models.[yourmodel].[method]
      classMethods: {},
      // record method for use with record.[method]
      instanceMethods: {},
      // Sequelize hooks
      // See http://docs.sequelizejs.com/en/latest/api/hooks
      hooks: {
        beforeCreate(r) {
          r.expires = (new Date().getTime() + we.config.github.expireDate);
          return r;
        }
      }
    }
  };

  return model;
};