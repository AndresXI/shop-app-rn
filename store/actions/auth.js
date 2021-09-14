import { API_KEY } from '@env'

export const SIGN_UP = 'SIGN_UP'

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
      throw 'Something went wrong!'
    }

    const resData = await response.json()
    console.log('data', resData)
    dispatch({ type: SIGN_UP })
  }
}
