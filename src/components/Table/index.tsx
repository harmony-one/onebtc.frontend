import * as React from 'react';
import { observer } from 'mobx-react';
import { computed, observable } from 'mobx';
import RcTable from 'rc-table';
import { Spinner } from './Spinner';
import 'rc-table/assets/index.css';
import { CustomPagination } from './CustomPagination';
import { CustomHeader } from './CustomHeader';
import styled from 'styled-components';
import { isFilterApplied } from './utils/filters';
import { Text } from '../Base';

import './styles.styl';
import { TableProps } from 'rc-table/es/Table';
import { Box, Card, ResponsiveContext } from 'grommet';

const LoaderWrap = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.tableLoaderBackground};
  opacity: 0.6;
  z-index: 2;
`;

const StyledCard = styled(Card)`
  background-color: ${props => props.theme.surfaceColor};
`;

export interface IColumn<P = any> {
  title?: string | React.ReactNode;
  width: number | string;
  sortable?: boolean;
  dataIndex?: keyof P;
  key: keyof P;
  render?: (value: P, data: P) => React.ReactNode;
  defaultSort?: string;
  filter?: any;
  align?: string;
  className?: string;
}

interface IProps {
  data?: any[];
  columns: IColumn[];
  tableParams?: TableProps;
  theme?: any;
  dataLayerConfig?: any;
  isPending?: boolean;
  hidePagination?: boolean;
  onChangeDataFlow?: (props: any) => void;
  onRowClicked?: (rowData: any, index: number) => any;
  options?: ITableOptions;
  scroll?: { x?: string | number; y?: string | number };
}

export interface ITableOptions {
  checkboxOptionsPromise: (
    fieldName: string,
    params?: any,
  ) => Promise<string[]>;
}

@observer
export class Table extends React.Component<IProps> {
  @observable isLoading: boolean = false;

  hasAnyActiveFilter = () => {
    const { columns, dataLayerConfig } = this.props;

    const { filters = {} } = dataLayerConfig;

    return Object.entries(filters).some(([dataIndex, value]) => {
      const columnConfig = columns.find(c => c.dataIndex === dataIndex);

      if (typeof columnConfig?.filter?.isApplied === 'function') {
        return columnConfig.filter.isApplied(value);
      }

      return isFilterApplied(value);
    });
  };

  @computed
  private get columns() {
    const {
      columns,
      dataLayerConfig,
      onChangeDataFlow,
      options = {},
    } = this.props;

    return columns.map(column => {
      const { title } = column;

      return {
        ...column,
        title: (
          <CustomHeader
            dataLayerConfig={dataLayerConfig}
            hasAnyActiveFilter={false}
            title={title}
            column={column}
            options={options}
            onChangeDataFlow={onChangeDataFlow}
          />
        ),
      };
    });
  }

  componentDidMount() {
    const { columns, dataLayerConfig, onChangeDataFlow } = this.props;
    const sorter = columns
      .filter(col => col.defaultSort)
      .map(col => `${String(col.key)},${col.defaultSort}`);

    if (sorter.length) {
      onChangeDataFlow({ ...dataLayerConfig, sorter });
      return;
    }

    onChangeDataFlow({ ...dataLayerConfig });
  }

  renderCardList() {
    const { data, onRowClicked } = this.props;

    return (
      <Box gap="small">
        {data.map((item, index) => {
          const content = this.props.columns.map(column => {
            return (
              <Box direction="row">
                <Text>{column.title}</Text>:&nbsp;{column.render(item, item)}
              </Box>
            );
          });

          return (
            <StyledCard pad="medium" onClick={() => onRowClicked(item, index)}>
              {content}
            </StyledCard>
          );
        })}
      </Box>
    );
  }

  renderTable() {
    const { data, onRowClicked, tableParams, scroll = {} } = this.props;

    return (
      <RcTable
        {...tableParams}
        data={data}
        columns={this.columns as any}
        emptyText="No data"
        scroll={scroll}
        onRow={(rowData, index) => {
          return {
            onClick: () =>
              onRowClicked instanceof Function && onRowClicked(rowData, index),
            style: {
              cursor: onRowClicked instanceof Function ? 'pointer' : 'auto',
            },
          };
        }}
      />
    );
  }

  renderLoader() {
    if (!this.props.isPending) {
      return null;
    }

    return (
      <LoaderWrap>
        <Spinner style={{ width: 24, height: 24 }} />
      </LoaderWrap>
    );
  }

  renderPagination() {
    const { dataLayerConfig, onChangeDataFlow, hidePagination } = this.props;
    const { paginationData } = dataLayerConfig;

    if (hidePagination) {
      return null;
    }

    return (
      <CustomPagination
        config={paginationData}
        onChange={config => {
          onChangeDataFlow({ paginationData: config });
        }}
      />
    );
  }

  renderContent(size: string) {
    return (
      <div style={{ position: 'relative' }}>
        {this.renderLoader()}
        {size === 'small' && this.renderCardList()}
        {size !== 'small' && this.renderTable()}
        {this.renderPagination()}
      </div>
    );
  }

  render() {
    return (
      <ResponsiveContext.Consumer>
        {size => this.renderContent(size)}
      </ResponsiveContext.Consumer>
    );
  }
}
