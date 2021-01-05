import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, Storage } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOwners, defaultValue } from 'app/shared/model/owners.model';

export const ACTION_TYPES = {
  FETCH_OWNERS_LIST: 'owners/FETCH_OWNERS_LIST',
  FETCH_OWNERS: 'owners/FETCH_OWNERS',
  CREATE_OWNERS: 'owners/CREATE_OWNERS',
  UPDATE_OWNERS: 'owners/UPDATE_OWNERS',
  DELETE_OWNERS: 'owners/DELETE_OWNERS',
  RESET: 'owners/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOwners>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type OwnersState = Readonly<typeof initialState>;

// Reducer

export default (state: OwnersState = initialState, action): OwnersState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_OWNERS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_OWNERS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_OWNERS):
    case REQUEST(ACTION_TYPES.UPDATE_OWNERS):
    case REQUEST(ACTION_TYPES.DELETE_OWNERS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_OWNERS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_OWNERS):
    case FAILURE(ACTION_TYPES.CREATE_OWNERS):
    case FAILURE(ACTION_TYPES.UPDATE_OWNERS):
    case FAILURE(ACTION_TYPES.DELETE_OWNERS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_OWNERS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_OWNERS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_OWNERS):
    case SUCCESS(ACTION_TYPES.UPDATE_OWNERS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_OWNERS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/owners';

// Actions

export const getEntities: ICrudGetAllAction<IOwners> = (page, size, sort) => {
  const AuthToken = Storage.session.get('AuthToken');
  const UserMail = Storage.session.get('UserMail');
  return {
    type: ACTION_TYPES.FETCH_OWNERS_LIST,
    payload: axios.get<IOwners>(`https://157.90.16.208/api/owners`, {
      headers: {
        AuthToken,
        UserMail,
      },
    }),
  };
};

export const getEntity: ICrudGetAction<IOwners> = id => {
  const AuthToken = Storage.session.get('AuthToken');
  const UserMail = Storage.session.get('UserMail');
  const requestUrl = `${apiUrl}/${id}`;

  return {
    type: ACTION_TYPES.FETCH_OWNERS,
    payload: axios.get<IOwners>(`https://157.90.16.208/api/owners/${id}`, {
      headers: {
        AuthToken,
        UserMail,
      },
    }),
  };
};

export const createEntity: ICrudPutAction<IOwners> = entity => async dispatch => {
  const AuthToken = Storage.session.get('AuthToken');
  const UserMail = Storage.session.get('UserMail');
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_OWNERS,
    payload: axios.post(`https://157.90.16.208/api/owners`, entity, {
      headers: {
        AuthToken,
        UserMail,
      },
    }),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOwners> = entity => async dispatch => {
  const AuthToken = Storage.session.get('AuthToken');
  const UserMail = Storage.session.get('UserMail');
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_OWNERS,
    payload: axios.put(`https://157.90.16.208/api/owners/${entity.id}`, entity, {
      headers: {
        AuthToken,
        UserMail,
      },
    }),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOwners> = id => async dispatch => {
  const AuthToken = Storage.session.get('AuthToken');
  const UserMail = Storage.session.get('UserMail');
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_OWNERS,
    payload: axios.delete(`https://157.90.16.208/api/owners/${id}`, {
      headers: {
        AuthToken,
        UserMail,
      },
    }),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
