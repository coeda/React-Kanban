import React from 'react';
import { receiveCards, showEditCard, editCard, deleteCard } from '../../actions/KanbanActions';
import { connect } from 'react-redux';
import styles from './CardItemStyles.scss';
import buttonStyles from './ButtonStyles.scss';

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
      document.getElementById(this.props.id).childNodes[0].style.display = 'none';
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
    priority = '1'
    } else if (this.props.priority === 2) {
    priority = '2'
    } else {
    priority = '3'
    }
    return <select name='priority' ref='priority' defaultValue={priority}>
      <option value='1'>Low</option>
      <option value='2'>Medium</option>
      <option value='3'>High</option>
    </select>
  }

  selectedQueue(){
    let value;
    if(this.props.status === 'queue'){
      value = 'queue';
    } else if(this.props.status === 'in progress') {
      value = 'in progress';
    } else {
      value = 'completed';
    }

    return <select name='status' ref='status' defaultValue={value}>
        <option value='queue'>Queue</option>
        <option value='in progress'>In Progress</option>
        <option value='completed'>Completed</option>
      </select>
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
        statusButton = <div><button className={buttonStyles.rightButton} onClick={()=>{this.updateDataCards('in progress')}}><span>In Progress </span></button></div>
      break;
      case 'in progress':
        statusButton = <div><button className={buttonStyles.leftButton} onClick={()=>{this.updateDataCards('queue')}}><span> Queue</span></button>
        <button className={buttonStyles.rightButton} onClick={()=>{this.updateDataCards('completed')}}><span>Completed </span></button></div>
      break;
      case 'completed':
        statusButton = <div><button className={buttonStyles.leftButton} onClick={()=>{this.updateDataCards('in progress')}}><span> In Progress</span></button></div>
    }
    return(
      <div className={styles.cardItem} style={{display:'block'}} id={this.props.id}>
        <div id='cardData' className={priority}>
          <h2>{this.props.title}</h2>
          <h4>Created By: {this.props.createdBy}</h4>
          <h4>Assigned To: {this.props.assignedTo}</h4>
          {statusButton}
          <button className={buttonStyles.editButton} onClick={()=> {this.editCards()}}>Edit</button><button className={buttonStyles.deleteButton}onClick={()=> {this.deleteDataCard()}}>Delete</button>
        </div>
        <div id='editCard' className={priority} style={{display:this.props.editCard}}>
          <form id='editCardForm' onSubmit={this.editDataCard}><p/>
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