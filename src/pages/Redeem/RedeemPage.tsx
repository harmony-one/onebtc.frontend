import * as React from 'react';
import { Box } from 'grommet';
import { BaseContainer, PageContainer } from 'components';
import * as styles from './styles.styl';

import { NavigateTabs } from '../../components/NavigateTabs';
import RedeemForm from './components/RedeemForm/RedeemForm';

export const RedeemPage = () => {
  return (
    <BaseContainer>
      <PageContainer>
        <Box align="center" margin={{ top: 'large', bottom: 'large' }}>
          <Box align="center" className={styles.contentContainer}>
            <NavigateTabs />

            <Box
              fill
              direction="column"
              align="center"
              justify="center"
              pad="medium"
              className={styles.issueContainer}
            >
              <RedeemForm />
            </Box>
          </Box>
        </Box>
      </PageContainer>
    </BaseContainer>
  );
};
