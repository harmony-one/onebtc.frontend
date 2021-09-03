import * as React from 'react';
import { Box } from 'grommet';
import { BaseContainer, PageContainer } from 'components';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';
import * as styles from './styles.styl';
import { NETWORK_TYPE } from 'stores/interfaces';
import cn from 'classnames';
import { Button, Text } from 'components/Base';
import { WalletBalances } from './WalletBalances';
import { NETWORK_ICON, NETWORK_NAME } from '../../stores/names';
import { Issue } from './components/Issue';

const NetworkButton = observer(({ type }: { type: NETWORK_TYPE }) => {
  const { exchange } = useStores();

  return (
    <Button
      className={
        cn()
        // styles.networkButton,
        // exchange.network === type ? styles.active : '',
      }
      style={{
        background: 'white',
        border:
          exchange.network === type
            ? '2px solid #00ADE8'
            : '2px solid rgba(0,0,0,0)',
        color: '#212e5e',
      }}
      onClick={() => exchange.setNetwork(type)}
    >
      <img style={{ marginRight: 10, height: 20 }} src={NETWORK_ICON[type]} />
      {NETWORK_NAME[type]}
    </Button>
  );
});

export const OneBTC = observer((props: any) => {
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
            justify="between"
            align="start"
            className={styles.base}
            margin={{top: 'large'}}
          >
            <Box
              direction="column"
              align="center"
              justify="center"
              fill={true}
              pad="medium"
              className={styles.issueContainer}
            >
              <Issue />
            </Box>
            <Box direction="column" margin={{ top: 'large' }}>
              <Box direction="row" justify="start" gap="20px">
                <NetworkButton type={NETWORK_TYPE.BINANCE} />
                <NetworkButton type={NETWORK_TYPE.ETHEREUM} />
              </Box>
              <WalletBalances />
            </Box>
          </Box>
        </Box>
      </PageContainer>
    </BaseContainer>
  );
});
