import ErrorDialog from "./ErrorDialog";
import InfoDialog from "./InfoDialog";
import BackupDialog from "./BackupDialog";

export interface IDialog {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  msg: string;
}

export { ErrorDialog, InfoDialog, BackupDialog };
