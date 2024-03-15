import Information from '../models/information.js';
import User from '../models/user.js';

export const createInformation = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    let token = ''
    if (authHeader && authHeader.startsWith('Bearer ')) token = authHeader.split(' ')[1];

    const user = await User.getUserByToken(token);
    const userId = user.user_id;

    const { title, description, date, image, informationType } = req.body;
    const newInformation = new Information(title, description, userId, date, image, informationType);
    
    await newInformation.save();
    res.status(201).json({ status: 'success', message: 'Information created successfully' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

export const getAllInformation = async (_, res) => {
  try {
    const information = await Information.getAll();
    res.status(200).json({ status: 'success', data: information });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
};

export const getInformationById = async (req, res) => {
  const { id } = req.params;
  try {
    const information = await Information.getById(id);
    res.status(200).json({ status: 'success', data: information });
  } catch (error) {
    res.status(404).json({ status: 'fail', error: error.message });
  }
};

export const updateInformation = async (req, res) => {
  const { id } = req.params;
  try {
    const authHeader = req.headers['authorization'];
    let token = ''
    if (authHeader && authHeader.startsWith('Bearer ')) token = authHeader.split(' ')[1];

    const user = await User.getUserByToken(token);
    const userId = user.user_id;

    const { title, description, date, image, informationType } = req.body;
    const updatedInformation = new Information(title, description, userId, date, image, informationType);
    
    await updatedInformation.update(id);
    res.status(200).json({ status: 'success', message: 'Information updated successfully' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

export const deleteInformation = async (req, res) => {
  const { id } = req.params;
  try {
    await Information.delete(id);
    res.status(200).json({ status: 'success', message: 'Information deleted successfully' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};
