import { useState } from "react";

const useMessagePopUpHooks = () => {
  const [isMessageShown, setIsMessageShown] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  //Hold Button pop up
  const showMessage = (event: any) => {
    setPosition({
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    });
    setIsMessageShown(true);
  };

  const onClose = () => {
    setIsMessageShown(false);
  };

  const message = "Hold Button";

  return { isMessageShown, message, onClose, showMessage, position };
};

export default useMessagePopUpHooks;
