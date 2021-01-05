import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './machines.reducer';
import { IMachines } from 'app/shared/model/machines.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMachinesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MachinesDetail = (props) => {
  useEffect(() => {
    props.getEntity(props.match.params.storeId, props.match.params.machineId);
  }, []);

  const { machinesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="siconFrontendApp.machines.detail.title">Machines</Translate> [<b>{machinesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="company">
              <Translate contentKey="siconFrontendApp.machines.company">Company</Translate>
            </span>
          </dt>
          <dd>{machinesEntity.company}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="siconFrontendApp.machines.type">Type</Translate>
            </span>
          </dt>
          <dd>{machinesEntity.type}</dd>
          <dt>
            <span id="yearOfProduction">
              <Translate contentKey="siconFrontendApp.machines.yearOfProduction">Year Of Production</Translate>
            </span>
          </dt>
          <dd>{new Date(machinesEntity.yearOfProduction * 1000).toLocaleDateString('en-GB')}</dd>
          <dt>
            <span id="importDate">
              <Translate contentKey="siconFrontendApp.machines.importDate">Import Date</Translate>
            </span>
          </dt>
          <dd>{new Date(machinesEntity.importDate * 1000).toLocaleDateString('en-GB')}</dd>
          <dt>
            <span id="remarks">
              <Translate contentKey="siconFrontendApp.machines.remarks">Remarks</Translate>
            </span>
          </dt>
          <dd>{machinesEntity.remarks}</dd>
          <dt>
            <span id="warrantyStartDate">
              <Translate contentKey="siconFrontendApp.machines.warrantyStartDate">Warranty Start Date</Translate>
            </span>
          </dt>
          <dd>{new Date(machinesEntity.warrantyStartDate * 1000).toLocaleDateString('en-GB')}</dd>
          <dt>
            <span id="warrantyEndDate">
              <Translate contentKey="siconFrontendApp.machines.warrantyEndDate">Warranty End Date</Translate>
            </span>
          </dt>
          <dd>{new Date(machinesEntity.warrantyEndDate * 1000).toLocaleDateString('en-GB')}</dd>
          <dt>
            <span id="deliveryNote">
              <Translate contentKey="siconFrontendApp.machines.deliveryNote">Delivery Note</Translate>
            </span>
          </dt>
          <dd>{machinesEntity.deliveryNote}</dd>
          <dt>
            <span id="serialNumber">
              <Translate contentKey="siconFrontendApp.machines.serialNumber">Serial Number</Translate>
            </span>
          </dt>
          <dd>{machinesEntity.serialNumber}</dd>
          <dt>
            <span id="buyer">
              <Translate contentKey="siconFrontendApp.machines.buyer">Buyer</Translate>
            </span>
          </dt>
          <dd>{machinesEntity.buyer}</dd>
          <dt>
            <Translate contentKey="siconFrontendApp.machines.storeId">Store Id</Translate>
          </dt>
          <dd>{machinesEntity.storeId ? machinesEntity.storeId.id : ''}</dd>
        </dl>
        <Button tag={Link} onClick={() => window.history.back()} replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`${props.location.pathname}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ machines }: IRootState) => ({
  machinesEntity: machines.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MachinesDetail);
