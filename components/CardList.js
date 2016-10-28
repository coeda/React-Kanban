import React from 'react';
import CardItem from './CardItem';
import styles from './Styles.scss';
import dragable from './dragable';

class CardList extends React.Component {
  render() {
    console.log(this.props);
    const queueCardListNode = this.props.queueData.map((dataItem) => {
      return (
        <CardItem loadCards={this.props.loadCards} title={dataItem.title} priority={dataItem.priority} status={dataItem.status} assignedTo={dataItem.assignedTo} createdBy={dataItem.createdBy} id={dataItem.id} key={dataItem.id}/>
      )
    })
    const inProgressCardListNode = this.props.inProgressData.map((dataItem) => {
      return (
        <CardItem loadCards={this.props.loadCards} title={dataItem.title} priority={dataItem.priority} status={dataItem.status} assignedTo={dataItem.assignedTo} createdBy={dataItem.createdBy} id={dataItem.id} key={dataItem.id}/>
      )
    })
    const completedCardListNode = this.props.completedData.map((dataItem) => {
      return (
        <CardItem loadCards={this.props.loadCards} title={dataItem.title} priority={dataItem.priority} status={dataItem.status} assignedTo={dataItem.assignedTo} createdBy={dataItem.createdBy} id={dataItem.id} key={dataItem.id}/>
      )
    })
    return (
      <div className={ styles.CardList }>
        <div id={styles.queue}><h2>Queue</h2>{queueCardListNode}</div>
        <div id={styles.inProgress}><h2>In Progress</h2>{inProgressCardListNode}</div>
        <div id={styles.completed}><h2>Completed</h2>{completedCardListNode}</div>
      </div>
    )
  }
}

export default CardList;