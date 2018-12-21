import React from 'react';
import { DragSource } from 'react-dnd';
import { PropTypes } from 'prop-types';

const Source = ({ categoryType, connectDragSource, isDragging, children }) => (
  connectDragSource(
    <div className={categoryType} style={{opacity: (isDragging? 0.5 : 1)}}>
      { children }
    </div>    
  )
);

Source.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  categoryType: PropTypes.string.isRequired,
}

const source = {
  beginDrag(props) {
    const { componentType } = props;
    return ({
      componentType,
    });
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }
    const { componentType } = monitor.getItem();
    const { targetType } = monitor.getDropResult();
    props.onDrop(componentType, targetType);
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export default DragSource((props) => props.categoryType, source, collect)(Source);