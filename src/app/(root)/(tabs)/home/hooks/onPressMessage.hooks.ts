import { useState } from "react";

const useOnPressMessageHooks = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMessageShown, setIsMessageShown] = useState(false);

  const showMessage = (event: any) => {
    setPosition({
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY - 30,
    });
    setIsMessageShown(true);
  };

  const onClose = () => {
    setIsMessageShown(false);
  };

  const message = `Coming soon`;

  return { position, isMessageShown, showMessage, onClose, message };
};

export default useOnPressMessageHooks;
