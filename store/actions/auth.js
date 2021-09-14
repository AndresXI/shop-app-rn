import { API_KEY } from '@env'

export const SIGN_UP = 'SIGN_UP'
export const LOGIN = 'LOGIN'

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
    console.log('data', resData)
    dispatch({ type: SIGN_UP })
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
    console.log('data', resData)
    dispatch({ type: LOGIN })
  }
}
