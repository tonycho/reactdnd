import React from "react";
import { DropTarget, DragSource } from "react-dnd";
import ComponentType from "./ComponentType";


const Card = props => {
  return props.connectDropTarget(
    <div>
      {props.connectDragSource(
        <div>
          <ComponentType componentType={props.componentType} />
        </div>
      )}
    </div>
  );
};

const typeCard = Symbol.for("@@Type::Card");

const specTarget = {
  drop(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const specSource = {
  beginDrag(props) {
    return {
      id: props.id
    };
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }
    const source = monitor.getItem();
    const target = monitor.getDropResult();

    if (source.id === target.id) {
      return;
    }
    props.moveCard(source.id, target.index);
  }
};

const collectTarget = connect => ({
  connectDropTarget: connect.dropTarget()
});

const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

export default DropTarget(typeCard, specTarget, collectTarget)(
  DragSource(typeCard, specSource, collectSource)(Card)
);