const Loan = require('../models/loan');
const Book = require('../models/book');
const User = require('../models/user');

const createLoan = async (req, res) => {
  const { userId, bookId, startDate, endDate } = req.body;
  try {
    const user = await User.findByPk(userId);
    const book = await Book.findByPk(bookId);

    if (!user || !book) {
      return res.status(400).json({ message: 'Invalid user or book' });
    }

    const loansCount = await Loan.count({ where: { userId } });
    if (loansCount >= 2) {
      return res.status(400).json({ message: 'User can borrow only 2 books' });
    }

    const loan = await Loan.create({ userId, bookId, startDate, endDate });
    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating loan', error });
  }
};

const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll({
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: Book, attributes: ['id', 'title', 'author'] },
      ],
    });
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans', error });
  }
};

const getLoanById = async (req, res) => {
  const { id } = req.params;
  try {
    const loan = await Loan.findByPk(id, {
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] },
        { model: Book, attributes: ['id', 'title', 'author'] },
      ],
    });

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan', error });
  }
};

const updateLoan = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.body;

  try {
    const loan = await Loan.findByPk(id);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    await loan.update({ startDate, endDate });
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating loan', error });
  }
};

const deleteLoan = async (req, res) => {
  const { id } = req.params;

  try {
    const loan = await Loan.findByPk(id);

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    await loan.destroy();
    res.status(200).json({ message: 'Loan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting loan', error });
  }
};

module.exports = { createLoan, getAllLoans, getLoanById, updateLoan, deleteLoan };
