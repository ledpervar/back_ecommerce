import { role } from '../../common/constants/roles.const';

declare global {
  namespace Express {
    interface Locals {
      idUser: number;
      role: role;
    }
  }
}