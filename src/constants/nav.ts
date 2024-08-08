export interface NavItem {
  title: string;
  path: string;
}

export const menuItems: NavItem[] = [
  {
    title: "Today",
    path: "/",
  },
  {
    title: "Upcoming",
    path: "/upcoming",
  },
  {
    title: "Inbox",
    path: "/inbox",
  },
  {
    title: "Completed",
    path: "/completed",
  },
];
