import * as React from 'react';
import { Box } from 'grommet';
import * as styles from './TransferPageStyles.styl';

import { NavigateTabs } from '../../components/NavigateTabs';
import TransferForm from './components/TransferForm/TransferForm';
import { BaseLayout } from '../../components/Layouts/BaseLayout';

export const TransferPage = () => {
  return (
    <BaseLayout>
      <Box align="center">
        <Box align="center" className={styles.contentContainer}>
          <NavigateTabs />

          <Box
            fill="horizontal"
            direction="column"
            align="center"
            justify="center"
            pad="medium"
            className={styles.issueContainer}
          >
            <TransferForm />
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  );
};
