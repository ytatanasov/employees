import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

const Actions = ({ actions, currentData, icons }) => (
  <>
    {
      actions.edit && (
        <Button
          icon={icons}
          md
          content="&#9998;"
          handleClick={() => actions.edit(currentData)}
          title="Edit"
        />
      )}
    {
      actions.delete && (
        <Button
          icon={icons}
          md
          danger
          content="&#10007;"
          handleClick={() => actions.delete(currentData.id)}
          title="Remove"
        />
      )
    }
  </>
);

Actions.propTypes = {
  actions: PropTypes.shape({
    onEdit: PropTypes.func,
    onPreview: PropTypes.func
  }),
  currentData: PropTypes.objectOf(PropTypes.any),
  icons: PropTypes.bool
};

export default Actions;

