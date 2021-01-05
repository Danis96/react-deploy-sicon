import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../owners/owners.scss';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './stores.reducer';
import { IStores } from 'app/shared/model/stores.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStoresProps extends StateProps, DispatchProps, RouteComponentProps<{
  ownerId: string,
  url: string }> {}

export const Stores = (props) => {
  const history = useHistory();

  useEffect(() => {
    props.getEntities(props.match.params.ownerId, 0, 0);
  }, []);

  const { storesList, match, loading } = props;
  return (
    <div style={{width:'100%'}}>
      <h2 id="stores-heading">
        <Translate contentKey="siconFrontendApp.stores.home.title">Stores</Translate>
        <Link to={`${match.url}/stores/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="siconFrontendApp.stores.home.createLabel">Create new Stores</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {storesList && storesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="siconFrontendApp.stores.address">Address</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {storesList.map((stores, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} onClick={() => history.push(match.url + `/stores/${stores.id}`)} color="link" size="sm">
                      {stores.id}
                    </Button>
                  </td>
                  <td>
                    <a  onClick={() => history.push(match.url + "/stores/" + stores.id)} >
                      {stores.address}
                    </a>
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} onClick={() => history.push(match.url + "/stores/" + stores.id)}  color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} onClick={() => history.push( match.url + "/stores/" + stores.id + "/edit")} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/stores/${stores.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="siconFrontendApp.stores.home.notFound">No Stores found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ stores }: IRootState) => ({
  storesList: stores.entities,
  loading: stores.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Stores);
