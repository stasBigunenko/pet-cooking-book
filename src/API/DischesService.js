import axios from "axios";

// Class for working with the db
export default class DishesService {

    // Method that receive all the receipts from the 1st db
    static async getAll() {
        const response = await axios.get('http://localhost:3004/dishes?_sort=order&_order=asc')
        return response.data
    }

    // Method that receive the full receipt from the 2d db
    static async getDishByID(id) {
        const response = await axios.get('http://localhost:3004/dish/'+id)
        return response.data
    }

    // Method that receive the photos from the 3d db for the Carousel
    static async getPhotosByID(id) {
        try {
            const response = await axios.get('http://localhost:3004/photo/' + id)
            const photos = response.data.pict
            return photos
        } catch (e) {
            const photos = []
            return photos
        }
    }

    // Method that create receipt in the 1st and 2d db
    static async createNewDish(dish, dishes) {

        dish.id = Math.max.apply(Math, dishes.map(function(d) { return d.id; })) + 1
        dish.order = Math.max.apply(Math, dishes.map(function(d) { return d.order; })) + 1
        dish.likes = 0
        dish.url = "none.png"
        await axios.post(`http://localhost:3004/dishes`, {
            id: dish.id,
            order: dish.order,
            title: dish.title,
            cookingTime: dish.cookingTime,
            calories: dish.calories,
            description: dish.description,
            url: dish.url,
            likes: 0
        })
        await axios.post(`http://localhost:3004/dish`, {
            id: dish.id,
            title: dish.title,
            recipe: dish.recipe
        })
        await axios.post(`http://localhost:3004/comments`, {
            id: dish.id,
            comm: []
        })
        await axios.post(`http://localhost:3004/photo`, {
            id: dish.id,
            pict: []
        })
        return dish
    }

    // Method that delete receipt from the 1st and the 2d db
    static async deleteDishByID(id) {
        await axios.delete('http://localhost:3004/dishes/' + id).then(() => {
            axios.delete('http://localhost:3004/dish/' + id).then(() => {
                axios.delete('http://localhost:3004/comments/' + id).then(() => {
                    axios.delete('http://localhost:3004/photo/' + id)
                })
            })
        })
    }

    // Method that receive the full receipt from the 1st and 2d db
    static async getRecipeByID(id) {
        const response1 = await axios.get('http://localhost:3004/dishes/' + id)
        const response2 = await axios.get('http://localhost:3004/dish/' + id)
        return {
            id: response1.data.id,
            order:response1.data.order,
            title: response1.data.title,
            cookingTime: response1.data.cookingTime,
            calories: response1.data.calories,
            description: response1.data.description,
            url: response1.data.url,
            likes: response1.data.likes,
            recipe: response2.data.recipe
        };
    }

    // Method that insert data to the db
    static async putDishByID(changeDish) {
        await axios.put('http://localhost:3004/dishes/' + changeDish.id, {
            id: changeDish.id,
            order: changeDish.order,
            title: changeDish.title,
            cookingTime: changeDish.cookingTime,
            calories: changeDish.calories,
            description: changeDish.description,
            url: changeDish.url,
            likes: changeDish.likes
        })
        axios.put('http://localhost:3004/dish/' + changeDish.id, {
            id: changeDish.id,
            title: changeDish.title,
            recipe:changeDish.recipe
        })
        const newDish = {
            id: changeDish.id,
            order: changeDish.order,
            title: changeDish.title,
            cookingTime: changeDish.cookingTime,
            calories: changeDish.calories,
            description: changeDish.description,
            url: changeDish.url,
            likes: changeDish.likes
        }
        return newDish;
    }

    static async likesByID(likes) {
        const response = await axios.put('http://localhost:3004/dishes/' + likes.id, {
            id: likes.id,
            order: likes.order,
            title: likes.title,
            cookingTime: likes.cookingTime,
            calories: likes.calories,
            description: likes.description,
            url: likes.url,
            likes: likes.likes
        })
    }

    // Method that swap orders in the db
    static async swapRecipes(dish1, dish2) {
        const response1 = await axios.put('http://localhost:3004/dishes/' + dish1.id, {
            id: dish1.id,
            order: dish2.order,
            title: dish1.title,
            cookingTime: dish1.cookingTime,
            calories: dish1.calories,
            description: dish1.description,
            url: dish1.url,
            likes: dish1.likes
        })
        const response2 = await axios.put('http://localhost:3004/dishes/' + dish2.id, {
            id: dish2.id,
            order: dish1.order,
            title: dish2.title,
            cookingTime: dish2.cookingTime,
            calories: dish2.calories,
            description: dish2.description,
            url: dish2.url,
            likes: dish2.likes
        })

        return [response1.data, response2.data];
    }

    // Method that receive all the comments from the db
    static async getAllComments(dishID) {
        const response = await axios.get('http://localhost:3004/comments/' + dishID)
        return response.data.comm
    }

    // Method that create new comment in db
    static async createComment(commentAuthor, commentBody, comments, dishID) {
        const comment = {}
        if (comments.length == 0) {
            comment.commentID = dishID + 0.1
        } else {
            comment.commentID = Math.max.apply(Math, comments.map(function(c) { return c.commentID; })) + 0.1
        }
        comment.author = commentAuthor
        comment.body = commentBody
        const newComms = [...comments, comment]
        await axios.put('http://localhost:3004/comments/' + dishID, {
            id: dishID,
            comm: newComms
    })
        return newComms
    }
}