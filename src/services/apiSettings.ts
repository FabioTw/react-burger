export const baseUrl: string = 'https://norma.nomoreparties.space/api'

export const checkError = (res: Response): Promise<any> => {
  if (!res.ok) {
      return Promise.reject()
  }

  return res.json();
}
