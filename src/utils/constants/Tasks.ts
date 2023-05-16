/*
 * NOTE: The tasks below doesn't exist at a databse level, we're only saving the UUIDs when a task
 * is completed. This will help us to split tasks or not between clients, and give us more freedom to set callbacks and more.
 */

import { beginningOfToday } from "lib/dateUtils";

export interface Task {
  id: string;
  title: string;
  navigationCallback: string;
  isVisible: (params?: any) => boolean;
}

export const TASKS = [
  {
    id: "daily-af13a631-3d3d-4709-8f90-06a938f4cef6",
    title: "donate_ticket",
    navigationCallback: "CausesScreen",
    isVisible(this: Task) {
      return true;
    },
  },
  {
    id: "daily-94bec4ad-ab60-41b8-b5f7-65f4b9ff8537",
    title: "donate_ticket_on_native",
    navigationCallback: "CausesScreen",
    isVisible(this: Task, params?: any) {
      const taskState = params?.state.find((obj: any) => obj.id === this.id);
      const timesCompleted = taskState?.timesCompleted || 0;
      const taskDone = taskState?.done;
      const lastCompletedAt = new Date(
        taskState?.lastCompletedAt?.slice(0, 19),
      );
      const completedDay = lastCompletedAt < beginningOfToday();

      if (timesCompleted === 0 && !taskDone) {
        return true;
      } else if (timesCompleted === 1 && taskDone && !completedDay) {
        return true;
      }

      return false;
    },
  },
  {
    id: "daily-ee397e16-de1b-11ed-b5ea-0242ac120002",
    title: "check_daily_news",
    navigationCallback: "ForYouScreen",
    isVisible(this: Task) {
      return true;
    },
  },
  {
    id: "monthly-ed180aa8-e8e7-11ed-a05b-0242ac120003",
    title: "make_contribution",
    navigationCallback: "PromotersScreen",
    isVisible(this: Task) {
      return true;
    },
  },
];

export const useTasks = (type: string) => {
  const tasks = TASKS.filter((task) => task.id.split("-")[0] === type);
  return tasks;
};
