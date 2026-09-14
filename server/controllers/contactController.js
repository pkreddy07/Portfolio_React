import * as contactModel from '../models/contactModel.js';

export const handleContactSubmit = async (req, res, next) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const savedSubmission = await contactModel.saveSubmission({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    res.status(201).json({
      message: 'Contact form submitted successfully',
      submission: savedSubmission,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactSubmissions = async (req, res, next) => {
  try {
    const submissions = await contactModel.getAllSubmissions();
    res.status(200).json(submissions);
  } catch (error) {
    next(error);
  }
};
