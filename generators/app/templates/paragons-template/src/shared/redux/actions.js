import {Type} from './action-types'

export const updateSessionId = (sessionId) => {
    return {
        type: Type.SESSION_ID_UPDATE,
        count: sessionId
    }
}

export const updateLocale = (locale) => {
    return {
        type: Type.LOCALE_UPDATE,
        count: locale
    }
}

export const updateLanguage = (language) => {
    return {
        type: Type.LANGUAGE_UPDATE,
        count: language
    }
}

export const updateCount = (count) => {
    return {
        type: Type.COUNT_UPDATE,
        count: count
    }
}

export const updateAuthenticatedState= (isAuthenticated) => {
    return {
        type: Type.AUTHENTICATED_STATE,
        isAuthenticated: isAuthenticated
    }
}

export const storeUserInfo = (userInfo) => {
    return {
        type: Type.STORE_USER_INFO,
        userInfo: userInfo
    }
}

export const storeData = (data) => {
    return {
        type: Type.STORE_DATA,
        data: data
    }
}
