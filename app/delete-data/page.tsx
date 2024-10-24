import React from "react";

const page = () => {
  return (
    <div className="w-full h-[100vh ]flex items-center justify-center h-screen bg-black_texture text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Instruções de Exclusão de Dados
        </h1>
        <p className="text-lg">
          Para solicitar a exclusão dos seus dados, envie um e-mail para:
        </p>
        <p className="text-lg font-semibold mt-2">privacy@seudominio.com</p>
      </div>
    </div>
  );
};

export default page;
