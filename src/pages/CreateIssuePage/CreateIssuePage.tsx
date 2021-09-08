import * as React from 'react';
import { Box } from 'grommet';
import { BaseContainer, PageContainer } from 'components';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';
import * as styles from './styles.styl';
import { EXCHANGE_MODE, NETWORK_TYPE } from 'stores/interfaces';
import cn from 'classnames';
import { Button, Text } from 'components/Base';
import { NETWORK_ICON, NETWORK_NAME } from '../../stores/names';
import { IssueForm } from './components/IssueForm/IssueForm';
import { DepositModal } from './components/DepositModal';
import { TransactionModalContent } from './components/TransactionModal';
import { LargeTab } from './components/LargeTab/LargeTab';

export const CreateIssuePage = observer((props: any) => {
  return (
    <BaseContainer>
      <PageContainer>
        <Box
          direction="row"
          wrap={true}
          fill={true}
          justify="between"
          align="start"
        >
          <Box
            direction="row"
            wrap={true}
            fill={true}
            justify="center"
            align="start"
            className={styles.base}
            margin={{ top: 'large', bottom: 'large' }}
          >
            <Box>
              {/*<DepositModal amount={123} bitcoinAddress={'0xFbE0741bC1B52dD723A6bfA145E0a15803AC9581'} />*/}
              {/*<TransactionModalContent issueId={'12312'} bridgeFee={0.01} amount={123} bitcoinAddress={'0xFbE0741bC1B52dD723A6bfA145E0a15803AC9581'} />*/}
            </Box>
            <Box direction="column" fill className={styles.contentContainer}>
              <Box
                direction="row"
                justify="between"
                gap="medium"
                margin={{ bottom: 'large' }}
              >
                <LargeTab title="Issue" onClick={() => {}} active={true} />
                <LargeTab title="Redeem" onClick={() => {}} disabled />
                <LargeTab title="Transfer" onClick={() => {}} disabled />
                <LargeTab title="Burn" onClick={() => {}} disabled />
              </Box>
              <Box
                direction="column"
                align="center"
                justify="center"
                fill={true}
                pad="medium"
                className={styles.issueContainer}
              >
                <IssueForm />
              </Box>
            </Box>
          </Box>
        </Box>
      </PageContainer>
    </BaseContainer>
  );
});
