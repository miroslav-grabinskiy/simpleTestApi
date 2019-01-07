const Sequelize = require("sequelize");
const BaseMysql = require("./BaseMysql");

const tableName = "themes";
const allowedVotedResults = ["yes", "no"];

class Theme extends BaseMysql {
  constructor() {
    super();

    this._schema = this._sequelize.define("Theme", {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING(1024),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Required"
          },
          is: {
            args: ["^[a-z]+$", 'i'],
            msg: "Only letters allowed"
          },
          len: {
            args: [0, 1024],
            msg: "Name length cannot be greater than 1024"
          }
        }
      },
      yes: {
        type: Sequelize.DataTypes.BIGINT,
        defaultValue: 0
      },
      no: {
        type: Sequelize.DataTypes.BIGINT,
        defaultValue: 0
      }
    }, {
      tableName: tableName,
      timestamps: false
    });
  }

  async voteTheme(themeId, voteResult) {
    if (!allowedVotedResults.includes(voteResult)) {
      return Promise.reject("Internal Server Error");
    }

    return this._schema.update({
      [voteResult]: Sequelize.literal(`${voteResult} + 1`)
    }, {
      where: {
        id: themeId
      }
    });
  }
}

module.exports = Theme;
