import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './owners.reducer';
import { IOwners } from 'app/shared/model/owners.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import Stores from 'app/entities/stores/stores';

export interface IOwnersDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OwnersDetail = (props) => {
  useEffect(() => {
    props.getEntity(props.match.params.ownerId);
  }, []);

  const { ownersEntity } = props;
  return (
    <>
      <div>
        <Col>
          <h2>
            <Translate contentKey="siconFrontendApp.owners.detail.title">Owners</Translate> [<b>{ownersEntity.name}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
            <span id="name">
              <Translate contentKey="siconFrontendApp.owners.name">Name</Translate>
            </span>
            </dt>
            <dd>{ownersEntity.name}</dd>
            <dt>
            <span id="address">
              <Translate contentKey="siconFrontendApp.owners.address">Address</Translate>
            </span>
            </dt>
            <dd>{ownersEntity.address}</dd>
            <dt>
            <span id="contactNumber">
              <Translate contentKey="siconFrontendApp.owners.contactNumber">Contact Number</Translate>
            </span>
            </dt>
            <dd>{ownersEntity.contactNumber}</dd>
            <dt>
            <span id="contactPerson">
              <Translate contentKey="siconFrontendApp.owners.contactPerson">Contact Person</Translate>
            </span>
            </dt>
            <dd>{ownersEntity.contactPerson}</dd>
          </dl>
          <Button tag={Link} to="/owners" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/owners/${ownersEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
          </Button>
        </Col>
      </div>
      <br/><br/>
      <Row>
        <Stores match={props.match}/>
      </Row>
    </>
  );
};

const mapStateToProps = ({ owners }: IRootState) => ({
  ownersEntity: owners.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OwnersDetail);
