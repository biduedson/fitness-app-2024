import React, { useState } from "react";
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
import { toast } from "sonner";
import { Loader2, User } from "lucide-react";
import { Prisma } from "@prisma/client";

interface AlertDialogProductProps {
  userId: string;
  user: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>;
  setUserData: React.Dispatch<
    React.SetStateAction<AlertDialogProductProps["user"] | null>
  >;
  isConfirmDialogOpen: boolean;
  setIsConfirmDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  emptyErrorMessage?: string;
}

const AlertAddStudent = ({
  isConfirmDialogOpen,
  setIsConfirmDialogOpen,
  emptyErrorMessage,
  userId,
  setUserData,
  user,
}: AlertDialogProductProps) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [newUserStudent, SetNewUserStudent] =
    useState<AlertDialogProductProps["user"]>(user);

  const addStudent = async (userId: string) => {
    setIsSubmitLoading(true);
    try {
      const response = await fetch("/api/addstudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const newStudent: Prisma.StudentGetPayload<{}> = await response.json();

        const updatedUser = {
          ...user,
          student: newStudent,
        };
        setUserData(updatedUser); // Atualiza o estado no componente pai
        toast("Aluno adicionado com sucesso.");
      } else {
        console.error("Erro ao adicionar aluno:", response);
      }
    } catch (error) {
      console.error("Erro ao adicionar estudante:", error);
    } finally {
      setIsSubmitLoading(false);
      setIsConfirmDialogOpen(false);
    }
  };

  return (
    <AlertDialog open={isConfirmDialogOpen}>
      <AlertDialogContent className="bg-black_texture">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-accent sm:text-center">
            Deseja Adicionar este usuário como aluno
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[16px] text-white sm:text-center">
            Ao finalizar, o usuario sera cadastrado como aluno.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="text-accent"
            onClick={() => setIsConfirmDialogOpen(false)}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-accent"
            onClick={() => addStudent(userId)}
            disabled={isSubmitLoading}
          >
            {isSubmitLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
            )}
            Adicionar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertAddStudent;
