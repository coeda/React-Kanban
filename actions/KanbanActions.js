export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const EDIT_CARD = 'EDIT_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const SHOW_EDIT_CARD = 'SHOW_EDIT_CARD';
export const SHOW_HIDE_NEW_CARD = 'SHOW_HIDE_NEW_CARD';


export const receiveCards = (data) => {
  return {
    type: RECEIVE_CARDS,
    data
  };
};

export const editCard = (data, index) => {
  return {
    type: EDIT_CARD,
    data
  };
};

export const deleteCard = (index) => {
  return {
    type: DELETE_CARD,
    index
  };
};

export const showEditCard = (showHide) => {
  return {
    type: SHOW_EDIT_CARD,
    showHide
  };
};

export const showHideNewCard = (showHide) => {
  return {
    type: SHOW_HIDE_NEW_CARD,
    showHide
  };
};