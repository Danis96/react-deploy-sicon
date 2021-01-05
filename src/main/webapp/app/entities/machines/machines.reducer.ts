import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, Storage } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMachines, defaultValue } from 'app/shared/model/machines.model';
import { IStores } from 'app/shared/model/stores.model';
import { IOwners } from 'app/shared/model/owners.model';

export const ACTION_TYPES = {
  FETCH_MACHINES_LIST: 'machines/FETCH_MACHINES_LIST',
  FETCH_MACHINES: 'machines/FETCH_MACHINES',
  CREATE_MACHINES: 'machines/CREATE_MACHINES',
  UPDATE_MACHINES: 'machines/UPDATE_MACHINES',
  DELETE_MACHINES: 'machines/DELETE_MACHINES',
  RESET: 'machines/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMachines>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type MachinesState = Readonly<typeof initialState>;

// Reducer

export default (state: MachinesState = initialState, action): MachinesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MACHINES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MACHINES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MACHINES):
    case REQUEST(ACTION_TYPES.UPDATE_MACHINES):
    case REQUEST(ACTION_TYPES.DELETE_MACHINES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MACHINES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MACHINES):
    case FAILURE(ACTION_TYPES.CREATE_MACHINES):
    case FAILURE(ACTION_TYPES.UPDATE_MACHINES):
    case FAILURE(ACTION_TYPES.DELETE_MACHINES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MACHINES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MACHINES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MACHINES):
    case SUCCESS(ACTION_TYPES.UPDATE_MACHINES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MACHINES):
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

const apiUrl = 'api/machines';

// Actions

export const getEntities = (storeId, page, size, sort) => {
  const AuthToken = Storage.session.get('AuthToken');
  const UserMail = Storage.session.get('UserMail');
  return {
    type: ACTION_TYPES.FETCH_MACHINES_LIST,
    payload: axios.get<IStores>(`https://157.90.16.208/api/stores/${storeId}/machines`, {
      headers: {
        AuthToken,
        UserMail,
      },
    }),
  };
};

export const getEntity = (storeId, id) => {
  const AuthToken = Storage.session.get('AuthToken');
  const UserMail = Storage.session.get('UserMail');
  return {
    type: ACTION_TYPES.FETCH_MACHINES,
    payload: axios.get<IOwners>(`https://157.90.16.208/api/stores/${storeId}/machines/${id}`, {
      headers: {
        AuthToken,
        UserMail,
      },
    }),
  };
};

export const createEntity: ICrudPutAction<IMachines> = entity => async dispatch => {
  const AuthToken = Storage.session.get('AuthToken');
  const UserMail = Storage.session.get('UserMail');
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MACHINES,
    payload: axios.post(`https://157.90.16.208/api/stores/${entity.storeId}/machines`, entity, {
      headers: {
        AuthToken,
        UserMail,
      },
    }),
  });
  dispatch(getEntities(entity.storeId, null, null, null));
  return result;
};

export const updateEntity: ICrudPutAction<IMachines> = entity => async dispatch => {
  const AuthToken = Storage.session.get('AuthToken');
  const UserMail = Storage.session.get('UserMail');
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MACHINES,
    payload: axios.put(`https://157.90.16.208/api/stores/${entity.storeId}/machines/${entity.id}`, entity, {
      headers: {
        AuthToken,
        UserMail,
      },
    }),
  });
  return result;
};

export const deleteEntity = id => async dispatch => {
  /*const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MACHINES,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;*/
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
