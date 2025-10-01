import Product from '../models/Product.js'
import crypto from 'node:crypto'

export const createProduct = async (req, res) => {

    try {
        const productToCreate = {
            id: crypto.randomUUID(),
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        }

        const product = await Product.create(productToCreate)

        res.status(201).json(product)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }

}

export const getAllProducts = async (req, res) => {

    try {
        const products = await Product.findAll()
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }

}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.destroy({
            where: { id: req.params.id }
        })
        res.status(200).json({ message: 'Produto deletado!!!' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}