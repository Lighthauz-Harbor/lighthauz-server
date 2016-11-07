export class User {
    private _name: string;
    private _username: string;
    private _password: string;
    private _role: string;
    private _bio: string;
    private _profilePic: string; // URL to the file in image server
    private _dateOfBirth: Date;
    private _createdAt: Date;

    constructor(
        username: string, 
        role: string,
        name: string = "Some Name",
        bio: string = "This is some bio",
        profilePic: string = "http://res.cloudinary.com/lighthauz-harbor/image/upload/v1478504599/default-profile-pic_hroujz.png",
        dateOfBirth: Date = new Date(),
        createdAt: Date = new Date(0),
        password: string = "") {
        
        this.name = name;
        this.username = username;
        this.role = role;
        this.bio = bio;
        this.profilePic = profilePic;
        this.dateOfBirth = dateOfBirth;
        this.createdAt = createdAt;
        // don't assign passwords for security purposes
    }

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        this._name = newName;
    }

    get username(): string {
        return this._username;
    }

    set username(newUsername: string) {
        this._username = newUsername;
    }

    get password(): string {
        return this._password;
    }

    get role(): string {
        return this._role;
    }

    set role(newRole: string) {
        this._role = newRole;
    } 

    get bio(): string {
        return this._bio;
    }

    set bio(newBio: string) {
        this._bio = newBio;
    }

    get profilePic(): string {
        return this._profilePic;
    }

    set profilePic(newProfilePic: string) {
        this._profilePic = newProfilePic;
    }

    get dateOfBirth(): Date {
        return this._dateOfBirth;
    }

    set dateOfBirth(newDateOfBirth: Date) {
        this._dateOfBirth = newDateOfBirth;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(newCreatedAt: Date) {
        this._createdAt = newCreatedAt;
    }

}