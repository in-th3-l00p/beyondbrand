import express from 'express';
import brandService from '../service/brandService';

const router = express.Router();

// Get a brand by ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const brand = await brandService.get(id);
        if (!brand) {
            return res.status(404).send({ message: 'Brand not found' });
        }
        res.json(brand);
    } catch (error) {
        next(error);
    }
});

// Create a new brand
router.post('/', async (req, res, next) => {
    try {
        const { name, description } = req.body;
        const newBrand = await brandService.create(name, description);
        res.status(201).json(newBrand);
    } catch (error) {
        next(error);
    }
});

// Update an existing brand
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, website, logo } = req.body;
        const updatedBrand = await brandService.update(id, name, description, website, logo);
        res.json(updatedBrand);
    } catch (error) {
        next(error);
    }
});

// Delete a brand
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await brandService.delete(id);
        res.status(204).send();  // No Content
    } catch (error) {
        next(error);
    }
});

export default router;
