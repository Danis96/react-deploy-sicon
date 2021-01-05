import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './stores.reducer';
import { IStores } from 'app/shared/model/stores.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import Stores from 'app/entities/stores/stores';
import Machines from 'app/entities/machines/machines';

export interface IStoresDetailProps extends StateProps, DispatchProps, RouteComponentProps<{
  storeId: any;
  ownerId: any;
  id: string }> {
}

export const StoresDetail = (props: IStoresDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.storeId, props.match.params.ownerId);
  }, []);

  const { storesEntity } = props;
  return (
    <>
      <Row>
        <Col md='8'>
          <h2>
            <Translate
              contentKey='siconFrontendApp.stores.detail.title'>Stores</Translate>{/* [<b>{storesEntity.address}</b>]*/}
          </h2>
          <dl className='jh-entity-details'>
            <dt>
            <span id='address'>
              <Translate contentKey='siconFrontendApp.stores.address'>Address</Translate>
            </span>
            </dt>
            <dd>{storesEntity.address}</dd>
            <dt>
              <Translate contentKey='siconFrontendApp.stores.ownerId'>Owner Id</Translate>
            </dt>
            <dd>{storesEntity.ownerId ? storesEntity.ownerId.id : ''}</dd>
          </dl>
          <Button tag={Link} onClick={() => window.history.back()} replace color='info'>
            <FontAwesomeIcon icon='arrow-left' />{' '}
            <span className='d-none d-md-inline'>
            <Translate contentKey='entity.action.back'>Back</Translate>
          </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`${props.location.pathname}/edit`} replace color='primary'>
            <FontAwesomeIcon icon='pencil-alt' />{' '}
            <span className='d-none d-md-inline'>
            <Translate contentKey='entity.action.edit'>Edit</Translate>
          </span>
          </Button>
        </Col>
      </Row>
      <br /><br />
      <Row>
        <Machines match={props.match} />
      </Row>
    </>
  );
};

const mapStateToProps = ({ stores }: IRootState) => ({
  storesEntity: stores.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StoresDetail);
