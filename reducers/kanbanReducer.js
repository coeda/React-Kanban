import { List } from 'immutable';
import { RECEIVE_CARDS } from '../actions/KanbanActions';
import { DELETE_CARD } from '../actions/KanbanActions';

const initialState = List();

const kanbanReducer = (state=initialState, action) => {
  switch(action.type) {
    case RECEIVE_CARDS:
      return List(action.data);
    break;
    case DELETE_CARD:
      return state.delete(action.index);
    default:
      return state;
  }
}

export default kanbanReducer;
