export const baseUrl = 'https://norma.nomoreparties.space/api'

export const checkError = (res) => {
  if (!res.ok) {
      return Promise.reject()
  }
  return res.json();
}
