/*
 * NOTE: The tasks below doesn't exist at a databse level, we're only saving the UUIDs when a task
 * is completed. This will help us to split tasks or not between clients, and give us more freedom to set callbacks and more.
 */

import { beginningOfToday } from "lib/dateUtils";

export interface Task {
  id: string;
  title: string;
  actions: string[];
  type: string;
  navigationCallback: string;
  isVisible: (params?: any) => boolean;
}

export const TASKS = [
  {
    id: "af13a631-3d3d-4709-8f90-06a938f4cef6",
    title: "donate_ticket",
    actions: ["P8_view"],
    type: "daily",
    navigationCallback: "CausesScreen",
    isVisible(this: Task) {
      return true;
    },
  },
  {
    id: "94bec4ad-ab60-41b8-b5f7-65f4b9ff8537",
    title: "donate_ticket_on_native",
    actions: ["P8_view"],
    type: "daily",
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
    id: "ee397e16-de1b-11ed-b5ea-0242ac120002",
    title: "check_daily_news",
    actions: ["for_you_news_tab_view"],
    type: "daily",
    navigationCallback: "ForYouScreen",
    isVisible(this: Task) {
      return true;
    },
  },
  {
    id: "f942f607-9f2d-4e91-a1d5-aad5e85c864c",
    title: "giving_day",
    actions: ["go_to_giving_day_screen"],
    type: "daily",
    navigationCallback:
      "https://projetos.ribon.io/dia-de-doar?integration_id=96ba2ddd-1f49-4057-9c9d-b9d4a6e423a7&offer=1000&target=non_profit&target_id=10&currency=BRL&subscription=false&utm_source=organic&utm_medium=organic&utm_campaign=organic",
    isVisible(this: Task) {
      return true;
    },
  },
  {
    id: "ed180aa8-e8e7-11ed-a05b-0242ac120003",
    title: "make_contribution",
    actions: ["contribution_done_screen_view"],
    type: "monthly",
    navigationCallback: "PromotersScreen",
    isVisible(this: Task) {
      return true;
    },
  },
];

export const useTasks = (type: string) => {
  const tasks = TASKS.filter((task) => task.type === type);
  return tasks;
};
