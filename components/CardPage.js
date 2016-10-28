import React from 'react';
import CardList from './CardList';

class CardPage extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      queueData: [],
      inProgressData: [],
      completedData: []
    };

    this.loadCards = this.loadCards.bind(this);
    this.onCardData = this.onCardData.bind(this);
    this.onCardError = this.onCardError.bind(this);
    this.loadDataFromCards = this.loadDataFromCards.bind(this);
    this.postDataToCards = this.postDataToCards.bind(this);
  }

  loadCards() {
    console.log('transfer completed');
    this.loadDataFromCards('Completed');
    this.loadDataFromCards('InProgress');
    this.loadDataFromCards('Queue');
  }


  onCardData(data) {
    const parsedCardData = JSON.parse(data.currentTarget.response).data;
    switch(parsedCardData[0].status){
      case 'queue':
        this.setState({queueData: parsedCardData});
      break;
      case 'in progress':
        this.setState({inProgressData: parsedCardData});
      break;
      case 'completed':
        this.setState({completedData: parsedCardData});
      break;
    }
  }

  onCardError(error){
  }

  loadDataFromCards(status) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.onCardData);
    oReq.addEventListener('error', this.onCardError);
    oReq.open('GET', this.props.cardUrl + status);
    oReq.send();
  }

  postDataToCards(e) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    let params = `title=${this.refs.title.value}&priority=${this.refs.priority.value}&status=${this.refs.status.value}&createdBy=${this.refs.createdBy.value}&assignedTo=${this.refs.assignedTo.value}`;
    oReq.addEventListener('load', this.loadCards());
    oReq.open('POST', '/');
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.send(params);
    document.getElementById('newCard').reset();
  }


  componentWillMount() {
    this.loadCards();
  }

  render() {
    return (
      <div>
        <h1>Kanban Page</h1>
        <form id='newCard' onSubmit={this.postDataToCards}>
          <input type='text' name='title' ref='title'placeholder='Title'/>
          <select name='priority' ref='priority'>
            <option value='' selected >Priority</option>
            <option value='1'>low</option>
            <option value='2'>medium</option>
            <option value='3'>high</option>
          </select>
          <select name='status' ref='status'>
            <option value='' selected>Status</option>
            <option>queue</option>
            <option>in progress</option>
          </select>
          <input type='text' name='createdBy' ref='createdBy' placeholder='Created by'/>
          <input type='text' name='assignedTo' ref='assignedTo' placeholder='Assigned to'/>
          <button type="submit" >submit</button>
        </form>
        <CardList queueData={this.state.queueData} inProgressData={this.state.inProgressData} completedData={this.state.completedData}/>
      </div>
    )
  }
}

CardPage.defaultProps = {
  data: React.PropTypes.array,
  queueData: React.PropTypes.array,
  inProgressData: React.PropTypes.array,
  completedData: React.PropTypes.array
}

CardPage.defaultProps = {
  data: [],
  queueData: [],
  inProgressData: [],
  completedData: []
}

export default CardPage;