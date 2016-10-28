import React from 'react';
import { connect } from 'react-redux';
import { receiveCards } from '../actions/KanbanActions';
import CardList from './CardList';

class CardPage extends React.Component {
  constructor() {
    super();

    this.onCardData = this.onCardData.bind(this);
    this.onCardError = this.onCardError.bind(this);
    this.loadDataFromCards = this.loadDataFromCards.bind(this);
    this.postDataToCards = this.postDataToCards.bind(this);
  }

  onCardData(data) {
    const { dispatch } = this.props;
    const parsedCardData = JSON.parse(data.currentTarget.response).data;
    dispatch(receiveCards(parsedCardData));
  }

  onCardError(error){
    console.error(error);
  }

  loadDataFromCards() {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.onCardData);
    oReq.addEventListener('error', this.onCardError);
    oReq.open('GET', this.props.cardUrl);
    oReq.send();
  }

  postDataToCards(e) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    let params = `title=${this.refs.title.value}&priority=${this.refs.priority.value}&status=${this.refs.status.value}&createdBy=${this.refs.createdBy.value}&assignedTo=${this.refs.assignedTo.value}`;
    oReq.addEventListener('load', this.loadDataFromCards());
    oReq.open('POST', '/');
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.send(params);
    document.getElementById('newCard').reset();
  }


  componentWillMount() {
    this.loadDataFromCards();
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
        <CardList data={this.props.data}
        loadDataFromCards={this.loadDataFromCards}/>
      </div>
    )
  }
}

CardPage.defaultProps = {
  data: React.PropTypes.array,
}

const mapStateToProps = (state, ownProps) => {
  const { kanbanReducer } = state;
  return {
    data: kanbanReducer.toJS()
  }
}

export default connect(
  mapStateToProps
)(CardPage);