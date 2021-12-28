import axios from "axios";

export default class DishesService {
    static async getAll() {
        const response = await axios.get('http://localhost:3004/dishes')
        return response.data
    }

    static async getDishByID(id) {
        const response = await axios.get('http://localhost:3004/dish/'+id)
        return response.data
    }

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

    static async createNewDish(dish, dishes) {
        dish.id = dishes.length + 1
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
    }
}