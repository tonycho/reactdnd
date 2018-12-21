import React from "react";
import ItemWithDnD from "./ItemWithDnD";

class TargetContainer extends React.Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
  }

  moveCard(id, index) {
    this.props.onMove(this.props.targetType, id, index);
  }

  render() {
    const {targetType, items} = this.props;
    return (
      <div>
        {targetType}
        {items.map((item, i) => (
          <ItemWithDnD
            key={item.componentType}
            index={i}
            moveCard={this.moveCard.bind(this)}
            {...item}
          />
        ))}
      </div>
    )    
  }
}

export default TargetContainer;
