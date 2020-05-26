import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Actions from '../Actions/Actions';
import TableHeader from './TableHeader/TableHeader';

import { KEY_CODES, ROUTES, TABLE_OPTIONS } from '../../utils/constants';

import arrow from '../../assets/arrow.png';
import styles from './Table.module.scss';

const Table = ({
  actions = null,
  handleButtonClick,
  handleInputChange,
  sortConfig,
  sortTableByColumn,
  tableHeader,
  tableData,
  title,
  filterValue
}) => {
  /**
   * Sort the table by column
   * @param {string} sortBy
   * @param {string} sortType
   */
  const handleClickHeader = (sortBy, sortType) => {
    if (sortBy) {
      sortTableByColumn(sortBy, sortType);
    }
  };

  /**
   * Handles key down on th elements and sort them if pressedKey is Enter or Space
   * @param event
   * @param {string} sortBy
   * @param {string} sortType
   */
  const handleKeyDown = (event, sortBy, sortType) => {
    const pressedKey = event.which;

    if (pressedKey === KEY_CODES.enter || pressedKey === KEY_CODES.space) {
      event.preventDefault();

      handleClickHeader(sortBy, sortType);
    }
  };

  /**
   * Generates table header based on tableHeader array
   * @returns {*}
   */
  const renderTableHeader = () => {
    const headRowClasses = [styles.row, styles.rowHead];
    const headColumnClasses = [styles.column, styles.columnHead];

    return (
      <thead>
      <tr className={headRowClasses.join(' ')}>
        {tableHeader.map(headerColumn => {
            const arrowClasses = [styles.arrow];
            headerColumn.sortBy === sortConfig.sortBy
            && arrowClasses.push(styles[TABLE_OPTIONS.arrowsClasses[sortConfig.order]]);

            return (
              <th
                key={headerColumn.name}
                className={headColumnClasses.join(' ')}
                tabIndex="0"
                onKeyDown={event => handleKeyDown(event, headerColumn.sortBy, headerColumn.sortType)}
                onClick={() => handleClickHeader(headerColumn.sortBy, headerColumn.sortType)}
              >
                {headerColumn.name}
                {headerColumn.sortBy && (
                  <span className={arrowClasses.join(' ')}>
                <img src={arrow} alt="Sort arrow" />
              </span>
                )}
              </th>
            )
          }
        )}
        {actions && <th width={Object.keys(actions).length * TABLE_OPTIONS.singleActionWidth} />}
      </tr>
      </thead>
    );
  };

  /**
   * Generates a single table row for each data unit in the tableData
   * The columns are generated based on the tableHeader config
   * If a table data is an object with path, generates the td with a Link to that path
   * @param row {object}
   * @returns {*}
   */
  const renderTableRowContent = row => {
    if (row.data && row.data.length === 0) {
      return null;
    }

    const rowContent = Object.values(tableHeader).map(column => {
      const columnData = row[column.dataKey] || '-';
      const columnContent = column.dataKey === 'employee_name'
        ? <Link className={styles.link} to={`${ROUTES.employee}/${row.id}`}>{columnData}</Link>
        : <span>{columnData}</span>;

      return (
        <td key={column.name} className={styles.column}>
          {column.dataKey === 'employee_salary' && '$'}
          {columnContent}
        </td>
      );
    });

    return (
      <tr
        key={row.id}
        className={styles.row}
      >
        {rowContent}
        <td>
          <Actions actions={actions} currentData={row} icons />
        </td>
      </tr>
    );
  };

  /**
   * Generates table body based on the tableData and tableHeader
   * @returns {*}
   */
  const renderTableBody = () => (
    <tbody>
    {
      (tableData && tableData.length > 0)
        ? tableData.map(bodyRow => renderTableRowContent(bodyRow))
        : (
          <tr className={styles.noContentRow}>
            <td colSpan={tableHeader.length} className={styles.noContentCell}>
              No {title} Found
            </td>
          </tr>
        )
    }
    </tbody>
  );

  return (
    <section className={styles.TableWrapper}>
      <TableHeader
        title={title}
        placeholder={`Search ${title}`}
        filterValue={filterValue}
        handleInputChange={handleInputChange}
        handleButtonClick={handleButtonClick}
      />
      <table className={styles.table}>
        {renderTableHeader()}
        {renderTableBody()}
      </table>
    </section>
  );
};

Table.propTypes = {
  actions: PropTypes.shape({ ...Actions.propTypes }),
  handleButtonClick: PropTypes.func,
  handleInputChange: PropTypes.func,
  sortConfig: PropTypes.shape({
    sortBy: PropTypes.string,
    order: PropTypes.string
  }),
  sortTableByColumn: PropTypes.func,
  tableHeader: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  filterValue: PropTypes.string
};

export default Table;
