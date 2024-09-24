
import { db } from "@/app/_lib/prisma";
const bicepsData = [
  
  {
    name: "Biceps polia alta dupla",
    img: "/assets/Gifs/MUSCULACAO/Biceps/biceps_polia_alta_dupla.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Biceps unilateral com banco scot no cross",
    img: "/assets/Gifs/MUSCULACAO/Biceps/biceps_unilateral_com_banco_scort_no_cross.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Biceps unilateral cross",
    img: "/assets/Gifs/MUSCULACAO/Biceps/biceps_unilateral_cross.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Biceps unilateral polia alta cross.gif",
    img: "/assets/Gifs/MUSCULACAO/Biceps/biceps_unilateral_polia_alta_cross.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca alternada aparelho biarticular",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_alternada_aparelho_biarticular.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca alternada com giro",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_alternada_com_giro.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca alternada pegada neutra sentado no banco",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_alternada_pegada_neutra_sentado_no_banco.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca alternada pegada neutra",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_alternada_pegada_neutra.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca Concentrada",
    img: "/assets/Gifs/MUSCULACAO/Biceps/Rosca_Concentrada.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca Concentrada 2",
    img: "/assets/Gifs/MUSCULACAO/Biceps/Rosca_Concentrada_2.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca consentrada unilateral no banco declinado",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_consentrada_unilateral _no_banco_declinado.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca dierata pegada invertida barra_W",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_dierata_pegada_invertida_barra_W.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca dierta pegada aberta",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_dierta_pegada_aberta.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca dierta pegada fechada",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_dierta_pegada_fechada.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca direta apaiada no banco barra W",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_direta_apaiada_no_banco_barra_W.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca direta barra pegada fechada sentado no banco",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_direta_barra_pegada_fechada_sentado_no_banco.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Biceps unilateral com banco scort no cross",
    img: "/assets/Gifs/MUSCULACAO/Biceps/biceps_unilateral_com_banco_scort_no_cross.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca direta barra W sentado banco",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_direta_barra_W_sentado_banco.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca direta barra W",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_direta_barra_W.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca direta deitado no banco reto no cross",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_direta_deitado_no_banco_reto_no_cross.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca direta no banco scot",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_direta_no_banco_scort.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },

  {
    name: "Biceps unilateral com banco scort no cross",
    img: "/assets/Gifs/MUSCULACAO/Biceps/biceps_unilateral_com_banco_scort_no_cross.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca direta no cross barra W",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_direta_no_cross_barra_W.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca neutra unilateral no banco scort",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_neutra _unilateral_no_banco_scort.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca Neutra com halteres sentado no banco",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_neutra_com_halteres_sentado_no_banco.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca neutra com halteres",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_neutra_com_halteres.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca neutra no banco scot aparelho",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_neutra_no_banco_scort_aparelho.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca no banco scort barra W",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_no_banco_scort_barra_W.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca no scot",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_no_scort.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca pegada fechada barra W",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_pegada_fechada_barra_W.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca unilateral com halteres sentado no banco",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_unilateral_com_halteres_sentado_no_banco.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca unilateral com halteres",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_unilateral_com_halteres.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
  {
    name: "Rosca unilateral pegada neutra com halteres",
    img: "/assets/Gifs/MUSCULACAO/Biceps/rosca_unilateral_pegada_neutra_com_halteres.gif",
    categoryId: "cm04grqa900023eplgpeybf8c"
  },
];

// const addRecords = async () => await db.exercise.createMany({
    //  data: bicepsData
  ////  });
 
//export default addRecords