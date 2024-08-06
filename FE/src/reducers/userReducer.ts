import { IUser } from "../interfaces/User";

type State = {
  users: IUser[];
};

type Action = {
  type: string;
  payload: any;
};

const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };

    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };

    case "REMOVE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    default:
      return state;
  }
};

export default userReducer;
