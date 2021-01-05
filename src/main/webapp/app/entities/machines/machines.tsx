import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../owners/owners.scss';


import { IRootState } from 'app/shared/reducers';
import { getEntities } from './machines.reducer';
import { IMachines } from 'app/shared/model/machines.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMachinesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Machines = (props) => {
  const history = useHistory();

  useEffect(() => {
    props.getEntities(props.match.params.storeId);
  }, []);

  const { machinesList, match, loading } = props;
  return (
    <div style={{width:'100%'}}>
      <h2 id="machines-heading">
        <Translate contentKey="siconFrontendApp.machines.home.title">Machines</Translate>
        <Link to={`${match.url}/machines/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="siconFrontendApp.machines.home.createLabel">Create new Machines</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {machinesList && machinesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="siconFrontendApp.machines.company">Company</Translate>
                </th>
                <th>
                  <Translate contentKey="siconFrontendApp.machines.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="siconFrontendApp.machines.yearOfProduction">Year Of Production</Translate>
                </th>
                <th>
                  <Translate contentKey="siconFrontendApp.machines.importDate">Import Date</Translate>
                </th>
                <th>
                  <Translate contentKey="siconFrontendApp.machines.remarks">Remarks</Translate>
                </th>
                <th>
                  <Translate contentKey="siconFrontendApp.machines.warrantyStartDate">Warranty Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="siconFrontendApp.machines.warrantyEndDate">Warranty End Date</Translate>
                </th>
                <th>
                  <Translate contentKey="siconFrontendApp.machines.deliveryNote">Delivery Note</Translate>
                </th>
                <th>
                  <Translate contentKey="siconFrontendApp.machines.serialNumber">Serial Number</Translate>
                </th>
                <th>
                  <Translate contentKey="siconFrontendApp.machines.buyer">Buyer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {machinesList.map((machines, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} onClick={() => history.push(match.url + "/machines/" + machines.id)} color="link" size="sm">
                      {machines.id}
                    </Button>
                  </td>
                  <td>
                    <a onClick={() => history.push(match.url + "/machines/" + machines.id)} color="link">
                      {machines.company}
                    </a>
                  </td>
                  <td>{machines.type}</td>
                  <td>{new Date(machines.yearOfProduction * 1000).toLocaleDateString("en-GB").substring(6)}</td>
                  <td>{new Date(machines.importDate * 1000).toLocaleDateString("en-GB").substring(3)}</td>
                  <td>{machines.remarks}</td>
                  <td>{new Date(machines.warrantyStartDate * 1000).toLocaleDateString("en-GB")}</td>
                  <td>{new Date(machines.warrantyEndDate * 1000).toLocaleDateString("en-GB")}</td>
                  <td>{machines.deliveryNote}</td>
                  <td>{machines.serialNumber}</td>
                  <td>{machines.buyer}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/machines/${machines.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link}  to={`${match.url}/machines/${machines.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/machines/${machines.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="siconFrontendApp.machines.home.notFound">No Machines found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ machines }: IRootState) => ({
  machinesList: machines.entities,
  loading: machines.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Machines);
