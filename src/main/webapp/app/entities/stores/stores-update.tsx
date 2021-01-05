import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IOwners } from 'app/shared/model/owners.model';
import { getEntities as getOwners } from 'app/entities/owners/owners.reducer';
import { getEntity, updateEntity, createEntity, reset } from './stores.reducer';
import { IStores } from 'app/shared/model/stores.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStoresUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{
  ownerId: any;
  id: string }> {}

export const StoresUpdate = (props) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.storeId);

  const { storesEntity, owners, loading, updating } = props;

  const handleClose = () => {
   props.history.goBack()
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.storeId, props.match.params.ownerId);
    }

    props.getOwners();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.ownerId = props.match.params.ownerId

    if (errors.length === 0) {
      const entity = {
        ...storesEntity,
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
          <h2 id="siconFrontendApp.stores.home.createOrEditLabel">
            <Translate contentKey="siconFrontendApp.stores.home.createOrEditLabel">Create or edit a Stores</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : storesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="stores-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="stores-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="addressLabel" for="stores-address">
                  <Translate contentKey="siconFrontendApp.stores.address">Address</Translate>
                </Label>
                <AvField id="stores-address" type="text" name="address" />
              </AvGroup>
             {/* <AvGroup>
                <Label for="stores-ownerId">
                  <Translate contentKey="siconFrontendApp.stores.ownerId">Owner Id</Translate>
                </Label>
                <AvInput id="stores-ownerId" type="select" className="form-control" name="ownerId.id">
                  <option value="" key="0" />
                  {owners
                    ? owners.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>*/}
              <Button tag={Link} id="cancel-save" onClick={() => props.history.goBack()} replace color="info">
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
  owners: storeState.owners.entities,
  storesEntity: storeState.stores.entity,
  loading: storeState.stores.loading,
  updating: storeState.stores.updating,
  updateSuccess: storeState.stores.updateSuccess,
});

const mapDispatchToProps = {
  getOwners,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StoresUpdate);
