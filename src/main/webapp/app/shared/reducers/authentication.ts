import axios from 'axios';
import { Storage } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { setLocale } from 'app/shared/reducers/locale';
import * as https from 'https';
import md5 from 'md5';
import dotenv from 'dotenv';

export const ACTION_TYPES = {
  LOGIN: 'authentication/LOGIN',
  GET_SESSION: 'authentication/GET_SESSION',
  LOGOUT: 'authentication/LOGOUT',
  CLEAR_AUTH: 'authentication/CLEAR_AUTH',
  ERROR_MESSAGE: 'authentication/ERROR_MESSAGE',
};

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  showModalLogin: false,
  account: {} as any,
  errorMessage: (null as unknown) as string, // Errors returned from server side
  redirectMessage: (null as unknown) as string,
  sessionHasBeenFetched: false,
  idToken: (null as unknown) as string,
  logoutUrl: (null as unknown) as string,
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer

export default (state: AuthenticationState = initialState, action): AuthenticationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.LOGIN):
    case REQUEST(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.LOGIN):
      return {
        ...initialState,
        errorMessage: action.payload,
        showModalLogin: true,
        loginError: true,
      };
    case FAILURE(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        showModalLogin: true,
        errorMessage: action.payload,
      };
    case ACTION_TYPES.LOGIN:
      //from isAuth.. is jhipster thing
      return {
        ...state,
        loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true,

        isAuthenticated: true,
        sessionHasBeenFetched: true,
        account: {
          activated: true,
          authorities: ['ROLE_USER', 'ROLE_ADMIN'],
          createdBy: 'system',
          createdDate: null,
          email: 'admin@localhost',
          firstName: 'Administrator',
          id: 3,
          imageUrl: '',
          langKey: 'sr',
          lastModifiedBy: 'system',
          lastModifiedDate: null,
          lastName: 'Administrator',
          login: 'admin',
        },
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
        showModalLogin: true,
      };
    case SUCCESS(ACTION_TYPES.GET_SESSION): {
      const isAuthenticated = action.payload && action.payload.data && action.payload.data.activated;
      return {
        ...state,
        isAuthenticated,
        loading: false,
        sessionHasBeenFetched: true,
        account: action.payload.data,
      };
    }
    case ACTION_TYPES.ERROR_MESSAGE:
      return {
        ...initialState,
        showModalLogin: true,
        redirectMessage: action.message,
      };
    case ACTION_TYPES.CLEAR_AUTH:
      return {
        ...state,
        /* loading: false,
        showModalLogin: true,
        isAuthenticated: false,*/
      };
    default:
      return state;
  }
};

export const displayAuthError = message => ({ type: ACTION_TYPES.ERROR_MESSAGE, message });

export const getSession: () => void = () => async (dispatch, getState) => {
  /*await dispatch({
    type: ACTION_TYPES.GET_SESSION,
    payload: axios.get('api/account'),
  });*/

  const { account } = getState().authentication;
  if (account && account.langKey) {
    const langKey = Storage.session.get('locale', account.langKey);
    await dispatch(setLocale(langKey));
  }
};

export const login: (username: string, password: string, rememberMe?: boolean) => void = (username, password, rememberMe = false) => async (
  dispatch,
  getState
) => {
  /*const result = await dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: axios.post('api/authenticate', { username, password, rememberMe }),
  })

  const bearerToken = result.value.headers.authorization;*/
  //TODO implement env

  console.log(process.env);

  const result = await dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: await axios.post(`https://157.90.16.208/api/login`, {
      mail: username,
      credentials: md5(username + password + 'sicon09011996'),
    }),
  });

  const bearerToken = result.payload.data.data.token;
  const mail = result.payload.data.data.user.mail;
  if (bearerToken) {
    //const jwt = bearerToken.slice(7, bearerToken.length);
    if (rememberMe) {
      Storage.local.set('AuthToken', bearerToken);
      Storage.session.set('UserMail', mail);
    } else {
      Storage.session.set('AuthToken', bearerToken);
      Storage.session.set('UserMail', mail);
    }
  }

  //await dispatch(getSession());
};

export const clearAuthToken = () => {
  console.log('clearAuthToken');
  if (Storage.local.get(AUTH_TOKEN_KEY)) {
    Storage.local.remove(AUTH_TOKEN_KEY);
  }
  if (Storage.session.get(AUTH_TOKEN_KEY)) {
    Storage.session.remove(AUTH_TOKEN_KEY);
  }
};

export const logout: () => void = () => dispatch => {
  console.log('logout');
  clearAuthToken();
  dispatch({
    type: ACTION_TYPES.LOGOUT,
  });
};

export const clearAuthentication = messageKey => (dispatch, getState) => {
  console.log('clearAuthentication');
  clearAuthToken();
  dispatch(displayAuthError(messageKey));
  dispatch({
    type: ACTION_TYPES.CLEAR_AUTH,
  });
};
