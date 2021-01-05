import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './owners.reducer';
import { IOwners } from 'app/shared/model/owners.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOwnersUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OwnersUpdate = (props) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.ownerId);

  const { ownersEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.goBack()
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.ownerId);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...ownersEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="siconFrontendApp.owners.home.createOrEditLabel">
            <Translate contentKey="siconFrontendApp.owners.home.createOrEditLabel">Create or edit a Owners</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ownersEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="owners-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="owners-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="owners-name">
                  <Translate contentKey="siconFrontendApp.owners.name">Name</Translate>
                </Label>
                <AvField id="owners-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="owners-address">
                  <Translate contentKey="siconFrontendApp.owners.address">Address</Translate>
                </Label>
                <AvField id="owners-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="contactNumberLabel" for="owners-contactNumber">
                  <Translate contentKey="siconFrontendApp.owners.contactNumber">Contact Number</Translate>
                </Label>
                <AvField id="owners-contactNumber" type="string" className="form-control" name="contactNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="contactPersonLabel" for="owners-contactPerson">
                  <Translate contentKey="siconFrontendApp.owners.contactPerson">Contact Person</Translate>
                </Label>
                <AvField id="owners-contactPerson" type="text" name="contactPerson" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/owners" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  ownersEntity: storeState.owners.entity,
  loading: storeState.owners.loading,
  updating: storeState.owners.updating,
  updateSuccess: storeState.owners.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OwnersUpdate);
