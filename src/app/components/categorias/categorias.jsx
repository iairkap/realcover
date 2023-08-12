// import React from "react";
// import styles from "./categorias.module.css";
// import { arrowCategories } from "../../../../public/imagnes";
// import Image from "next/image";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

// function Categorias(props) {
//   const vendidos = [
//     {
//       src:
//         "https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/mismo%20size%2Fcubrevalija.png?alt=media&token=09dcfce5-2885-4398-b4af-8d641b209334",
//       title: "CUBREVALIJAS",
//     },
//     {
//       src:
//         "https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/mismo%20size%2Fportafolio.png?alt=media&token=cc7ecbf9-07da-4d3f-9dc0-dc1a66784a9e",
//       title: "PORTAFOLIO",
//     },
//     {
//       src:
//         "https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/mismo%20size%2Ffull%20color.png?alt=media&token=76b84a61-d7df-4788-8873-2587b484ce62",
//       title: "FULLCOLOR",
//     },
//     {
//       src:
//         "https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/valija.png?alt=media&token=5d44a44c-0a87-4a18-b5cf-39a187be5f47",
//       title: "VALIJAS",
//     },
//     {
//       src:
//         "https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/mismo%20size%2Ffunda.png?alt=media&token=b9067b22-378b-4239-977e-559703436239",
//       title: "FUNDAS",
//     },
//     {
//       src:
//         "https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/mismo%20size%2Fcubrevalija%2002.png?alt=media&token=35c9927e-aec0-4c19-95e2-a9bc28e6b2c2",
//       title: "CUBREVALIJAS",
//     },
//     {
//       src:
//         "https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/mismo%20size%2Fportfolio02.png?alt=media&token=8bd5d7bd-465e-4fc4-bf6a-d6ecca5a562e",
//       title: "PORTAFOLIO",
//     },
//     {
//       src:
//         "https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/mismo%20size%2Ffull%20color2.png?alt=media&token=efd8fb4a-7d36-4443-a05d-b48803a588f0",
//       title: "FULLCOLOR",
//     },
//     {
//       src:
//         "https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/mismo%20size%2Fvalija%2002.png?alt=media&token=293a5b74-b5f7-4318-baf5-204ebe16a9e9",
//       title: "VALIJAS",
//     },
//     {
//       src:
//         "https://firebasestorage.googleapis.com/v0/b/real-cover.appspot.com/o/mismo%20size%2Ffunda2.png?alt=media&token=c71069ef-2f95-4e20-a0ab-d57c86b62f1d",
//       title: "FUNDAS",
//     },
//   ];

//   return (
//     <div className={styles.background}>
//       <div className={styles.titulo}>
//         <h1>Explora Categorias</h1>
//       </div>
//       <div className={styles.containerGeneral}>
//         <Carousel
//           showArrows={true}
//           infiniteLoop={true}
//           showThumbs={false}
//           showStatus={false}
//           autoPlay={true}
//           showIndicators={false}
//           swipeable={true}
//           emulateTouch={true}
//           dynamicHeight={false}
//           centerMode
//           centerSlidePercentage={20}
//         >
//           {vendidos.map((item, index) => (
//             <div className={styles.masVendidosContenedor} key={index}>
//               <img
//                 src={item.src}
//                 className={styles.masVendidos}
//                 alt={item.title}
//               />
//               <h2 className={styles.masVendidosTitulo}>{item.title}</h2>
//             </div>
//           ))}
//         </Carousel>
//       </div>
//     </div>
//   );
// }

// export default Categorias;
