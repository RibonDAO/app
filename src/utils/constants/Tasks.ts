/*
 * NOTE: The tasks below doesn't exist at a databse level, we're only saving the UUIDs when a task
 * is completed. This will help us to split tasks or not between clients, and give us more freedom to set callbacks and more.
 */

interface Task {
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
    actions: ["donation_done_page_view"],
    type: "daily",
    navigationCallback: "CausesScreen",
    isVisible(this: Task, params?: any) {
      return true;
    },
  },
  {
    id: "94bec4ad-ab60-41b8-b5f7-65f4b9ff8537",
    title: "donate_ticket_on_native",
    actions: ["donation_done_page_view"],
    type: "daily",
    navigationCallback: "CausesScreen",
    isVisible(this: Task, params?: any) {
      const taskState = params?.state.find((obj: any) => obj.id === this.id);
      const timesCompleted = taskState?.timesCompleted || 0;
      const taskDone = taskState?.done;

      if (timesCompleted === 0 && !taskDone) {
        return true;
      } else if (timesCompleted === 1 && taskDone) {
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
    isVisible(this: Task, params?: any) {
      return true;
    },
  },
];

export const useTasks = (type: string) => {
  const tasks = TASKS.filter((task) => task.type === type);
  return tasks;
};
