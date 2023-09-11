import { User } from '@/users/domain/entitites';

export interface UserRepository {
  create(user: User): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
}
