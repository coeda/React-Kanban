import React from 'react';
import styles from './Styles.scss';

class CardItem extends React.Component {
    constructor() {
      super();

      this.updateDataCards = this.updateDataCards.bind(this);
    }

  updateDataCards(status) {
    //this.preventDefault();
    const oReq = new XMLHttpRequest();
    let params = `title=${this.props.title}&
    priority=${this.props.priority}&
    status=${status}&
    createdBy=${this.props.createdBy}&
    assignedTo=${this.props.assignedTo}&
    id=${this.props.id}`;
    //oReq.addEventListener('load', this.loadCards());
    oReq.open('PUT', '/');
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
        statusButton = <button onClick={()=>{this.updateDataCards('in progress')}}>In Progress</button>
      break;
      case 'in progress':
        statusButton = <div><button onClick={()=>{this.updateDataCards('queue')}}>Queue</button><button onClick={()=>{this.updateDataCards('completed')}}>Completed</button></div>
      break;
      case 'completed':
        statusButton = <button onClick={()=>{this.updateDataCards('in progress')}}>In Progress</button>
    }
    return(
      <div className={priority}>
        <h4>Title: {this.props.title}</h4>
        <p>Created By: {this.props.createdBy}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
        <p>{statusButton}</p>
      </div>
    )
  }
}

export default CardItem;