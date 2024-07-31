const itemModel = require("../models/itemModel");

// Get items
const getItemController = async (req, res) => {
  try {
    const items = await itemModel.find();
    res.status(200).json(items); // Send JSON response
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Error fetching items', error: error.message });
  }
};

// Add item
const addItemController = async (req, res) => {
  try {
    const newItem = new itemModel(req.body);
    await newItem.save();
    res.status(201).json({ message: 'Item Created Successfully!' });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(400).json({ message: 'Error creating item', error: error.message });
  }
};

// Update item
const editItemController = async (req, res) => {
  try {
    const { itemId, ...updateData } = req.body;
    if (!itemId) {
      return res.status(400).json({ message: 'Item ID is required' });
    }

    const updatedItem = await itemModel.findOneAndUpdate({ _id: itemId }, updateData, {
      new: true,
      runValidators: true // Ensure validators are run during update
    });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item Updated', item: updatedItem });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(400).json({ message: 'Error updating item', error: error.message });
  }
};

module.exports = { getItemController, addItemController, editItemController };
