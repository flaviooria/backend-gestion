import { User } from "./User";

export interface IUserRepository  {
    getUser(id:string):Promise<User|null>;
    getAllUser():Promise<User[]>;
    createUser(user:User):Promise<User>;
    deleteUser(id:string):Promise<boolean>;
    updateUser(id:string, fieldsToUpdate:Partial<User>):Promise<User>;

}