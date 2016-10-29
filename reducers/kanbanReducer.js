import { List } from 'immutable';
import { Map } from 'immutable';
import { RECEIVE_CARDS, DELETE_CARD, SHOW_HIDE_NEW_CARD } from '../actions/KanbanActions';

const initialState = Map({List: List(), showHide: 'none'});

const kanbanReducer = (state=initialState, action) => {
  switch(action.type) {
    case RECEIVE_CARDS:
      return state.set('List', List(action.data));
    break;

    case DELETE_CARD:
      return state.set('List', state.get('List').delete(action.index));
    break;

    case SHOW_HIDE_NEW_CARD:
      return state.set('showHide', action.showHide);
    break;

    default:
      return state;
  }
};

export default kanbanReducer;
