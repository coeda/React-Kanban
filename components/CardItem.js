import React from 'react';
import { receiveCards, deleteCard } from '../actions/KanbanActions';
import { connect } from 'react-redux';
import styles from './Styles.scss';

class CardItem extends React.Component {
    constructor() {
      super();

      this.onUpdatedData = this.onUpdatedData.bind(this);
      this.updateDataCards = this.updateDataCards.bind(this);
    }

  onUpdatedData(data) {
    const { dispatch } = this.props;
    const parsedCardData = JSON.parse(data.currentTarget.response).data;
    dispatch(receiveCards(parsedCardData));
  }

  updateDataCards(status) {
    event.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.onUpdatedData);
    let params = `title=${this.props.title}&priority=${this.props.priority}&status=${status}&createdBy=${this.props.createdBy}&assignedTo=${this.props.assignedTo}&id=${this.props.id}`;
    oReq.open('PUT', `/api/${this.props.id}`);
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.send(params);
  }

  deleteDataCard(){
    event.preventDefault();
    const { dispatch, index } = this.props;
    dispatch(deleteCard(index));
    const oReq = new XMLHttpRequest();
    let params = `id=${this.props.id}`;
    oReq.open('DELETE', `/api/${this.props.id}`);
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.send(params);
  }

  render() {
    let priority;
    switch(this.props.priority){
      case 1:
        priority = styles.low;
      break;
      case 2:
        priority = styles.medium;
      break;
      case 3:
        priority = styles.high;
      break;
    }

    let statusButton;
    switch(this.props.status){
      case 'queue':
        statusButton = <div><button onClick={()=>{this.updateDataCards('in progress')}}>In Progress</button>
        <p><button onClick={()=> {this.deleteDataCard()}}>Delete</button></p></div>
      break;
      case 'in progress':
        statusButton = <div><button onClick={()=>{this.updateDataCards('queue')}}>Queue</button>
        <button onClick={()=>{this.updateDataCards('completed')}}>Completed</button>
        <p><button onClick={()=> {this.deleteDataCard()}}>Delete</button></p></div>
      break;
      case 'completed':
        statusButton = <div><button onClick={()=>{this.updateDataCards('in progress')}}>In Progress</button>
        <p><button onClick={()=> {this.deleteDataCard()}}>Delete</button></p></div>
    }
    return(
      <div className={styles.cardItem} id={priority}>
        <h4>Title: {this.props.title}</h4>
        <p>Created By: {this.props.createdBy}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
        <p>{statusButton}</p>

      </div>
    )
  }
}

export default connect()(CardItem);