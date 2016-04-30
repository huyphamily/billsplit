export default (sequelize, DataTypes) => {
  const Bill = sequelize.define('Bill', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(13,4), // eslint-disable-line
      allowNull: false
    },
    debtorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    creditorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Bill.belongsTo(models.User, {
          as: 'debtor',
          foreignKey: 'debtorId'
        });
        Bill.belongsTo(models.User, {
          as: 'creditor',
          foreignKey: 'creditorId'
        });
      }
    }
  });

  return Bill;
};
