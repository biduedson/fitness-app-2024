import React, { ReactElement } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

interface AlertActionProps {
  alertOpen: boolean;
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  alertTitle: string;
  alertDescription: string;
  alertButtonName: string;
  alertFunctionAction: () => void;
}

const AlertAction = ({
  alertOpen,
  alertTitle,
  alertDescription,
  alertButtonName,
  alertFunctionAction,
  setAlertOpen,
}: AlertActionProps) => {
  return (
    <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
      <AlertDialogContent className="bg-slate-100 shadow-lg shadow-slate-600 rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600 sm:text-center">
            {alertTitle}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[16px] text-primary-300 sm:text-center">
            {alertDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="text-black  hover:bg-slate-800 hover:text-white"
            onClick={() => setAlertOpen(false)}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600"
            onClick={alertFunctionAction}
          >
            {alertButtonName}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertAction;
