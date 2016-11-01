import React from 'react';
import { connect } from 'react-redux';
import { receiveCards, showHideNewCard } from '../../actions/KanbanActions';
import CardList from '../CardList/CardList';
import styles from './CardPageStyles.scss';

class CardPage extends React.Component {
  constructor() {
    super();

    this.onCardData = this.onCardData.bind(this);
    this.onCardError = this.onCardError.bind(this);
    this.loadDataFromCards = this.loadDataFromCards.bind(this);
    this.postDataToCards = this.postDataToCards.bind(this);
    this.showNewCard = this.showNewCard.bind(this);
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
    oReq.addEventListener('load', this.onCardData);
    oReq.open('POST', '/');
    oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    oReq.send(params);
    document.getElementById('newCardForm').reset();
    const { dispatch } = this.props;
    dispatch(showHideNewCard('none'));

  }


  componentWillMount() {
    this.loadDataFromCards();
  }

  showNewCard(){
    const { dispatch } = this.props;
    if(this.props.showHide === 'block'){
      dispatch(showHideNewCard('none'));
    } else {
      dispatch(showHideNewCard('block'));
    }
  }

  render() {
    return (
      <div id={styles.page}>
        <h1>KanBan Board</h1>
        <button onClick={()=>{this.showNewCard()}}>New Card</button>
        <div className={styles.newCard} style={{display:this.props.showHide}}>
          <form id='newCardForm' onSubmit={this.postDataToCards}>
            <input type='text' name='title' ref='title'placeholder='Title'/><br/>
            <select name='priority' ref='priority'>
              <option value='' display='none' default >Priority</option>
              <option value='1'>low</option>
              <option value='2'>medium</option>
              <option value='3'>high</option>
            </select><br/>
            <select name='status' ref='status'>
              <option value='' display='none' default>Status</option>
              <option>queue</option>
              <option>in progress</option>
            </select><br/>
            <input type='text' name='createdBy' ref='createdBy' placeholder='Created by'/><br/>
            <input type='text' name='assignedTo' ref='assignedTo' placeholder='Assigned to'/><br/>
            <button type="submit">Submit</button>
          </form>
          <button onClick={()=>{this.showNewCard()}}>Cancel</button>
        </div>
        <CardList data={this.props.data} editCard={this.props.editCard}/>
      </div>

    )
  }
}

CardPage.defaultProps = {
  data: React.PropTypes.array,
  showHide: React.PropTypes.string,
  editCard: React.PropTypes.string
}

const mapStateToProps = (state, ownProps) => {
  const { kanbanReducer } = state;
  return {
    data: kanbanReducer.get('List').toJS(),
    showHide: kanbanReducer.get('showHide'),
    editCard: kanbanReducer.get('editCard')
  }
}

export default connect(
  mapStateToProps
)(CardPage);