import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black_texture text-white p-5">
      <div className="max-w-2xl">
        <h1 className="text-3xl mb-6">Termos de Serviço</h1>
        <p className="mb-4">
          Estes Termos de Serviço ("Termos") regem o uso do nosso aplicativo
          ("Serviço") que é fornecido por [Seu Nome ou Nome da Sua Empresa]
          ("nós", "nosso" ou "nos"). Ao acessar ou usar o Serviço, você concorda
          em cumprir e estar vinculado a estes Termos.
        </p>
        <h2 className="text-2xl mb-4">1. Aceitação dos Termos</h2>
        <p className="mb-4">
          Ao usar o Serviço, você concorda em estar vinculado a estes Termos e a
          nossa Política de Privacidade. Se você não concorda com algum dos
          Termos, não deve usar o Serviço.
        </p>
        <h2 className="text-2xl mb-4">2. Alterações aos Termos</h2>
        <p className="mb-4">
          Reservamo-nos o direito de alterar ou modificar estes Termos a
          qualquer momento. As alterações serão publicadas nesta página, e você
          é responsável por revisar os Termos periodicamente. O uso contínuo do
          Serviço após a publicação de alterações constitui aceitação dos Termos
          revisados.
        </p>
        <h2 className="text-2xl mb-4">3. Uso do Serviço</h2>
        <p className="mb-4">
          Você concorda em usar o Serviço apenas para fins legais e de acordo
          com as leis aplicáveis. Você não deve usar o Serviço de forma que
          possa danificar, desativar, sobrecarregar ou prejudicar o Serviço ou
          interferir no uso de qualquer outra parte do Serviço.
        </p>
        <h2 className="text-2xl mb-4">4. Isenção de Responsabilidade</h2>
        <p className="mb-4">
          O Serviço é fornecido "como está" e "conforme disponível". Não
          garantimos que o Serviço será ininterrupto, seguro ou livre de erros.
          Não seremos responsáveis por qualquer dano resultante do uso ou da
          incapacidade de usar o Serviço.
        </p>
        <h2 className="text-2xl mb-4">5. Contato</h2>
        <p className="mb-4">
          Se você tiver dúvidas sobre estes Termos, entre em contato conosco
          através de [seu-email@dominio.com].
        </p>
      </div>
    </div>
  );
};

export default page;
