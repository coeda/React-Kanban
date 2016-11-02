import React from 'react';
import { receiveCards, showEditCard, editCard, deleteCard } from '../../actions/KanbanActions';
import { connect } from 'react-redux';

updateDataCards(status) {
  event.preventDefault();
  const oReq = new XMLHttpRequest();
  oReq.addEventListener('load', this.onUpdatedData);
  let params = `title=${this.props.title}&priority=${this.props.priority}&status=${status}&createdBy=${this.props.createdBy}&assignedTo=${this.props.assignedTo}&id=${this.props.id}`;
  oReq.open('PUT', `/api/${this.props.id}`);
  oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  oReq.send(params);
};

onUpdatedData(data) {
  const { dispatch } = this.props;
  const parsedCardData = JSON.parse(data.currentTarget.response).data;
  dispatch(receiveCards(parsedCardData));
};


export default connect()(UpdateDataCards);