export const initialState = {
  users: JSON.parse(localStorage.getItem('users')) || [],
  isAdmin: false,
  db: null,
  error: null,
  reviewCount: parseInt(localStorage.getItem('reviewCount'), 10) || 5,
  //Send a review to code reviewer
  completedTasks: localStorage.getItem('completedTasks')
    ? JSON.parse(localStorage.getItem('completedTasks'))
    : [],
  //submit an approved project
  submitCompletedTasks:
    JSON.parse(localStorage.getItem('submitCompletedTasks')) || [],
  statusOne: localStorage.getItem('statusOne')
    ? JSON.parse(localStorage.getItem('statusOne'))
    : [],
  statusTwo: localStorage.getItem('statusTwo')
    ? JSON.parse(localStorage.getItem('statusTwo'))
    : [],
  CLICKED: JSON.parse(localStorage.getItem('CLICKED')) || false,
  //handling forms in the progress section
  mainPage: JSON.parse(localStorage.getItem('mainPage')) || true,
  requestReviewForm: JSON.parse(localStorage.getItem('requestForm')) || false,
  submitProjectForm:
    JSON.parse(localStorage.getItem('submitProjectForm')) || false,
};
// send a request
export const ADD_COMPLETED_TASK = 'ADD_COMPLETED_TASK';

export const addCompletedTaskWithLink = (
  taskIndex,
  taskName,
  taskLink,
  pullRequestLink
) => ({
  type: ADD_COMPLETED_TASK,
  payload: { taskIndex, taskName, taskLink, pullRequestLink },
});
//code reviewer action
export const REMOVE_COMPLETED_TASK = 'REMOVE_COMPLETED_TASK';

export const removeCompletedTask = (taskIndex) => ({
  type: REMOVE_COMPLETED_TASK,
  payload: taskIndex,
});
//submit an approved project
const SUBMIT_COMPLETED_TASK = 'SUBMIT_COMPLETED_TASK';
export const submitCompletedTasks = (
  taskIndex,
  taskName,
  taskLink,
  submitPullRequestLink
) => ({
  type: SUBMIT_COMPLETED_TASK,
  payload: { taskIndex, taskName, taskLink, submitPullRequestLink },
});

//reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'SET_REVIEW_COUNT':
      return { ...state, reviewCount: action.payload };
    case 'DECREMENT_REVIEW_COUNT':
      return { ...state, reviewCount: state.reviewCount - 1 };
    case 'ADD_USER':
      return { ...state, users: action.payload };
    case 'ADD_COMPLETED_TASK':
      const newTask = {
        taskIndex: action.payload.taskIndex,
        taskName: action.payload.taskName,
        taskLink: action.payload.taskLink,
        pullRequestLink: action.payload.pullRequestLink,
      };
      const updatedTasks = [...state.completedTasks, newTask];
      localStorage.setItem('completedTasks', JSON.stringify(updatedTasks));
      return { ...state, completedTasks: updatedTasks };
    //case to submit an approved project
    case 'SUBMIT_COMPLETED_TASK':
      const newTASKS = {
        taskIndex: action.payload.taskIndex,
        taskName: action.payload.taskName,
        taskLink: action.payload.taskLink,
        submitPullRequestLink: action.payload.submitPullRequestLink,
      };
      const submitUpdate = [...state.submitCompletedTasks, newTASKS];
      localStorage.setItem(
        'submitCompletedTasks',
        JSON.stringify(submitUpdate)
      );
      return { ...state, submitCompletedTasks: submitUpdate };
    case REMOVE_COMPLETED_TASK:
      const reupdatedTasks = state.completedTasks.filter(
        (task) => task.taskIndex !== action.payload
      );
      localStorage.setItem('completedTasks', JSON.stringify(reupdatedTasks));
      return { ...state, completedTasks: reupdatedTasks };
    case 'INIT':
      const iniStatus = [...state.statusOne, action.payload];
      localStorage.setItem('statusOne', JSON.stringify(iniStatus));
      return { ...state, statusOne: iniStatus };
    case 'COMPLETE':
      const newState = state.statusOne.map((s, i) =>
        i === action.payload ? 'Completed' : s
      );
      localStorage.setItem('statusOne', JSON.stringify(newState));
      return { ...state, statusOne: newState };
    case 'INITIAL':
      const iniStatus2 = [...state.statusTwo, action.payload];
      localStorage.setItem('statusTwo', JSON.stringify(iniStatus2));
      return { ...state, statusTwo: iniStatus2 };
    case 'PENDING':
      const newState2 = state.statusTwo.map((s, i) =>
        i === action.payload ? 'Pending' : s
      );
      localStorage.setItem('statusTwo', JSON.stringify(newState2));
      return { ...state, statusTwo: newState2 };
    case 'REQUIRED_CHANGES':
      const newState3 = state.statusTwo.map((s, i) =>
        i === action.payload ? 'Required Changes' : s
      );
      localStorage.setItem('statusTwo', JSON.stringify(newState3));
      return { ...state, statusTwo: newState3 };
    case 'SUBMIT':
      const newState4 = state.statusTwo.map((s, i) =>
        i === action.payload ? 'Submit' : s
      );
      localStorage.setItem('statusTwo', JSON.stringify(newState4));
      return { ...state, statusTwo: newState4 };
    case 'COMPLETED2':
      const newState5 = state.statusTwo.map((s, i) =>
        i === action.payload ? 'Completed' : s
      );
      localStorage.setItem('statusTwo', JSON.stringify(newState5));
      return { ...state, statusTwo: newState5 };
    case 'CLICKED':
      const newClicked = action.payload;
      localStorage.setItem('CLICKED', JSON.stringify(newClicked));
      return { ...state, CLICKED: newClicked };
    //handling forms on progress section
    case 'MAINPAGE':
      const newPage = action.payload;
      localStorage.setItem('mainPage', JSON.stringify(newPage));
      return { ...state, mainPage: newPage };
    case 'REQUESTFORM':
      const newRequestForm = action.payload;
      localStorage.setItem('requestForm', JSON.stringify(newRequestForm));
      return { ...state, requestReviewForm: newRequestForm };
    case 'SUBMITPROJECT':
      const newSubmitProject = action.payload;
      localStorage.setItem(
        'submitProjectForm',
        JSON.stringify(newSubmitProject)
      );
      return { ...state, submitProjectForm: newSubmitProject };
    case 'SET_DB':
      return { ...state, db: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export default reducer;
