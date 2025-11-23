import { Button } from "components/button/button";
import { ButtonProps } from "components/button/types";
import { Modal } from "components/modal/modal";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  buttons: ButtonProps[];
}

export const ContextMenu = (props: Props) => {
  const { show, setShow, buttons } = props;

  return (
    <Modal show={show} setShow={setShow}>
      {buttons.map((button) => (
        <Button {...button} />
      ))}
    </Modal>
  );
};
