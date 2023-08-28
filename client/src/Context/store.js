import { createContext, useEffect, useReducer, useState } from 'react';
import reducer, { initialState } from './reducer';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);
  const [completedT, setCompletedT] = useState(0);
  useEffect(() => {
    localStorage.setItem('works', JSON.stringify(state.works));
  }, [state.works]);
  // Calculate progress percentage whenever works data changes
  useEffect(() => {
    const totalTasks = state.works.flatMap((module) =>
      module.blocks.flatMap((block) => block.days.flatMap((day) => day.tasks))
    ).length;

    const completedTasks = state.works.flatMap((module) =>
      module.blocks.flatMap((block) =>
        block.days.flatMap((day) =>
          day.tasks.filter((task) => task.status === 'Completed')
        )
      )
    ).length;
    setCompletedT(completedTasks);
    setTotal(totalTasks);
    const percentage = ((completedTasks / totalTasks) * 100).toFixed(1);
    setProgress(percentage);
  }, [state.works]);
  const updateTaskStatus = (taskIndex, newStatus) => {
    dispatch({
      type: 'UPDATE_TASK_STATUS',
      payload: {
        taskIndex,
        newStatus,
      },
    });
  };

  return (
    <StoreContext.Provider
      value={{ state, dispatch, updateTaskStatus, progress, total, completedT }}
    >
      {children}
    </StoreContext.Provider>
  );
};
