import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Owners from './owners/owners';

import MachinesUpdate from 'app/entities/machines/machines-update';
import MachinesDetail from 'app/entities/machines/machines-detail';
import StoresUpdate from 'app/entities/stores/stores-update';
import StoresDetail from 'app/entities/stores/stores-detail';
import OwnersUpdate from 'app/entities/owners/owners-update';
import OwnersDetail from 'app/entities/owners/owners-detail';
import MachinesDeleteDialog from 'app/entities/machines/machines-delete-dialog';
import StoresDeleteDialog from 'app/entities/stores/stores-delete-dialog';
import OwnersDeleteDialog from 'app/entities/owners/owners-delete-dialog';
/* jhipster-needle-add-route-import - JHipster will add routes here */

import './app.css';
const Routes = ({ match }) => (
  <>

     <div className='appContainer'>
       <Switch>
         <ErrorBoundaryRoute exact path={`${match.url}owners/:ownerId/stores/:storeId/machines/new`}
                             component={MachinesUpdate} />
         <ErrorBoundaryRoute exact path={`${match.url}owners/:ownerId/stores/:storeId/machines/:machineId/edit`}
                             component={MachinesUpdate} />
         <ErrorBoundaryRoute exact path={`${match.url}owners/:ownerId/stores/:storeId/machines/:machineId`}
                             component={MachinesDetail} />

         <ErrorBoundaryRoute exact path={`${match.url}owners/:ownerId/stores/new`} component={StoresUpdate} />
         <ErrorBoundaryRoute exact path={`${match.url}owners/:ownerId/stores/:storeId/edit`} component={StoresUpdate} />
         <ErrorBoundaryRoute exact path={`${match.url}owners/:ownerId/stores/:storeId`} component={StoresDetail} />

         <ErrorBoundaryRoute exact path={`${match.url}owners/new`} component={OwnersUpdate} />
         <ErrorBoundaryRoute exact path={`${match.url}owners/:ownerId/edit`} component={OwnersUpdate} />
         <ErrorBoundaryRoute exact path={`${match.url}owners/:ownerId`} component={OwnersDetail} />
         <ErrorBoundaryRoute path={match.url} component={Owners} />
       </Switch>
     </div>

    <ErrorBoundaryRoute exact path={`${match.url}owners/:ownerId/stores/:storeId/machines/:machineId/delete`}
                        component={MachinesDeleteDialog} />
    <ErrorBoundaryRoute exact path={`${match.url}owners/:ownerId/stores/:storeId/delete`} component={StoresDeleteDialog} />

    <ErrorBoundaryRoute exact path={`${match.url}owners/:ownerId/delete`} component={OwnersDeleteDialog} />
  </>
);

export default Routes;
