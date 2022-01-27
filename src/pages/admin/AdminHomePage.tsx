import React from 'react';
import { BaseLayout } from '../../components/Layouts/BaseLayout';
import { Box } from 'grommet';
import { AdminConfigForm } from './components/AdminConfigForm';

interface Props {}

export const AdminHomePage: React.FC<Props> = () => {
  return (
    <BaseLayout>
      <AdminConfigForm />
    </BaseLayout>
  );
};

AdminHomePage.displayName = 'AdminPage';
