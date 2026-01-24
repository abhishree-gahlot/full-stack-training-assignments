export default class User {
    constructor({ id, email, role, name }) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.name = name;
    }

    isAdmin() {
        return this.role === "admin";
    }

    isCustomer() {
        return this.role === "customer";
    }
}
