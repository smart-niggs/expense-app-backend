const express = require('express');
const router = express.Router();

const models = require("../database/models");

router.post('/', create);
router.get('/', getAll);


module.exports = router;


async function create (req, res) {
  try {
    const expense = await models.Expense.create(req.body);
    return res.status(201).json({status: 'success', data: 
      expense 
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


async function getAll (req, res) {
  try {
    let page  = req.params.page ? req.params.page : 1;
    let limit  = req.params.limit ? req.params.limit : 10;
    // if(!page)
    const total = await models.Expense.count({ where: { userId: req.user.sub }});
    const expenses = await models.Expense.findAll({
      offset: (page - 1) * limit, limit: limit,
      where: { userId: req.user.sub },
      include: [
        {
          model: models.User,
          as: "user",
          attributes: [ 'email']
        }
      ],
      attributes: ['value', 'reason', 'vat', ['createdAt', 'date']]
    });
    // paging: { total: result.total, current_page_total: result.count, current_page: result.page, per_page: result.limit, pages: result.pages },

    paging = { total, current_page_total: expenses.length, current_page: page, per_page: limit, pages: Math.ceil(total/limit) }
    return res.status(200).json({ status: 'success', paging,  data: expenses });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};