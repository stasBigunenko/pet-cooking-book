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

    static async getPhotosById(id) {
        const response = await axios.get('http://localhost:3004/photo/'+id)
        const photos = response.data.pict
        return photos
    }
}