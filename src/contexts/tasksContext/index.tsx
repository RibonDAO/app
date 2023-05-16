import { theme, useCompletedTasks, useTasksStatistics } from "@ribon.io/shared";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { TASKS } from "utils/constants/Tasks";
import { useCurrentUser } from "contexts/currentUserContext";
import { showToast } from "lib/Toast";
import { useTranslation } from "react-i18next";
import TasksStatistics from "@ribon.io/shared/types/apiResponses/TasksStatistics";

export type TaskState = {
  id: string;
  done: boolean;
  expiresAt: any | null;
  timesCompleted: any;
  lastCompletedAt: string | null;
  type?: string;
};

export interface ITasksContext {
  tasksState: TaskState[];
  tasksStatistics?: TasksStatistics;
  hasCompletedATask: boolean;
  finishTask: (taskTitle: string) => void;
  reload: () => void;
  setHasCompletedATask: (value: boolean) => void;
}

export const TasksContext = createContext<ITasksContext>({} as ITasksContext);

function TasksProvider({ children }: any) {
  const {
    tasksStatistics,
    completeAllTasks,
    updateStreak,
    refetchTasksStatistics,
  } = useTasksStatistics();

  const { findCompletedTasks, completeTask } = useCompletedTasks();
  const { currentUser, signedIn } = useCurrentUser();
  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.tasksContext",
  });

  const [hasCompletedATask, setHasCompletedATask] = useState<boolean>(false);
  const [tasksState, setTasksState] = useState<TaskState[]>([]);
  const [showedCompletedTasksToast, setShowedCompletedTasksToast] =
    useState<boolean>(false);

  const hasUser = currentUser && signedIn && currentUser.email;

  /**
   * Refetch the /user/completed-tasks endpoint and update the tasksState
   * with the new data.
   *
   * This function is called when the user completes a task or when the
   * component mounts.
   *
   * @returns void
   */
  const reload = async () => {
    await findCompletedTasks().then((completedTasks) => {
      const state = TASKS.map((task) => {
        const currentTask = completedTasks.find(
          (ts) => ts.taskIdentifier === task.id,
        );

        return {
          id: task.id,
          done: currentTask?.done || false,
          timesCompleted: currentTask?.timesCompleted || 0,
          lastCompletedAt: currentTask?.lastCompletedAt || null,
          expiresAt: currentTask?.expiresAt || null,
          type: task.id.split("-")[0],
        };
      });

      setTasksState(state);
    });
  };

  /**
   * Mark a task as completed and update the tasksState. This function also shows
   * a toast when all daily tasks are completed.
   * @param taskTitle string
   * @returns void
   */
  const finishTask = async (taskTitle: string) => {
    if (!hasUser) return;

    const currentTask = TASKS.find((task) => task.title === taskTitle);

    if (tasksState.filter((task) => task.id === currentTask?.id)[0].done)
      return;

    if (currentTask) {
      setHasCompletedATask(true);
      await completeTask(currentTask.id);
      await reload();
    }
  };

  /**
   * Check if all daily tasks are done.
   *
   * @returns boolean
   */
  const allDailyTasksAreDone = () => {
    if (!tasksState) return false;
    const taskIsDaily = (task: any) => task.id.split("-")[0] === "daily";

    const dailyTaskObject = TASKS.filter((task) => taskIsDaily(task));
    const dailyTaskState = tasksState.filter(
      (task) => taskIsDaily(task) && task.done,
    );

    return dailyTaskObject.length === dailyTaskState.length;
  };

  /*
   * Show a toast when all daily tasks are completed.
   *
   * @returns void
   */
  const showAllDoneToast = () => {
    showToast({
      type: "custom",
      backgroundColor: theme.colors.feedback.success[50],
      borderColor: theme.colors.brand.primary[500],
      textColor: theme.colors.brand.primary[900],
      icon: "celebration",
      iconColor: theme.colors.brand.primary[500],
      message: t("allTasksCompleted"),
      closeButton: false,
      position: "bottom",
    });
  };

  useEffect(() => {
    if (hasUser) reload();
  }, [currentUser, signedIn]);

  useEffect(() => {
    updateStreak();

    if (allDailyTasksAreDone()) {
      if (!showedCompletedTasksToast) {
        showAllDoneToast();
        setShowedCompletedTasksToast(true);
      }

      completeAllTasks();
      refetchTasksStatistics();
    }
  }, [tasksState]);

  const tasksObject: ITasksContext = useMemo(
    () => ({
      tasksState,
      tasksStatistics,
      hasCompletedATask,
      reload,
      finishTask,
      setHasCompletedATask,
    }),
    [tasksState, hasCompletedATask],
  );

  return (
    <TasksContext.Provider value={tasksObject}>
      {children}
    </TasksContext.Provider>
  );
}

export default TasksProvider;

export function useTasksContext() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasksContext must be used within a TasksProvider");
  }

  return context;
}
