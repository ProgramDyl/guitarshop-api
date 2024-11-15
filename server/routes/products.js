import express from 'express';

const router = express.Router();

router.get('/products', (req, res) => {
    res.send('All products');
});

router.get('/id', (req, res) => {
    res.send('Product by id');
});

export default router;

