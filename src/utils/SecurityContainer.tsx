// import { useCallback } from "react";
// import Particles from "@tsparticles/react";
// import { loadFull } from "tsparticles"; // <- updated
// import type { Engine } from "@tsparticles/engine"; // <- updated

// export default function SecurityBackground() {

//   const particlesInit = useCallback(async (engine: Engine) => {
//     await loadFull(engine);
//   }, []);

//   return (
//     <Particles
//       id="networkParticles"
//       init={particlesInit}
//       options={{
//         fullScreen: false,

//         particles: {
//           number: {
//             value: 120,
//             density: {
//               enable: true,
//               width: 900, height: 900 
//             }
//           },

//           color: {
//             value: "#00e5ff"
//           },

//           size: {
//             value: { min: 1, max: 3 }
//           },

//           opacity: {
//             value: 0.6
//           },

//           move: {
//             enable: true,
//             speed: 0.8
//           },

//           links: {
//             enable: true,
//             distance: 170,
//             color: "#00e5ff",
//             opacity: 0.35,
//             width: 1
//           }
//         },

//         interactivity: {
//           events: {
//             onHover: {
//               enable: true,
//               mode: "grab"
//             }
//           },

//           modes: {
//             grab: {
//               distance: 200,
//               links: {
//                 opacity: 0.8
//               }
//             }
//           }
//         },

//         detectRetina: true
//       }}

//       style={{
//         position: "absolute",
//         inset: 0,
//         zIndex: 0
//       }}
//     />
//   );
// }