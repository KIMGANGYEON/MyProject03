import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { menubar, menubarIcon, menubarText } from "../atom";

const NotFound = () => {
  const setMenuBar = useSetRecoilState(menubar);
  const setMenubarIcon = useSetRecoilState(menubarIcon);
  const setMenuBarText = useSetRecoilState(menubarText);

  useEffect(() => {
    setMenubarIcon(true);
    setMenuBar("none");
    setMenuBarText(-200);
  }, []);
  return <div style={{ padding: 30, fontSize: 100 }}>NotFound</div>;
};

export default NotFound;
