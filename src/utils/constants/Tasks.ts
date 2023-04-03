/*
* NOTE: The tasks below doesn't exist at a databse level, we're only saving the UUIDs when a task
* is completed. This will help us to split tasks or not between clients, and give us more freedom to set callbacks and more.
*/

export const TASKS = [
  {
    id: "af13a631-3d3d-4709-8f90-06a938f4cef6",
    title: "donate_ticket",
    actions: ["donation_done_page_view"],
    type: "daily",
    navigationCallback: "CausesScreen",
  },
  {
    id: "573d941a-1429-4095-adc3-ccb36f058633",
    title: "check_daily_news",
    navigationCallback: "NewsSectionTabView",
    actions: ["news_page_view"],
    type: "daily",
  },
  {
    id: "2825f25d-46c8-4307-a202-c41ecacfbfed",
    title: "see_more_ngo_infos",
    actions: ["stories_page_view"],
    type: "daily",
    navigationCallback: "CausesScreen",
  },
];

export const useTasks = (type: string) => {
  const tasks = TASKS.filter((task) => task.type === type);
  return tasks;
};
