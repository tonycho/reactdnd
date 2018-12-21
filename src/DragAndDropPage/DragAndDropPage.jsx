import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Source from './Source';
import Target from './Target';
import TargetContainer from "./TargetContainer";
import ComponentType from './ComponentType';
import './index.css';
import { ITEM } from './itemTypes';

class DragAndDropPage extends Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.state = {
      leftFilterComponents: [],
      contentComponents: [],
      rightFilterComponents: []
    };
  }

  handleDrop(componentType, targetType) {
    const targetTypeStateId = targetType + "Components";
    const drops = this.state[targetTypeStateId];

    const nextDrops = [
      ...drops,
      {
        componentType,
        id: drops.length
      }
    ];

    this.setState({
      [targetTypeStateId]: nextDrops
    });
  }

  handleMove(targetType, id, index) {
    const targetTypeStateId = targetType + "Components";
    const items = this.state[targetTypeStateId];
    const sourceCard = items.find(card => card.id === id);
    const sortCards = items.filter(card => card.id !== id);

    debugger;
    sortCards.splice(index, 0, sourceCard);
    this.setState({
      [targetTypeStateId]: sortCards
    });
  }

  render() {
    const {
      leftFilterComponents,
      contentComponents,
      rightFilterComponents
    } = this.state;
    return (
      <div className="container">
        <div className="target-container">
          <Target
            targetType="leftFilter"
            maxNumCount={1}
            itemCount={leftFilterComponents.length}
            acceptedCategory={ITEM.FILTER_COMP}
          >
            <TargetContainer
              onMove={this.handleMove}
              targetType="filter"
              items={leftFilterComponents}
            />
          </Target>
          <Target
            targetType="content"
            maxNumCount={10}
            itemCount={contentComponents.length}
            acceptedCategory={ITEM.DATA_VISUAL_COMP}
          >
            <TargetContainer
              onMove={this.handleMove}
              targetType="content"
              items={contentComponents}
            />
          </Target>
          <Target
            targetType="rightFilter"
            maxNumCount={1}
            itemCount={rightFilterComponents.length}
            acceptedCategory={ITEM.FILTER_COMP}
          >
            <TargetContainer
              tonMove={this.handleMove}
              targetType="filter"
              items={rightFilterComponents}
            />
          </Target>
        </div>
        <div className="source-container">
          <Source
            onDrop={this.handleDrop}
            categoryType={ITEM.FILTER_COMP}
            componentType="Filter"
          >
            <ComponentType componentType="Filter" />
          </Source>
          <Source
            onDrop={this.handleDrop}
            categoryType={ITEM.DATA_VISUAL_COMP}
            componentType="Table"
          >
            <ComponentType componentType="Table" />
          </Source>
          <Source
            onDrop={this.handleDrop}
            categoryType={ITEM.DATA_VISUAL_COMP}
            componentType="List"
          >
            <ComponentType componentType="List" />
          </Source>
          <Source
            onDrop={this.handleDrop}
            categoryType={ITEM.DATA_VISUAL_COMP}
            componentType="Button"
          >
            <ComponentType componentType="Button" />
          </Source>
        </div>
      </div>
    );
  }
}
export default DragDropContext(HTML5Backend)(DragAndDropPage);