const SAVE_ACCOUNT = 'SAVE_ACCOUNT';
const SAVE_TOKEN = 'SAVE_TOKEN';
const USER_STATUS = 'USER_STATUS';

// 保存 account
export const saveAccount = (account) => ({
  type: SAVE_ACCOUNT,
  payload: account
});

export const saveToken = (token) => ({
  type: SAVE_TOKEN,
  payload: token
});

export const setStatus = (status) => ({
  type: USER_STATUS,
  payload: status
});

// 初始状态
const initialState = {
  account: undefined,
  token: undefined,
  status: false
};

/**
 * @name userReducer
 */
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_ACCOUNT:
      return {
        ...state,
        account: action.payload
      };
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case USER_STATUS:
      return {
        ...state,
        status: action.payload
      };
    default:
      return state;
  }
}
