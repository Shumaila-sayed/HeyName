const db = require('../db/queries');

const getCategories = async (req, res) => {
    try {
        const categories = await db.getAllCategories();
        res.send(categories);
    } catch (error) {
        console.log(`error fetching categories: `, error);
        res.status(500).send("error fetching categories")
        
        
    }

}

const newCategoryPost = () => {

}

const updateCategory = () => {

}

const deleteCategory = () => {

}

module.exports = {
    getCategories, newCategoryPost, updateCategory, deleteCategory
}