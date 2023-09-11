type UserConstructor = {
  id: string;
  name: string;
  username: string;
};

export class User {
  id: string;
  name?: string;
  username?: string;

  constructor(params: UserConstructor) {
    this.id = params.id;
    this.name = params.name;
    this.username = params.username;
  }
}
