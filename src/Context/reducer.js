export const initialState = {
    studentRequests: JSON.parse(localStorage.getItem('studentRequests')) || [],
    users: JSON.parse(localStorage.getItem('users')) || [],
    reviewCount: parseInt(localStorage.getItem('reviewCount'), 10) || 5,
    click: JSON.parse(localStorage.getItem('click')) || false,
    status:  "Request a review",
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'SET_STUDENT_REQUESTS':
        return { ...state, studentRequests: action.payload };
      case 'SET_REVIEW_COUNT':
        return { ...state, reviewCount: action.payload };
      case 'SET_CLICK':
        return { ...state, click: action.payload };
      case 'SET_STATUS':
        return { ...state, status: action.payload };
      case 'DECREMENT_REVIEW_COUNT':
        return { ...state, reviewCount: state.reviewCount - 1 };
        case 'ADD_USER':
            return { ...state,  users: action.payload};
      default:
        return state;
    }
  }
  
  export default reducer