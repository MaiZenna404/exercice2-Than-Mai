class UserModel {
    constructor() {
        this.users = [];
    }

    // Fetch all users
    fetchAllUsers() {
        return this.users;
    }

    // Find user by email and password
    findUserByEmail(email, password) {
        return this.users.find(user => user.email === email && user.password === password);
    }

    // Add a new user 
    addUser(email, password) {
        const newUser = { email, password };
        this.users.push(newUser);
        return newUser;
    }
}

export default new UserModel();