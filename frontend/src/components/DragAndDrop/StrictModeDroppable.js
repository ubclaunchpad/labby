//React-beautiful-dnd is no longer being maintained  by Atlassian
//ReactV18 Strict Mode caused the library's default Droppable component to stop working
//The bug is caused by concurrent rendering in React18
//A hacky way to fix this timing issue that I've done here is to render the Droppable  component after calling a single animation frame

import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";

const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};

export default StrictModeDroppable;
