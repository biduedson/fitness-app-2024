import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black_texture text-white p-5">
      <div className="max-w-2xl">
        <h1 className="text-3xl mb-6">Política de Privacidade</h1>
        <p className="mb-4">
          Esta Política de Privacidade descreve como coletamos, usamos e
          protegemos suas informações ao usar nosso aplicativo ("Serviço"). Ao
          acessar ou usar o Serviço, você concorda com a coleta e uso de
          informações de acordo com esta política.
        </p>
        <h2 className="text-2xl mb-4">1. Informações que Coletamos</h2>
        <p className="mb-4">
          Coletamos informações pessoais que você nos fornece ao se registrar no
          Serviço, como nome, e-mail e outras informações de contato. Também
          podemos coletar informações sobre como você usa o Serviço.
        </p>
        <h2 className="text-2xl mb-4">2. Uso das Informações</h2>
        <p className="mb-4">
          Usamos suas informações para fornecer, manter e melhorar nosso
          Serviço. Isso inclui enviar atualizações, responder a perguntas e
          fornecer suporte ao cliente.
        </p>
        <h2 className="text-2xl mb-4">3. Compartilhamento de Informações</h2>
        <p className="mb-4">
          Não compartilhamos suas informações pessoais com terceiros, exceto
          quando necessário para fornecer o Serviço ou quando exigido por lei.
        </p>
        <h2 className="text-2xl mb-4">4. Segurança das Informações</h2>
        <p className="mb-4">
          Tomamos medidas razoáveis para proteger suas informações pessoais, mas
          não podemos garantir a segurança absoluta. Você é responsável por
          manter suas informações de login confidenciais.
        </p>
        <h2 className="text-2xl mb-4">5. Alterações a Esta Política</h2>
        <p className="mb-4">
          Podemos atualizar esta Política de Privacidade de tempos em tempos.
          Publicaremos quaisquer alterações nesta página. Recomendamos que você
          revise esta Política periodicamente.
        </p>
        <h2 className="text-2xl mb-4">6. Contato</h2>
        <p className="mb-4">
          Se você tiver perguntas sobre esta Política de Privacidade, entre em
          contato conosco através de [seu-email@dominio.com].
        </p>
      </div>
    </div>
  );
};

export default page;
