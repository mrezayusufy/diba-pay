interface IState {
  timeLeft: number; 
  isLoading: boolean;
}
enum actions {
  setLoading = 'SET_LOADING',
  decrement = 'DECREMENT',
  reset = 'RESET', 
}
type IAction  = 
  | { type: actions.setLoading, payload: boolean}
  | { type: actions.decrement } 
  | { type: actions.reset };

const initialState: IState = {
  timeLeft: 600, 
  isLoading: false,
}
const reducer = (state: IState, action: IAction): IState => {
  switch(action.type) {
    case actions.decrement:
      return {
        ...state,
        timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0,
      };
    case actions.reset:
      return {
        ...state,
        timeLeft: 600
      } 
    case actions.setLoading:
      return {
        ...state,
        isLoading: action.payload 
      }
    default:
      return state;
  }
}
export { reducer, actions, initialState, type IState, type IAction}