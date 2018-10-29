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
        default: {
            return state
          }
    }
}