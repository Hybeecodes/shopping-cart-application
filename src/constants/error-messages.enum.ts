export enum ErrorMessages {
  INVALID_EMAIL_PASSWORD = 'Invalid Email or Password',
  EMAIL_EXISTS = 'Email Exists Already',
  USER_WITH_EMAIL_NOT_FOUND = 'User with email not Found',
  DISPLAY_NAME_EXISTS = 'Display Name Exists Already',
  REGISTER_USER_FAILED = 'Error Occurred While creating new User',
  FORGOT_PASSWORD_FAILED = 'Forgot Password Failed',
  RESET_PASSWORD_FAILED = 'Reset Password Failed',
  INVALID_RESET_HASH = 'Invalid Reset Hash',
  INVALID_CONFIRM_PASSWORD = 'Invalid Confirm Password',
  CREATE_QUESTION_FAILED = 'Error Occurred While creating new Question',
  QUESTION_NOT_FOUND = 'Question Not Found',
  GET_QUESTION_FAILED = 'Unable to Fetch Question Details',
  GET_ALL_QUESTIONS_FAILED = 'Unable to Fetch All Questions',
  GET_ALL_USER_QUESTIONS_FAILED = 'Unable to Fetch All User Questions',
  DOWNVOTE_QUESTION_FAILED = 'Unable to Downvote Question',
  UPVOTE_QUESTION_FAILED = 'Unable to Upvote Question',
  USER_UNAUTHORIZED = 'User Unauthorized',
  UPDATE_QUESTION_FAILED = 'Unable to Update Question',
  CREATE_ANSWER_FAILED = 'Unable to Create Answer',
  UPDATE_ANSWER_FAILED = 'Unable to Update Answer',
  GET_ANSWER_FAILED = 'Unable to Fetch Answer',
  ANSWER_NOT_FOUND = 'Answer Not Found',
  GET_ALL_ANSWERS_FAILED = 'Unable to Get All Answers',
  UPVOTE_ANSWER_FAILED = 'Unable to upvote Answer',
  DOWNVOTE_ANSWER_FAILED = 'Unable to downvote Answer',
  USER_NOT_PERMMITED_TO_UPDATE_ANSWER = 'User Not Permitted to Update Answer',
  USER_NOT_PERMMITED_TO_UPDATE_QUESTION = 'User Not Permitted to Update Question',
  USER_NOT_FOUND = 'User Not Found',
  GET_USER_BY_ID_FAILED = 'Unable to Fetch User by ID',
  GET_USER_BY_EMAIL_FAILED = 'Unable to Fetch User by Email',
  NO_AUTH_ERROR = 'No Auth Supplied',
  INVALID_AUTH_TOKEN_SUPPLIED = 'Invalid Auth Token Supplied',
  QUESTION_SUBSCRIPTION_FAILED = 'Question Subscription Failed',
  GET_QUESTION_SUBSCRIPTION_FAILED = 'Get Question Subscriptions Failed',
  QUESTION_UNSUBSCRIPTION_FAILED = 'Unable to Unsubscribe from Question',
  ADD_TO_CART_FAILED = 'Unable to Add Product to Cart',
  GET_USER_CART_FAILED = 'Unable to Get User Cart',
  CLEAR_CART_FAILED = 'Unable to Clear User Cart'
}
