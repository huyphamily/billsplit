import Models from '../models';
const Bill = Models.Bill;
const User = Models.User;

/**
 * List
 */
export function all(req, res) {
  return User.findOne({
    where: { id: req.user.id },
    include: [
      { model: Bill, as: 'Debts' },
      { model: Bill, as: 'Credits' }
    ]
  }).then(({ Credits, Debts }) => {
    return res.json({ Credits, Debts });
  }).catch((err) => {
    console.log(err);
    return res.status(500).send('Error in first query');
  });
}

/**
 * Add a Bill
 * will create a non-operative user if user does not exist
 */
function createBill(req, res, debtorId) {
  return Bill.create({
    description: req.body.description,
    amount: req.body.amount,
    creditorId: req.user.id,
    debtorId
  }).then(() => {
    return res.status(200).send('OK');
  }).catch((err) => {
    console.log(err);
    return res.status(400).send(err);
  });
}

export function add(req, res) {
  return User.findOne({ where: { email: req.body.email } }).then((existingUser) => {
    if (existingUser !== null) {
      return createBill(req, res, existingUser.id);
    }
    const newUser = User.build({
      email: req.body.email,
      operative: false
    });

    return newUser.save.then(() => {
      return createBill(req, res, newUser.id);
    }).catch((err) => {
      console.log(err);
      return res.status(500).send('We have failed to save your bill');
    });
  }).catch((err) => {
    console.log(err);
    return res.status(500).send('Error in first query');
  });
}


/**
 * Update a Bill
 */
export function update(req, res) {
  const query = { id: req.params.id };
  const params = {
    description: req.body.description,
    amount: req.body.amount
  };

  return Bill.update(params, { where: query }).then(() => {
    res.status(200).send('Updated successfully');
  }).catch((err) => {
    console.log(err);
    res.status(500).send('We failed to save for some reason');
  });
}

/**
 * Remove a Bill
 */
export function remove(req, res) {
  const query = { id: req.params.id };

  return Bill.destroy({ where: query }).then(() => {
    res.status(200).send('Removed Successfully');
  }).catch((err) => {
    console.log(err);
    res.status(500).send('We failed to delete for some reason');
  });
}

export default {
  all,
  add,
  update,
  remove
};
