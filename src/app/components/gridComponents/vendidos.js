import { fundasImages } from "./fundas.js";
import { fullcolorImages } from "./fullcolor.js";
import { valijaImages } from "./valija.js";

import { cubrevalijasImages } from "./cubrevalijas.js";
import { portfolioImages } from "./portfolio.js";
import { tableImages } from "./tablet.js";
import { bolsilloImages } from "./bolsillo.js";
import { personalizadasImages } from "./persolanizadas.js";

const vendidos = [
  {
    id: 6,
    src: portfolioImages.portfolio1,
    title: "PORTAFOLIO",
    hover: [
      portfolioImages.portfolio1,
      portfolioImages.portfolio3,
      portfolioImages.portfolio2,
      portfolioImages.portfolio4,
    ],
    imagenesModal: [
      portfolioImages.portfolio5,
      portfolioImages.portfolio6,
      portfolioImages.portfolio7,
      portfolioImages.portfolio8,
    ],
    descriptionModal: `Descubre nuestros maletines tipo portafolio, disponibles para toda Argentina. 
    <br> <br> Confeccionados con cordura melange impermeable superan la calidad de los maletines comunes fabricados con materiales de menor resistencia. Diseñados con un estilo exclusivo, nuestros maletines incorporan cierre y manijas reforzadas para un transporte seguro, y un bolsillo exterior con cierre para accesorios.
    <br><br>

    Destacan por su resistencia y durabilidad, nuestros maletines poseen un interior con una división específica para notebooks de hasta 15.6 pulgadas, provista de protección contra golpes. Adicionalmente, cuentan con un compartimento interno para accesorios con cierre y dos más sin cierre. Son completamente lavables, lo que facilita su mantenimiento.
    <br><br>
    Protege tu notebook con elegancia con nuestros maletines de cordura melange, con envíos a todo Argentina.`,
    buttonLinkMenor: `https://articulo.mercadolibre.com.ar/MLA-1308107543-maletin-portafolio-morral-con-division-real-cover-_JM#position=3&search_layout=stack&type=item&tracking_id=da6c2641-5150-4eea-9440-da2ad0e65af7`,
    buttonLinkMayor: "",
    displayType: "PORTAFOLIOS",
  },
  {
    id: 7,
    src: fullcolorImages.full1,
    title: "FULL COLOR",
    hover: [
      fullcolorImages.full1,
      fullcolorImages.full2,
      fullcolorImages.full3,
      fullcolorImages.full4,
      fullcolorImages.full5,
      fullcolorImages.full6,
      fullcolorImages.full7,
      fullcolorImages.full8,
      fullcolorImages.full9,
      fullcolorImages.full10,
      fullcolorImages.full11,
      fullcolorImages.full12,
      fullcolorImages.full13,
    ],
    imagenesModal: [
      fullcolorImages.fullModal01,
      fullcolorImages.fullModal02,
      fullcolorImages.fullModal03,
      fullcolorImages.fullModal04,
    ],
    descriptionModal: `Descubre nuestras fundas para notebook, disponibles para toda Argentina. <br>
    Fabricadas con neoprene auténtico de 3 mm de espesor, superan la calidad de las fundas de neoprene sintético o goma espuma comunes.<br>Estampadas en ambas caras para un estilo inigualable, nuestras fundas incorporan manijas flexibles para un fácil almacenamiento en mochilas o carteras y un bolsillo externo para accesorios.<br> Destacan por su resistencia y durabilidad, nuestras fundas son además completamente lavables. Protege tu notebook con estilo con nuestras fundas full color de neoprene, con envíos a todo Argentina.`,

    buttonLinkMenor: `https://articulo.mercadolibre.com.ar/MLA-749658795-funda-tipo-maletin-notebook-neoprene-para-14-y-156-bolsillo-y-manijas-disenos-surtidos-real-cover-_JM#reco_item_pos=0&reco_backend=machinalis-seller-items-pdp&reco_backend_type=low_level&reco_client=vip-seller_items-above&reco_id=7df82faf-306f-4b77-96a2-7ace02dd3e9e`,
    displayType: "MALETINES_FULL_COLOR",
  },
  {
    id: 1,
    src: valijaImages.valija1,
    title: "MALETINES",
    hover: [
      valijaImages.valija1,
      valijaImages.valija2,
      valijaImages.valija3,
      valijaImages.valija4,
      valijaImages.valija5,
      valijaImages.valija6,
      valijaImages.valija7,
      valijaImages.valija8,
      valijaImages.valija9,
      valijaImages.valija10,
      valijaImages.valija11,
      valijaImages.valija12,
      valijaImages.valija13,
      valijaImages.valija14,
      valijaImages.valija15,
    ],
    imagenesModal: [
      valijaImages.valija16,
      valijaImages.valija17,
      valijaImages.valija18,
      valijaImages.valija19,
    ],
    descriptionModal: `Adéntrate en el universo de nuestros maletines de neopreno, una opción elegante y funcional, con envíos disponibles para toda Argentina. Confeccionados en neopreno auténtico importado de 3 mm de espesor, estos maletines superan a las alternativas tradicionales en términos de calidad y resistencia.
    <br>
    <br>

    El diseño negro de estos maletines se complementa con un bolsillo estampado, aportando un toque de estilo inconfundible. Cada uno viene equipado conmanijas de neopreno flexibles, lo que permite un almacenamiento cómodo en mochilas o carteras. Además, cuentan con un bolsillo externo, perfecto para llevar a mano tus accesorios esenciales.`,
    buttonLinkMenor: `https://articulo.mercadolibre.com.ar/MLA-868477884-funda-maletin-notebook-neoprene-bolsillo-estampado-disenos-_JM#reco_item_pos=2&reco_backend=machinalis-seller-items-pdp&reco_backend_type=low_level&reco_client=vip-seller_items-above&reco_id=bf903670-6c9d-411f-ac88-886de6b4c9fb`,
    displayType: "MALETINES",
  },
  {
    id: 4,
    src: cubrevalijasImages.cubrevalijas1,
    hover: [
      cubrevalijasImages.cubrevalijas5,
      cubrevalijasImages.cubrevalijas2,
      cubrevalijasImages.cubrevalijas1,
      cubrevalijasImages.cubrevalijas3,
      cubrevalijasImages.cubrevalijas4,
      cubrevalijasImages.cubrevalijas6,
      cubrevalijasImages.cubrevalijas7,
      cubrevalijasImages.cubrevalijas8,
      cubrevalijasImages.cubrevalijas9,
      cubrevalijasImages.cubrevalijas10,
      cubrevalijasImages.cubrevalijas11,
      cubrevalijasImages.cubrevalijas12,
    ],

    title: "CUBREVALIJA",
    descriptionModal: `Descubre nuestros cubrevalijas, disponibles para toda Argentina.<br>
    Realizadas con tela de Lycra de primera calidad, estas cubiertas no solo protegen tus valijas de golpes y rayones, sino que también te permiten identificarlas rápidamente en cualquier situación.<br>
    Se colocan como una camiseta que se ajusta perfectamente al formato de la valija, ofreciendo una protección integral.<br>
    Cuentan con un cierre inferior con hebilla a presión para colocar los precintos de seguridad, asegurando así la seguridad de tus pertenencias.<br>
    Poseen dos aperturas en la parte superior y una apertura de cada lado, para que puedas usarlas con todas tus valijas, independientemente del modelo.<br>
    Destacan por su resistencia y durabilidad, nuestras cubiertas son además completamente lavables.<br>
    Protege y personaliza tus valijas con nuestras cubiertas de Lycra, con envíos a toda Argentina.`,
    buttonLinkMenor: `https://articulo.mercadolibre.com.ar/MLA-835897324-fundas-cubre-valijas-disenos-surtidos-todos-los-tamanos-_JM#reco_item_pos=0&reco_backend=machinalis-homes-pdp-boos&reco_backend_type=function&reco_client=home_navigation-recommendations&reco_id=1d7ff3e2-4662-468d-b4ff-dab4a2107221`,
    imagenesModal: [
      cubrevalijasImages.cubrevalijas15,
      cubrevalijasImages.cubrevalijas13,
      cubrevalijasImages.cubrevalijas14,
      cubrevalijasImages.cubrevalijas16,
    ],
    displayType: "CUBRE_VALIJAS",
  },
  {
    id: 5,
    src: bolsilloImages.bolsillo1,
    title: "FUNDAS CON BOLSILLO",
    hover: [
      bolsilloImages.bolsillo1,
      bolsilloImages.bolsillo2,
      bolsilloImages.bolsillo3,
      bolsilloImages.bolsillo4,
      bolsilloImages.bolsillo5,
      bolsilloImages.bolsillo6,
      bolsilloImages.bolsillo7,
      bolsilloImages.bolsillo8,
      bolsilloImages.bolsillo9,
      bolsilloImages.bolsillo10,
      bolsilloImages.bolsillo11,
      bolsilloImages.bolsillo12,
      bolsilloImages.bolsillo13,
      bolsilloImages.bolsillo14,
      bolsilloImages.bolsillo15,
    ],
    imagenesModal: [
      bolsilloImages.bolsillo1,
      bolsilloImages.bolsillo2,
      bolsilloImages.bolsillo3,
      bolsilloImages.bolsillo4,
    ],
    descriptionModal: `Descubre nuestras fundas para notebook, disponibles para toda Argentina. Fabricadas con neoprene auténtico de 3 mm de espesor, superan la calidad de las fundas de neoprene sintético o goma espuma comunes.

    Estampadas en ambas caras para un estilo inigualable Destacan por su resistencia y durabilidad, nuestras fundas son además completamente lavables.
    
    Protege tu notebook con estilo con nuestras fundas de neopreno, con envíos a todo Argentina.`,
    displayType: "CON_BOLSILLO",
  },
  {
    id: 3,
    src: tableImages.table8,
    hover: [
      tableImages.table8,
      tableImages.table1,
      tableImages.table2,
      tableImages.table3,
      tableImages.table4,
      tableImages.table5,
      tableImages.table6,
      tableImages.table7,
      tableImages.table9,
      tableImages.table10,
      tableImages.table11,
      tableImages.table12,
      tableImages.table13,
      tableImages.table14,
      tableImages.table15,
      tableImages.table16,
      tableImages.table17,
    ],
    title: "FUNDAS RIGIDAS",
    imagenesModal: [
      tableImages.table18,
      tableImages.table19,
      tableImages.table20,
      tableImages.table21,
    ],
    descriptionModal: `Descubre nuestras fundas rígidas para tablet, disponibles para toda Argentina.<br>
    Confeccionadas en su interior con cuerina de alta calidad y en su exterior forradas en poliset resistente.<br>Estas fundas poseen un cierre magnético con dos posiciones de uso para máxima conveniencia.<br>
    Superan la calidad de las fundas comunes, ofreciendo una protección superior para tu tablet.<br>Estas fundas no solo protegen tu tablet, sino que también aportan un estilo inigualable a tus dispositivos.<br>
    Destacan por su resistencia y durabilidad, nuestras fundas son además muy fáciles de manejar y usar.<br>Protege tu tablet con estilo con nuestras fundas rígidas, con envíos a toda Argentina.`,
    displayType: "TABLET_COVER",
  },
  {
    id: 2,
    src: fundasImages.funda1,
    hover: [
      fundasImages.funda3,
      fundasImages.funda1,
      fundasImages.funda2,
      fundasImages.funda4,
      fundasImages.funda5,
      fundasImages.funda7,
      fundasImages.funda6,
      fundasImages.funda8,
      fundasImages.funda9,
      fundasImages.funda10,
    ],
    title: "PORTANOTEBOOKS",
    descriptionModal: `Descubre nuestras fundas para notebook, disponibles para toda Argentina. Fabricadas con neoprene auténtico de 3 mm de espesor, superan la calidad de las fundas de neoprene sintético o goma espuma comunes.
   <br> <br> Estampadas en ambas caras para un estilo inigualable Destacan por su resistencia y durabilidad, nuestras fundas son además completamente lavables. 
   <br><br>Protege tu notebook con estilo con nuestras fundas de neopreno, con envíos a todo Argentina.`,
    buttonLinkMenor: `https://articulo.mercadolibre.com.ar/MLA-747092062-funda-notebook-neoprene-estampada-para-14-y-156-disenos-surtidos-real-cover-_JM#reco_item_pos=0&reco_backend=machinalis-seller-items-pdp&reco_backend_type=low_level&reco_client=vip-seller_items-above&reco_id=85204f8b-33a5-47d4-8e48-d8ae83209d9d`,
    imagenesModal: [
      fundasImages.funda12,
      fundasImages.funda14,
      fundasImages.funda15,
      fundasImages.funda11,
    ],
    displayType: "NEOPRENE_COVER",
  },

  {
    id: 8,
    src: personalizadasImages.p1,
    title: "PERSONALIZADAS",
    hover: [
      personalizadasImages.p1,
      personalizadasImages.p2,
      personalizadasImages.p3,
      personalizadasImages.p4,
      personalizadasImages.p5,
      personalizadasImages.p6,
      personalizadasImages.p7,
      personalizadasImages.p8,
      personalizadasImages.p9,
    ],
    descriptionModal: `Todos nuestros productos pueden personalizarse, para que usted pueda tener así, un diseño exclusivo. Lo que lo vuelve ideal para regalos empresariales, eventos, congresos, etc. Contáctese con nuestros ejecutivos de venta para obtener la mejor alternativa para su  proyecto o el de sus clientes. Algunos clientes que confiaron en nosotros: La nacion, ANAC, Gmail, Fibertel entre otras`,
    imagenesModal: [
      personalizadasImages.p7,
      personalizadasImages.p8,
      personalizadasImages.p9,
      personalizadasImages.p6,
    ],
  },
];

export default vendidos;
