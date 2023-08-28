import { works as initialWorks } from '../data';
export const initialState = {
  users: JSON.parse(localStorage.getItem('users')) || null,
  isAuthenticated: false,
  loading: true,
  error: null,
  loginName: localStorage.getItem('loginName') || null,
  reviewCount: parseInt(localStorage.getItem('reviewCount'), 10) || 5,
  //Send a review to code reviewer
  completedTasks: localStorage.getItem('completedTasks')
    ? JSON.parse(localStorage.getItem('completedTasks'))
    : [],
  //submit an approved project
  submitCompletedTasks:
    JSON.parse(localStorage.getItem('submitCompletedTasks')) || [],
  //handling forms in the progress section
  mainPage: JSON.parse(localStorage.getItem('mainPage')) || true,
  requestReviewForm: JSON.parse(localStorage.getItem('requestForm')) || false,
  submitProjectForm:
    JSON.parse(localStorage.getItem('submitProjectForm')) || false,
  works: JSON.parse(localStorage.getItem('works')) || initialWorks,
  codereviewerProgress:
    JSON.parse(localStorage.getItem('reviewerProgress')) || 0,
};
// send a request
export const ADD_COMPLETED_TASK = 'ADD_COMPLETED_TASK';

export const addCompletedTaskWithLink = (
  taskIndex,
  taskName,
  taskLink,
  pullRequestLink,
  studentName
) => ({
  type: ADD_COMPLETED_TASK,
  payload: { taskIndex, taskName, taskLink, pullRequestLink, studentName },
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
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        users: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'LOGIN_NAME':
      const user = action.payload;
      localStorage.setItem('loginName', JSON.stringify(user));
      return {
        ...state,
        loginName: user,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        users: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        users: null,
        isAuthenticated: false,
        loading: true,
        error: action.payload,
      };
    case 'REGISTER_FAILURE':
      return {
        ...state,
        users: null,
        isAuthenticated: false,
        loading: true,
        error: action.payload,
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      return {
        ...state,
        users: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case 'ADD_COMPLETED_TASK':
      const newTask = {
        taskIndex: action.payload.taskIndex,
        taskName: action.payload.taskName,
        taskLink: action.payload.taskLink,
        pullRequestLink: action.payload.pullRequestLink,
        studentName: action.payload.studentName,
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
    case 'UPDATE_TASK_STATUS':
      const { taskIndex, newStatus } = action.payload;
      const updatedWorks = [...state.works]; // Create a copy of the works array

      // Find the task with the given taskIndex
      const taskToUpdate = updatedWorks
        .flatMap((module) =>
          module.blocks.flatMap((block) =>
            block.days.flatMap((day) => day.tasks)
          )
        )
        .find((task) => task.taskIndex === taskIndex);

      if (taskToUpdate) {
        taskToUpdate.status = newStatus; // Update the status
      }

      return {
        ...state,
        works: updatedWorks,
      };
    case 'INCREMENT': {
      const newProgress = state.codereviewerProgress + 1;
      localStorage.setItem('reviewerProgress', newProgress);
      return {
        ...state,
        codereviewerProgress: newProgress,
      };
    }
    default:
      return state;
  }
}

export default reducer;
