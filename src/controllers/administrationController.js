import Administration from '../models/administration.js';
import User from '../models/user.js';

export const createAdministration = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    let token = ''
    if (authHeader && authHeader.startsWith('Bearer ')) token = authHeader.split(' ')[1];

    const user = await User.getUserByToken(token);
    const userId = user.user_id;

    const { title, serviceType, serviceCategory, adminId, schedule, status } = req.body;
    const newAdministration = new Administration(title, serviceType, serviceCategory, userId, adminId, schedule, status);   
    await newAdministration.save();
    res.status(201).json({ status: 'success', message: 'Administration created successfully' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

export const getAllAdministrations = async (_, res) => {
  try {
    const administrations = await Administration.getAll();
    res.status(200).json({ status: 'success', data: administrations });
  } catch (error) {
    res.status(500).json({ status: 'fail', error: error.message });
  }
};

export const getAdministrationById = async (req, res) => {
  const { id } = req.params;
  try {
    const administration = await Administration.getById(id);
    res.status(200).json({ status: 'success', data: administration });
  } catch (error) {
    res.status(404).json({ status: 'fail', error: error.message });
  }
};

export const updateAdministration = async (req, res) => {
  const { id } = req.params;
  try {
    const authHeader = req.headers['authorization'];
    let token = ''
    if (authHeader && authHeader.startsWith('Bearer ')) token = authHeader.split(' ')[1];

    const user = await User.getUserByToken(token);
    const userId = user.user_id;

    const { title, serviceType, serviceCategory, adminId, schedule, status } = req.body;
    const updatedAdministration = new Administration(title, serviceType, serviceCategory, userId, adminId, schedule, status);
    await updatedAdministration.update(id);
    res.status(200).json({ status: 'success', message: 'Administration updated successfully' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

export const deleteAdministration = async (req, res) => {
  const { id } = req.params;
  try {
    await Administration.delete(id);
    res.status(200).json({ status: 'success', message: 'Administration deleted successfully' });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};
