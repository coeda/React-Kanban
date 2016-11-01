import React from 'react';
import { receiveCards, showEditCard, editCard, deleteCard } from '../actions/KanbanActions';
import { connect } from 'react-redux';
import styles from './Styles.scss';

class CardItem extends React.Component {
    constructor() {
      super();

      this.onUpdatedData = this.onUpdatedData.bind(this);
      this.updateDataCards = this.updateDataCards.bind(this);
      this.editDataCard = this.editDataCard.bind(this);
      this.deleteDataCard = this.deleteDataCard.bind(this);
      this.editCards = this.editCards.bind(this);
    }

  onUpdatedData(data) {
    const { dispatch } = this.props;
    const parsedCardData = JSON.parse(data.currentTarget.response).data;
    dispatch(receiveCards(parsedCardData));
  }

  editCards(){
    let selectedItem = document.getElementById(this.props.id).childNodes[1].style.display;
    if(selectedItem === 'block'){
      document.getElementById(this.props.id).childNodes[1].style.display = 'none';
      document.getElementById(this.props.id).childNodes[0].style.display = 'block';
    } else {
      document.getElementById(this.props.id).childNodes[1].style.display = 'block';
      document.getElementById(this.props.id).childNodes[0].style.display = 'none'
    }
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

  editDataCard(e) {
    e.preventDefault();
    console.log(this.refs.id);
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.onUpdatedData);
    let params = `title=${this.refs.title.value}&priority=${this.refs.priority.value}&status=${this.refs.status.value}&createdBy=${this.refs.createdBy.value}&assignedTo=${this.refs.assignedTo.value}`;
    oReq.open('PUT', `/api/${this.props.id}`);
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.send(params);  }

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

  selectedPriority(){
    let priority;
    if (this.props.priority === 1){
    priority = <select name='priority' ref='priority'>
      <option value='1' selected>low</option>
      <option value='2'>medium</option>
      <option value='3'>high</option>
    </select>;
    } else if (this.props.priority === 2) {
    priority = <select name='priority' ref='priority'>
      <option value='1'>low</option>
      <option value='2' selected>medium</option>
      <option value='3'>high</option>
    </select>;
    } else {
    priority = <select name='priority' ref='priority'>
      <option value='1'>low</option>
      <option value='2'>medium</option>
      <option value='3' selected>high</option>
    </select>;
    }
    return priority;
  }

  selectedQueue(){
    let queue;
    if(this.props.status === 'queue'){
      queue = <select name='status' ref='status' placeholder={this.props.status}>
        <option selected>queue</option>
        <option>in progress</option>
        <option>completed</option>
      </select>;
    } else if(this.props.status === 'in progress') {
      queue = <select name='status' ref='status' placeholder={this.props.status}>
        <option>queue</option>
        <option selected>in progress</option>
        <option>completed</option>
      </select>;
    } else {
      queue = <select name='status' ref='status' placeholder={this.props.status}>
        <option>queue</option>
        <option>in progress</option>
        <option selected>completed</option>
      </select>;
    }
    return queue;
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
        statusButton = <div><button className={styles.rightButton} onClick={()=>{this.updateDataCards('in progress')}}><span>In Progress</span></button></div>
      break;
      case 'in progress':
        statusButton = <div><button className={styles.leftButton} onClick={()=>{this.updateDataCards('queue')}}><span>Queue</span></button>
        <button className={styles.rightButton} onClick={()=>{this.updateDataCards('completed')}}><span>Completed</span></button></div>
      break;
      case 'completed':
        statusButton = <div><button className={styles.leftButton} onClick={()=>{this.updateDataCards('in progress')}}><span>In Progress</span></button></div>
    }
    return(
      <div className={priority} style={{display:'block'}} id={this.props.id}>
        <div id='cardData' className={styles.cardData}>
          <h4>Title: {this.props.title}</h4>
          <p>Created By: {this.props.createdBy}</p>
          <p>Assigned To: {this.props.assignedTo}</p>
          <p>{statusButton}</p>
          <p><button className={styles.editButton} onClick={()=> {this.editCards()}}>Edit</button><button className={styles.deleteButton}onClick={()=> {this.deleteDataCard()}}>Delete</button></p>
        </div>
        <div id='editCard' className={styles.cardData} style={{display:this.props.editCard}}>
          <form id='editCardForm' onSubmit={this.editDataCard}>
          Title: <input type='text' name='title' ref='title' placeholder={this.props.title} /><p/>
          Priority: {this.selectedPriority()}
          <p/>
          Status: {this.selectedQueue()}
          <p/>
          Created by: <input type='text' name='createdBy' ref='createdBy' placeholder={this.props.createdBy} /><p/>
          Assigned to: <input type='text' name='assignedTo' ref='assignedTo' placeholder={this.props.assignedTo} /><p/>
          <button onClick={()=> {this.editCards()}} type="submit">submit</button>
          </form>
          <button onClick={()=> {this.editCards()}}>cancel</button>
        </div>
      </div>
    )
  }
}

export default connect()(CardItem);