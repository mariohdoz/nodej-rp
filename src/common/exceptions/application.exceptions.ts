export class ApplicationException extends Error {

  constructor(message = 'An unexpected error ocurred.') {
    console.log(message)
    super(message)
  }

}