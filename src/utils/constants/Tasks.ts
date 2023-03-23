export const TASKS = [
  {
    id: 1,
    title: "Doar ticket",
    actions: ["donation_done_page_view"],
    type: "daily",
    navigationCallback: "CausesScreen",
  },
  {
    id: 2,
    title: "Conferir publicações diárias",
    navigationCallback: "NewsSectionTabView",
    actions: ["news_page_view"],
    type: "daily",
  },
  {
    id: 3,
    title: "Ver mais informações sobre uma ONG",
    actions: ["stories_page_view"],
    type: "daily",
    navigationCallback: "CausesScreen",
  },
  {
    id: 4,
    title: "Fazer doação direta",
    actions: ["direct_donation_done"],
    type: "super_task",
  },
  {
    id: 5,
    title: "Doar em comunidade",
    actions: ["community_donation_done"],
    type: "super_task",
  },
];

export const useTasks = (type: string) => {
  const tasks = TASKS.filter((task) => task.type === type);
  return tasks;
};
