import { requests } from '@/utils/requests'
import User from '@/types/user'

class AuthService {
  login(user: User) {
    return requests.post('/auth/login', {
      username: user.username,
      password: user.password
    });
  }

  logout() {
    localStorage.removeItem('token');
  }

  register(user: User) {
    return requests.post('/auth/register', {
      username: user.username,
      password: user.password
    });
  }
}

export const authService =  new AuthService();
