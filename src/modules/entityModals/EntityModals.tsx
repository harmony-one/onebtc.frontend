import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { IssueModal } from './IssueModal';
import { RedeemModal } from './RedeemModal';

interface Props {}

export const EntityModals: React.FC<Props> = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/issues/:issueId`}>
        <IssueModal />
      </Route>
      <Route path={`${path}/redeems/:redeemId?`}>
        <RedeemModal />
      </Route>
    </Switch>
  );
};

EntityModals.displayName = 'EntityModals';
