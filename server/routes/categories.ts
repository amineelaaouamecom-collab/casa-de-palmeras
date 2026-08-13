import express from 'express';
import Category from '../models/Category.ts';

const router = express.Router();

// GET - Toutes les catégories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST - Créer une catégorie
router.post('/', async (req, res) => {
  try {
    // We expect { id, label, icon }
    // We map id to _id in schema
    const newCategory = new Category({
      _id: req.body.id,
      label: req.body.label,
      icon: req.body.icon
    });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Catégorie non trouvée' });
      return;
    }
    res.json({ message: 'Catégorie supprimée' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
