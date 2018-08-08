import {Type} from "./action-types"

const sessionId = (state = '', action) => {
    switch (action.type) {
        case Type.SESSION_ID_UPDATE:
            return action.sessionId
        default:
            return state
    }
}

const locale = (state = 'en_US', action) => {
    switch (action.type) {
        case Type.LOCALE_UPDATE:
            return action.locale
        default:
            return state
    }
}

const language = (state = 'en', action) => {
    switch (action.type) {
        case Type.LANGUAGE_UPDATE:
            return action.language
        default:
            return state
    }
}

const count = (state = 0, action) => {
    switch (action.type) {
        case Type.COUNT_UPDATE:
            return action.count
        default:
            return state
    }
}

const preloadedData = (state = null, action) => {
    switch (action.type) {
        case Type.STORE_DATA:
            return action.data
        default:
            return state
    }
}

const allReducers = {sessionId, locale, language, count, preloadedData}

export default allReducers