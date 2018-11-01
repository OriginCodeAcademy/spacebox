const initialstate = {
    username: '',
    password: '',
}

export default function LoginReducer(state = initialstate, action) {
    const { payload, type } = action;

    switch (type) {
        case 'UPDATE_USERNAME': {
            return {
                ...state,
                username: payload
            }
        }
        case 'UPDATE_PASSWORD': {
            return {
                ...state,
                password: payload
            }
        }
        case 'POST_LOGIN_REJECTED': {
            return {
                ...state,
                error: payload
            }
        }
        case 'POST_LOGIN_FULFILLED': {
            return {
                ...state,
                token: payload.id,
                userID: payload.userID
            }
        }
        default: {
            return state
          }
    }
}
