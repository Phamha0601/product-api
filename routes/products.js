const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// CREATE - Thêm sản phẩm
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'pid đã tồn tại' });
    }
    res.status(400).json({ error: err.message });
  }
});

// READ ALL - Lấy tất cả sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE - Lấy sản phẩm theo pid
router.get('/:pid', async (req, res) => {
  try {
    const product = await Product.findOne({
      pid: Number(req.params.pid)
    });

    if (!product) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE - Cập nhật sản phẩm
router.put('/:pid', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { pid: Number(req.params.pid) },
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Xóa sản phẩm
router.delete('/:pid', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      pid: Number(req.params.pid)
    });

    if (!product) {
      return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
    }

    res.status(200).json({
      message: 'Đã xóa sản phẩm',
      product
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;