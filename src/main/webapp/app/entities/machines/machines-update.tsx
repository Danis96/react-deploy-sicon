import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStores } from 'app/shared/model/stores.model';
import { getEntities as getStores } from 'app/entities/stores/stores.reducer';
import { getEntity, updateEntity, createEntity, reset } from './machines.reducer';
import { AvAntdYearPicker } from '../../components/AvAntdYearPicker/AvAntdYearPicker';
import { AvAntdMonthPicker } from 'app/components/AvAntdMonthPicker/AvAntdMonthPicker';
import { AvAntdDatePicker } from 'app/components/AvAntdDatePicker/AvAntdDatePicker.tsx';
import { DatePicker, Form } from 'antd';
import moment from 'moment';



export const MachinesUpdate = (props) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.machineId);
  const [datePickersState, setDatePickersState] = useState(null)
  const [form] = Form.useForm();

  const { machinesEntity, stores, loading, updating } = props;


  const handleClose = () => {
    props.history.goBack();
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.storeId, props.match.params.machineId);
    }
    props.getStores(props.match.params.storeId);
    if(machinesEntity.yearOfProduction){
      console.log('setStateeee',moment.unix(machinesEntity.yearOfProduction).format("MM/DD/YYYY"))
      console.log('setStateeee', machinesEntity.importDate)

      setDatePickersState({
        yearOfProduction:moment.unix(machinesEntity.yearOfProduction).format("MM/DD/YYYY"),
        importDate: moment.unix(machinesEntity.importDate).format("MM/DD/YYYY"),
        warrantyStartDate: moment.unix(machinesEntity.warrantyStartDate).format("MM/DD/YYYY"),
      })
    }

  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

 const getEndDate = (values) => {
    let warrantyDurationInSeconds = 0;
    let warrantyEndDate = 0;

      switch(values.warrantyEndDate) {
         case 0:
          warrantyDurationInSeconds = 0;
          break;
        case 0.5:
          warrantyDurationInSeconds = 15778458;
          break;
        case 1:
          warrantyDurationInSeconds = 31556926;
          break;
        case 2:
          warrantyDurationInSeconds = 63113852;
          break;
        case 3:
          warrantyDurationInSeconds = 94670778;
          break;
        default:
          warrantyDurationInSeconds = 0;
      }

      warrantyEndDate = values.warrantyStartDate + warrantyDurationInSeconds;
      return warrantyEndDate;

 };

  const saveEntity = (event, errors, values) => {
    values.storeId = props.match.params.storeId

    const datePickers =  form.getFieldsValue();

    values.yearOfProduction = datePickers.yearOfProduction.unix()
    values.importDate = datePickers.importDate.unix()
    values.warrantyStartDate = datePickers.warrantyStartDate.unix()
    // values.warrantyEndDate  = warrantyEndRef.current.submitPicker();

    values.warrantyEndDate = getEndDate(values);

    if (errors.length === 0) {
      values.ownerId = props.match.params.storeId;
      const entity = {
        ...machinesEntity,
        ...values,
      };
      console.log('xxxxx', values)
      console.log('xxxxx', datePickersState)
     /* if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }*/
    }
  };


  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="siconFrontendApp.machines.home.createOrEditLabel">
            <Translate contentKey="siconFrontendApp.machines.home.createOrEditLabel">Create or edit a Machines</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : machinesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="machines-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="machines-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="companyLabel" for="machines-company">
                  <Translate contentKey="siconFrontendApp.machines.company" >Company</Translate>
                </Label>
                <AvField id="machines-company" type="text" name="company" required/>
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="machines-type">
                  <Translate contentKey="siconFrontendApp.machines.type">Type</Translate>
                </Label>
                <AvField id="machines-type" type="text" name="type" required/>
              </AvGroup>
              <AvGroup>
                <Label id="yearOfProductionLabel" for="machines-yearOfProduction">
                  <Translate contentKey="siconFrontendApp.machines.yearOfProduction">Year Of Production</Translate>
                </Label>
              {/*  <AvAntdYearPicker ref={childRef} year={machinesEntity.yearOfProduction} />*/}


                {
                  machinesEntity.yearOfProduction && datePickersState && null
                }


              </AvGroup>
              <AvGroup>
                <Label id="importDateLabel" for="machines-importDate">
                  <Translate contentKey="siconFrontendApp.machines.importDate">Import Date</Translate>
                </Label>

               {/* <AvAntdMonthPicker ref={importDateRef} month={machinesEntity.importDate} />*/}
              </AvGroup>
              <AvGroup>
                <Label id="remarksLabel" for="machines-remarks">
                  <Translate contentKey="siconFrontendApp.machines.remarks">Remarks</Translate>
                </Label>
                <AvField id="machines-remarks" type="text" name="remarks" />
              </AvGroup>
              <AvGroup>
                <Label id="warrantyStartDateLabel" for="machines-warrantyStartDate">
                  <Translate contentKey="siconFrontendApp.machines.warrantyStartDate">Warranty Start Date</Translate>
                </Label>
               {/* <AvAntdDatePicker ref={warranytStartRef} date={machinesEntity.warrantyStartDate} />*/}
              </AvGroup>
              <AvGroup>
                <Label id="warrantyEndDateLabel" for="machines-warrantyEndDate">
                  <Translate contentKey="siconFrontendApp.machines.warrantyEndDate">Warranty End Date</Translate>
                </Label>
              {/*  <AvAntdSelect ref={warrantyEndRef} />*/}
              </AvGroup>
              <AvGroup>
                <Label id="deliveryNoteLabel" for="machines-deliveryNote">
                  <Translate contentKey="siconFrontendApp.machines.deliveryNote">Delivery Note</Translate>
                </Label>
                <AvField id="machines-deliveryNote" type="text" name="deliveryNote" />
              </AvGroup>
              <AvGroup>
                <Label id="serialNumberLabel" for="machines-serialNumber">
                  <Translate contentKey="siconFrontendApp.machines.serialNumber" >Serial Number</Translate>
                </Label>
                <AvField id="machines-serialNumber" type="text" name="serialNumber" required/>
              </AvGroup>
              <AvGroup>
                <Label id="buyerLabel" for="machines-buyer">
                  <Translate contentKey="siconFrontendApp.machines.buyer">Buyer</Translate>
                </Label>
                <AvField id="machines-buyer" type="text" name="buyer" />
              </AvGroup>
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

const mapStateToProps = (storeState) => ({
  stores: storeState.stores.entities,
  machinesEntity: storeState.machines.entity,
  loading: storeState.machines.loading,
  updating: storeState.machines.updating,
  updateSuccess: storeState.machines.updateSuccess,
});

const mapDispatchToProps = {
  getStores,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};



export default connect(mapStateToProps, mapDispatchToProps)(MachinesUpdate)
