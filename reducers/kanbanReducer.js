import { List, Map } from 'immutable';
import { RECEIVE_CARDS, EDIT_CARD, DELETE_CARD, SHOW_EDIT_CARD, SHOW_HIDE_NEW_CARD } from '../actions/KanbanActions';

const initialState = Map({List: List(), showHide: 'none', editCard: 'none'});

const kanbanReducer = (state=initialState, action) => {
  switch(action.type) {
    case RECEIVE_CARDS:
      return state.set('List', List(action.data));

    case EDIT_CARD:
      return state.set('List',state.get('LIST').set(`index:${action.index}, value:${action.data}`));

    case DELETE_CARD:
      return state.set('List', state.get('List').delete(action.index));

    case SHOW_EDIT_CARD:
     return state.set('editCard', action.showHide);

    case SHOW_HIDE_NEW_CARD:
      return state.set('showHide', action.showHide);

    default:
      return state;
  }
};

export default kanbanReducer;
