import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../app.css';
import { Storage } from 'react-jhipster';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './owners.reducer';
import { IOwners } from 'app/shared/model/owners.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOwnersProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Owners = (props: IOwnersProps) => {
  const history = useHistory();

  useEffect(() => {
    props.getEntities();
  }, []);

  const { ownersList, match, loading } = props;
  return (
    <div>
      <div>
        <h2 id="owners-heading" className='headerText'>
          <Translate contentKey="siconFrontendApp.owners.home.title">Owners</Translate>
          <br/>
          <Link to={`${match.url}owners/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="siconFrontendApp.owners.home.createLabel">Create new Owners</Translate>
          </Link>
        </h2>
      </div>
      <br/><br/>
      <div className="table-responsive">
        {ownersList && ownersList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="siconFrontendApp.owners.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="siconFrontendApp.owners.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="siconFrontendApp.owners.contactNumber">Contact Number</Translate>
                </th>
                <th>
                  <Translate contentKey="siconFrontendApp.owners.contactPerson">Contact Person</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {ownersList.map((owners, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} onClick={() => history.push("/owners/" + owners.id)} color="link" size="sm">
                      {owners.id} {/*to={`${match.url}owners/${owners.id}`}*/}
                    </Button>
                  </td>
                  <td>
                    <a onClick={() => history.push("/owners/" + owners.id)} color="link">
                      {owners.name}
                    </a>
                  </td>
                  <td>{owners.address}</td>
                  <td>{owners.contactNumber}</td>
                  <td>{owners.contactPerson}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}owners/${owners.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}owners/${owners.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}owners/${owners.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="siconFrontendApp.owners.home.notFound">No Owners found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ owners }: IRootState) => ({
  ownersList: owners.entities,
  loading: owners.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Owners);
