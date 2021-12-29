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
    }

    static async deleteDishByID(id) {
        await axios.delete('http://localhost:3004/dishes/' + id).then(() => {
            axios.delete('http://localhost:3004/dish/' + id)
        })
    }

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
        }
    }

    static async putDishByID(changeDish) {
        axios.put('http://localhost:3004/dishes/' + changeDish.id, {
            id: changeDish.id,
            title: changeDish.title,
            cookingTime: changeDish.cookingTime,
            callories: changeDish.callories,
            description: changeDish.description,
            url: changeDish.url})

        axios.put('http://localhost:3004/dish/' + changeDish.id, {
                    id: changeDish.id,
                    title: changeDish.title,
                    receipt:changeDish.receipt
        })

        return await changeDish
    }
}