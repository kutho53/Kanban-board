import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    jwtDecode('token');
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const isLoggedIn= () =>{
      const token = localStorage.getItem('token');//may need to mess with what goes in the parenthesis here
      return !!token; // Returns true if the token exists, false otherwise
    }
    if (isLoggedIn()){
      console.log('user is logged in')
    } else {
      console.log('user is not logged in')
    }
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.addItem('token', idToken);
    // TODO: redirect to the home page
    navigate('../pages/Board.tsx');
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token');
    // TODO: redirect to the login page
    navigate('../pages/login.tsx');
  }
}

export default new AuthService();
