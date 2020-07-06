export default class User {
  constructor({
    imageUrl,
    name,
    username,
    email,
  }) {
    this.imageUrl = imageUrl;
    this.name = name;
    this.username = username;
    this.email = email;
    return this;
  }
  
  getEmail() {
    return this.email;
  }
  
  getImageUrl() {
    return this.imageUrl;
  }

  getName() {
    return this.name;
  }

  getUsername() {
    return this.username;
  }
}