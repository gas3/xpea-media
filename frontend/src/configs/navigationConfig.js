import React from "react";
import * as Icon from "react-feather";
const navigationConfig = [
  {
    id: "analyticsDash",
    title: "Dashboard",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/dashboard",
  },
  {
    type: "groupHeader",
    groupTitle: "Management",
  },
  {
    id: "users",
    title: "User",
    type: "collapse",
    icon: <Icon.User size={20} />,
    children: [
      {
        id: "list",
        title: "List",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/user/list",
      },
      {
        id: "view",
        title: "View",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/user/view",
      },
      {
        id: "edit",
        title: "Edit",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/app/user/edit",
      },
    ],
  },
];

export default navigationConfig;
