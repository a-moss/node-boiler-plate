import User from '../Models/user.model';

export function minimalUserTransformer(user: User): object {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
