export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const DELETE_CARD = 'DELETE_CARD';

export const receiveCards = (data) => {
  return {
    type: RECEIVE_CARDS,
    data
  };
};

export const deleteCard = (index) => {
  return {
    type: DELETE_CARD,
    index
  };
};