import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_KEY } from '@env'

export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString,
    })
  )
}

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId, token }
}

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    )

    if (!response.ok) {
      const errorResData = await response.json()
      const errorId = errorResData.error.message
      if (errorId === 'EMAIL_EXISTS') {
        throw 'This email exits already'
      }
      throw 'Something went wrong!'
    }

    const resData = await response.json()
    dispatch(authenticate(resData.localId, resData.idToken))

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    )
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    )

    if (!response.ok) {
      const errorResData = await response.json()
      const errorId = errorResData.error.message
      if (errorId === 'EMAIL_NOT_FOUND') {
        throw 'This email could not be found'
      } else if (errorId === 'INVALID_PASSWORD') {
        throw 'This email could not be found'
      }
      throw 'Something went wrong!'
    }

    const resData = await response.json()
    dispatch(authenticate(resData.localId, resData.idToken))

    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    )
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
  }
}

export const logout = () => {
  return { type: LOGOUT }
}
