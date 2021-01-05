import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, Storage } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStores, defaultValue } from 'app/shared/model/stores.model';
import { IOwners } from 'app/shared/model/owners.model';

export const ACTION_TYPES = {
  FETCH_STORES_LIST: 'stores/FETCH_STORES_LIST',
  FETCH_STORES: 'stores/FETCH_STORES',
  CREATE_STORES: 'stores/CREATE_STORES',
  UPDATE_STORES: 'stores/UPDATE_STORES',
  DELETE_STORES: 'stores/DELETE_STORES',
  RESET: 'stores/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStores>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type StoresState = Readonly<typeof initialState>;

// Reducer

export default (state: StoresState = initialState, action): StoresState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STORES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STORES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_STORES):
    case REQUEST(ACTION_TYPES.UPDATE_STORES):
    case REQUEST(ACTION_TYPES.DELETE_STORES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_STORES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STORES):
    case FAILURE(ACTION_TYPES.CREATE_STORES):
    case FAILURE(ACTION_TYPES.UPDATE_STORES):
    case FAILURE(ACTION_TYPES.DELETE_STORES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_STORES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_STORES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_STORES):
    case SUCCESS(ACTION_TYPES.UPDATE_STORES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_STORES):
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

const apiUrl = 'api/stores';

// Actions

export const getEntities = (ownerId: string, page, size, sort) => {
  const AuthToken = Storage.session.get('AuthToken');
  const UserMail = Storage.session.get('UserMail');
  return {
    type: ACTION_TYPES.FETCH_STORES_LIST,
    payload: axios.get<IStores>(`https://157.90.16.208/api/owners/${ownerId}/stores`, {
      headers: {
        AuthToken,
        UserMail,
      },
    }),
  };
};

export const getEntity = (id, ownerId) => {
  const AuthToken = Storage.session.get('AuthToken');
  const UserMail = Storage.session.get('UserMail');
  return {
    type: ACTION_TYPES.FETCH_STORES,
    payload: axios.get<IOwners>(`https://157.90.16.208/api/owners/${ownerId}/stores/${id}`, {
      headers: {
        AuthToken,
        UserMail,
      },
    }),
  };
};

export const createEntity = entity => async dispatch => {
  const AuthToken = Storage.session.get('AuthToken');
  const UserMail = Storage.session.get('UserMail');
  console.log(entity);
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STORES,
    payload: axios.post(`https://157.90.16.208/api/owners/${entity.ownerId}/stores`, entity, {
      headers: {
        AuthToken,
        UserMail,
      },
    }),
  });
  dispatch(getEntities(entity.ownerId, null, null, null));
  return result;
};

export const updateEntity: ICrudPutAction<IStores> = entity => async dispatch => {
  const AuthToken = Storage.session.get('AuthToken');
  const UserMail = Storage.session.get('UserMail');
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STORES,
    payload: axios.put(`https://157.90.16.208/api/owners/${entity.ownerId}/stores/${entity.id}`, entity, {
      headers: {
        AuthToken,
        UserMail,
      },
    }),
  });
  return result;
};

export const deleteEntity = (id, ownerId) => async dispatch => {
  const AuthToken = Storage.session.get('AuthToken');
  const UserMail = Storage.session.get('UserMail');
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STORES,
    payload: axios.delete(`https://157.90.16.208/api/owners/${ownerId}/stores/${id}`, {
      headers: {
        AuthToken,
        UserMail,
      },
    }),
  });
  dispatch(getEntities(ownerId, null, null, null));
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
