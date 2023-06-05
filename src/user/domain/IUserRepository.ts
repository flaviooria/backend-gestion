interface IUserRepository {
    getUser():Promise<User>;
    createUser(user:User):Promise<void>;
    deleteUser(id:string):Promise<void>;
    updateUser(id:string, fieldsToUpdate:Partial<User>):Promise<void>;
}