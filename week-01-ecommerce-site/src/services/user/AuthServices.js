import User from "../../models/User.js";
import { saveUserToStorage } from "../../utils/storage.js";

export default class AuthService {
    static async login(email, password, expectedRole) {
        try {
            await new Promise(resolve => setTimeout(resolve, 1200));

            const response = await fetch("/public/data/users.json");

            if (!response.ok) {
                throw new Error("Network error while loading users");
            }   

            const users = await response.json();

            const foundUser = users.find(
                (user) =>
                    user.email === email &&
                    user.password === password &&
                    user.role === expectedRole
            );

            if (!foundUser) {
                throw new Error("Invalid credentials or role mismatch");
            }

            const userInstance = new User(foundUser);
            saveUserToStorage(userInstance);

            return userInstance;
        } catch (error) {
            throw error;
        }
    }
}
