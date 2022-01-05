import axios from "axios";

// Class for working with the db
export default class DishesService {

    // Method that receive all the receipts from the 1st db
    static async getAll() {
        const response = await axios.get('http://localhost:3004/dishes')
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
        dish.id = dishes[dishes.length-1].id + 1
        await axios.post(`http://localhost:3004/dishes`, {
            id: dish.id,
            title: dish.title,
            cookingTime: dish.cookingTime,
            callories: dish.callories,
            description: dish.description,
            url: "none.png"
        })
        await axios.post(`http://localhost:3004/dish`, {
            id: dish.id,
            title: dish.title,
            receipt: dish.receipt
        })
        return dish
    }

    // Method that delete receipt from the 1st and the 2d db
    static async deleteDishByID(id) {
        await axios.delete('http://localhost:3004/dishes/' + id).then(() => {
            axios.delete('http://localhost:3004/dish/' + id)
        })
    }

    // Method that receive the full receipt from the 1st and 2d db
    static async getReceiptByID(id) {
        const response1 = await axios.get('http://localhost:3004/dishes/' + id)
        const response2 = await axios.get('http://localhost:3004/dish/' + id)
        return {
            id: response1.data.id,
            title: response1.data.title,
            cookingTime: response1.data.cookingTime,
            callories: response1.data.callories,
            description: response1.data.description,
            url: response1.data.url,
            receipt: response2.data.receipt
        };
    }

    // Method that insert data to the db
    static async putDishByID(changeDish) {
        axios.put('http://localhost:3004/dishes/' + changeDish.id, {
            id: changeDish.id,
            title: changeDish.title,
            cookingTime: changeDish.cookingTime,
            callories: changeDish.callories,
            description: changeDish.description,
            url: changeDish.url
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
        axios.put('http://localhost:3004/dish/' + changeDish.id, {
            id: changeDish.id,
            title: changeDish.title,
            receipt:changeDish.receipt
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }
}