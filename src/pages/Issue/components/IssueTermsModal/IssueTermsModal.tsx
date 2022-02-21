import { Box } from 'grommet';
import React from 'react';
import { TActionModalProps } from '../../../../components/ActionModals';
import { Divider, Text, Title } from '../../../../components/Base';
import utils from 'web3-utils';
import { formatWithEightDecimals } from '../../../../utils';

interface Props {
  securityDeposit: string;
  btcAmount: string;
}

export const IssueTermsModalContent: React.FC<Props> = ({
  securityDeposit,
  btcAmount,
}) => {
  return (
    <Box
      pad={{ horizontal: 'medium', vertical: 'medium' }}
      align="center"
      gap="small"
    >
      <Title>Issue Terms</Title>
      <Divider fullwidth colorful />
      <Box direction="row" fill="horizontal" justify="around" pad="medium">
        <Box>
          <Box>
            <Text align="center" bold>
              Issue request
            </Text>
          </Box>
          <Box>
            <Text align="center" bold color="Orange500">
              {btcAmount} BTC
            </Text>
          </Box>
        </Box>
        <Box>
          <Box>
            <Text align="center" bold>
              Security deposit
            </Text>
          </Box>
          <Box>
            <Text align="center" bold color="Orange500">
              {formatWithEightDecimals(utils.fromWei(securityDeposit))} ONE
            </Text>
          </Box>
        </Box>
      </Box>
      <Box>
        <Text inline bold color="Red">
          Amount of BTC:
        </Text>
        <Text>
          1BTC is a fully decentralized system. Please make sure you send the{' '}
          <b>right amount of BTC in a single transaction</b>, we cannot
          guarantee that the vault will return the additional BTC that you sent
          by mistake.
        </Text>
      </Box>
      <Box fill="horizontal">
        <Text inline bold color="Red">
          Destination BTC Address:
        </Text>
        <Text>
          Use vault BTC address only for this issue operation and do NOT send
          tokens to the address more than once - otherwise they will be lost
        </Text>
      </Box>
      <Box>
        <Text inline bold color="Red">
          Security deposit:
        </Text>
        <Text>
          The security deposit is non-refundable in the case when transfer has
          not been made. This is a spam protection - because the issued amount
          is blocked on the vault for 2 days. And other users cannot use this
          collateral.
        </Text>
      </Box>
    </Box>
  );
};

IssueTermsModalContent.displayName = 'IssueTermsModalContent';

export const IssueTermsModal: React.FC<TActionModalProps> = props => {
  const { securityDeposit, btcAmount } = props.actionData.data;

  return (
    <IssueTermsModalContent
      securityDeposit={securityDeposit}
      btcAmount={btcAmount}
    />
  );
};

IssueTermsModal.displayName = 'IssueTermsModal';
