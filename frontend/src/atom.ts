import { atom } from "recoil";

export const menubarIcon = atom({
  key: "menubarIcon",
  default: true,
});

export const menubar = atom({
  key: "menubar",
  default: "none",
});

export const menubarText = atom({
  key: "menubarText",
  default: -200,
});
