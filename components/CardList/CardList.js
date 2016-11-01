import React from 'react';
import CardItem from '../CardItem/CardItem';
import { connect } from 'react-redux';
import styles from './CardListStyles.scss';

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
    });
    let inProgressCardList = cardList.filter((data) => {
      if(data.status === 'in progress'){
        return data;
      }
    });
    let completedCardList = cardList.filter((data) => {
      if(data.status === 'completed'){
        return data;
      }
    });

    const queueCardListNode = queueCardList.map((dataItem) => {
      return (
        <CardItem title={dataItem.title}
        priority={dataItem.priority}
        status={dataItem.status}
        assignedTo={dataItem.assignedTo}
        createdBy={dataItem.createdBy}
        id={dataItem.id}
        key={dataItem.id}
        index={dataItem.index}
        editCard={this.props.editCard}/>
      )
    })
    const inProgressCardListNode = inProgressCardList.map((dataItem) => {
      return (
        <CardItem title={dataItem.title}
        priority={dataItem.priority}
        status={dataItem.status}
        assignedTo={dataItem.assignedTo}
        createdBy={dataItem.createdBy}
        id={dataItem.id}
        key={dataItem.id}
        index={dataItem.index}
        editCard={this.props.editCard}/>
      )
    })
    const completedCardListNode = completedCardList.map((dataItem) => {
      return (
        <CardItem title={dataItem.title}
        priority={dataItem.priority}
        status={dataItem.status}
        assignedTo={dataItem.assignedTo}
        createdBy={dataItem.createdBy}
        id={dataItem.id}
        key={dataItem.id}
        index={dataItem.index}
        editCard={this.props.editCard}/>
      )
    })
    return (
      <div className={ styles.CardList }>
        <div className={styles.list}><h2>Queue</h2>{queueCardListNode}</div>
        <div className={styles.list}><h2>In Progress</h2>{inProgressCardListNode}</div>
        <div className={styles.list}><h2>Completed</h2>{completedCardListNode}</div>
      </div>
    )
  }
}

export default connect()(CardList);