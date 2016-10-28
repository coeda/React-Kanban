import React from 'react';
import CardItem from './CardItem';
import styles from './Styles.scss';
import dragable from './dragable';

class CardList extends React.Component {

  render() {
    let cardList = this.props.data.map((data, index)=> {
      data.index = index;
      return data
    })

      let queueCardList = cardList.filter((data) => {
        if(data.status === 'queue'){
          return data;
        }
      })
      let inProgressCardList = cardList.filter((data) => {
        if(data.status === 'in progress'){
          return data;
        }
      })
      let completedCardList = cardList.filter((data) => {
        if(data.status === 'completed'){
          return data;
        }
      })

    const queueCardListNode = queueCardList.map((dataItem) => {
      return (
        <CardItem loadDataFromCards={this.props.loadDataFromCards}
        title={dataItem.title}
        priority={dataItem.priority}
        status={dataItem.status}
        assignedTo={dataItem.assignedTo}
        createdBy={dataItem.createdBy}
        id={dataItem.id}
        key={dataItem.id}
        index={dataItem.index}/>
      )
    })
    const inProgressCardListNode = inProgressCardList.map((dataItem) => {
      return (
        <CardItem loadDataFromCards={this.props.loadDataFromCards}
        title={dataItem.title}
        priority={dataItem.priority}
        status={dataItem.status}
        assignedTo={dataItem.assignedTo}
        createdBy={dataItem.createdBy}
        id={dataItem.id}
        key={dataItem.id}
        index={dataItem.index}/>
      )
    })
    const completedCardListNode = completedCardList.map((dataItem) => {
      return (
        <CardItem loadDataFromCards={this.props.loadDataFromCards}
        title={dataItem.title}
        priority={dataItem.priority}
        status={dataItem.status}
        assignedTo={dataItem.assignedTo}
        createdBy={dataItem.createdBy}
        id={dataItem.id}
        key={dataItem.id}
        index={dataItem.index}/>
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