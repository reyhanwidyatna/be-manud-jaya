import Financial from '../models/financial.js';
import User from '../models/user.js';

export const createFinancial = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    let token = ''
    if (authHeader && authHeader.startsWith('Bearer ')) token = authHeader.split(' ')[1];

    const user = await User.getUserByToken(token);
    const userId = user.user_id;

    const { title, description, amount, date } = req.body;
    const financial = new Financial(title, description, amount, date, userId);
    await financial.save();
    res.status(201).json({ status: 'success', message: 'Financial information created successfully' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

export const getAllFinancial = async (_, res) => {
  try {
    const financials = await Financial.getAll();
    res.status(200).json({ status: 'success', data: financials });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getFinancialById = async (req, res) => {
  try {
    const financialId = req.params.id;
    const financial = await Financial.getById(financialId);
    res.status(200).json({ status: 'success', data: financial });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error.message });
  }
};

export const updateFinancial = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    let token = ''
    if (authHeader && authHeader.startsWith('Bearer ')) token = authHeader.split(' ')[1];

    const user = await User.getUserByToken(token);
    const userId = user.user_id;

    const { title, description, amount, date } = req.body;
    const financialId = req.params.id;
    const financial = new Financial(title, description, amount, date, userId);
    await financial.update(financialId);
    res.status(200).json({ status: 'success', message: 'Financial information updated successfully' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

export const deleteFinancial = async (req, res) => {
  try {
    const financialId = req.params.id;
    await Financial.delete(financialId);
    res.status(204).json({ status: 'success', message: 'Financial information deleted successfully' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};
