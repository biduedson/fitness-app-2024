import { fadeIn } from "@/lib/variants";
import { motion } from "framer-motion";

const MuscleGainGuide = () => {
  return (
    <motion.div
      variants={fadeIn("up", 0.1)}
      initial="hidden"
      whileInView={"show"}
      className="p-5 bg-gray-50 rounded-lg shadow-md text-white bg-black_texture  shadow-accent  my-8"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-accent">1. Iniciantes</h3>
        <ul className="list-disc list-inside ml-4">
          <li>
            <strong>Objetivo:</strong> Aprender a técnica e construir uma base
            muscular.
          </li>
          <li>
            <strong>Séries:</strong> 2 a 3 séries por exercício
          </li>
          <li>
            <strong>Repetições:</strong> 8 a 12 repetições
          </li>
          <li>
            <strong>Frequência:</strong> 2 a 3 vezes por semana
          </li>
          <li>
            <strong>Notas:</strong> Concentre-se em exercícios compostos e na
            forma correta.
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-accent">2. Intermediários</h3>
        <ul className="list-disc list-inside ml-4">
          <li>
            <strong>Objetivo:</strong> Continuar a desenvolver força e massa
            muscular.
          </li>
          <li>
            <strong>Séries:</strong> 3 a 4 séries por exercício
          </li>
          <li>
            <strong>Repetições:</strong> 6 a 12 repetições
          </li>
          <li>
            <strong>Frequência:</strong> 3 a 5 vezes por semana
          </li>
          <li>
            <strong>Notas:</strong> Inclua variações nos exercícios e considere
            aumentar gradualmente a carga.
          </li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-accent">3. Avançados</h3>
        <ul className="list-disc list-inside ml-4">
          <li>
            <strong>Objetivo:</strong> Maximizar a hipertrofia e a força.
          </li>
          <li>
            <strong>Séries:</strong> 4 a 6 séries por exercício
          </li>
          <li>
            <strong>Repetições:</strong> 1 a 6 repetições para força; 6 a 12
            repetições para hipertrofia
          </li>
          <li>
            <strong>Frequência:</strong> 4 a 6 vezes por semana
          </li>
          <li>
            <strong>Notas:</strong> Utilizar métodos avançados, como
            periodização do treino.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-accent">
          Considerações Gerais
        </h3>
        <ul className="list-disc list-inside ml-4">
          <li>
            <strong>Carga:</strong> Deve ser desafiadora, mas permitir a
            execução correta do movimento.
          </li>
          <li>
            <strong>Descanso:</strong> 1 a 3 minutos entre séries, dependendo da
            intensidade e do objetivo.
          </li>
          <li>
            <strong>Progressão:</strong> Aumentar gradualmente o peso e/ou o
            número de repetições ao longo do tempo.
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default MuscleGainGuide;
