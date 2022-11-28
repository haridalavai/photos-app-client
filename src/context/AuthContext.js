import { useToast } from '@chakra-ui/react';
import { createContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCurrentUser,
  getUserAttributes,
  signIn,
  signUp,
} from '../api/cognito';
import { isValidToken } from '../utils/jwt';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const initialise = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const exp = localStorage.getItem('exp');

        if (accessToken) {
          if (!isValidToken(accessToken)) {
            localStorage.removeItem('accessToken');
            dispatch({
              type: 'INITIALIZE',
              payload: { isAuthenticated: false, user: null },
            });
            toast({
              title: 'Session expired',
              description: 'Please log in again',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
            navigate('/login');
          } else {
            const user = await getCurrentUser();
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user,
              },
            });
          }
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialise();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await signIn(email, password);
      console.log(result);
      const { idToken } = result;
      localStorage.setItem('accessToken', idToken.jwtToken);
      const user = await getCurrentUser();
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = async () => {
    localStorage.removeItem('accessToken');
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (email, password) => {
    try {
      const result = await signUp(email, password);
      const { user } = result;
      dispatch({
        type: 'REGISTER',
        payload: {
          user,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
