import React from 'react';
import { DropTarget } from 'react-dnd';
import { PropTypes } from 'prop-types';

const Target = ({ connectDropTarget, targetType, children }) => (
  connectDropTarget(
    <div className={`target-container-${targetType}`}>
      {children}
    </div>
  )
);

Target.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  maxNumCount: PropTypes.number.isRequired,
  itemCount: PropTypes.number.isRequired,
  acceptedCategory: PropTypes.string.isRequired
};

const target = {
  canDrop(props) {
    return props.itemCount < props.maxNumCount;
  },
  drop(props) {
    const { targetType } = props;
    return ({
      targetType,
    });
  }
}

const collect = (connect,  monitor) => ({
  connectDropTarget: connect.dropTarget(),
  highlighted: monitor.canDrop(),
});

export default DropTarget(props => props.acceptedCategory, target, collect)(
  Target
);
