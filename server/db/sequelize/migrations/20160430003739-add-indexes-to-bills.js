module.exports = {
  up(queryInterface) {
    queryInterface.addIndex(
      'Bills',
      ['debtorId']
    ).then(() => {
      queryInterface.addIndex(
        'Bills',
        ['creditorId']
      );
    });
  },

  down(queryInterface) {
    queryInterface.removeIndex('Bills', ['debtorId']).then(() => {
      queryInterface.removeIndex('Bills', ['creditorId']);
    });
  }
};
