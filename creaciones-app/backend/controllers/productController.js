import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'



// Fetch all products
// GET /api/products
// access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// Fetch single product
// GET /api/products/:id
// access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

// Delete a product
// DELETE /api/products/:id
// access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({ message: 'Product Removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

// Create a product
// POST /api/product
// access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Product',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createProduct)
})

// Update a product
// PUT /api/products/:id
// access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updateProduct = await product.save()
        res.json(updateProduct)

    } else {
        res.status(404)
        throw new Error("Product not found")
    }

})



export {
    getProducts,
    getProductById,
    deleteProduct
}