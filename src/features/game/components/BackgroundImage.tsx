import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { fragmentShader, snoiseFunction, vertexShader } from "./glsl";
import { motion } from "framer-motion";

function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rgb(r: number, g: number, b: number): THREE.Vector3 {
  return new THREE.Vector3(r, g, b);
}

interface Props {
  c1: string;
  acc: string;
}

const BackgroundImage = ({ c1, acc }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function generateStrictShades(
    baseColor: string,
    accentColor: string
  ): { r: string; g: string; b: string }[] {
    const hexToRgb = (hex: string): { r: string; g: string; b: string } => {
      const bigint = parseInt(hex.slice(1), 16);
      return {
        r: String((bigint >> 16) & 255),
        g: String((bigint >> 8) & 255),
        b: String(bigint & 255),
      };
    };

    const rgbToHex = (r: number, g: number, b: number): string => {
      return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
    };

    const blendColors = (
      color1: { r: string; g: string; b: string },
      color2: { r: string; g: string; b: string },
      ratio: number
    ): { r: string; g: string; b: string } => {
      const r = Math.round(
        Number(color1.r) * (1 - ratio) + Number(color2.r) * ratio
      );
      const g = Math.round(
        Number(color1.g) * (1 - ratio) + Number(color2.g) * ratio
      );
      const b = Math.round(
        Number(color1.b) * (1 - ratio) + Number(color2.b) * ratio
      );
      return {
        r: String(r),
        g: String(g),
        b: String(b),
      };
    };

    const baseRgb = hexToRgb(baseColor);
    const accentRgb = hexToRgb(accentColor);

    const shades: { r: string; g: string; b: string }[] = [];

    // Dodaj kolor bazowy (nieco jaśniejszy niż czarny, nie przekraczający #D0D0D0)
    shades.push({
      r: String(Math.min(208, Math.max(1, Number(baseRgb.r)))),
      g: String(Math.min(208, Math.max(1, Number(baseRgb.g)))),
      b: String(Math.min(208, Math.max(1, Number(baseRgb.b)))),
    });

    // Wygeneruj trzy odcienie przesunięte w kierunku akcentu, ale nie przekraczające #D0D0D0
    for (let i = 1; i <= 3; i++) {
      const ratio = i * 0.25; // Delikatne przesunięcie w kierunku akcentu
      const blendedColor = blendColors(baseRgb, accentRgb, ratio);

      // Uwzględnij, że kolory nie mogą być czystym czarnym ani białym, ani przekraczać #D0D0D0
      const adjustedColor = {
        r: String(Math.min(208, Math.max(1, Number(blendedColor.r)))),
        g: String(Math.min(208, Math.max(1, Number(blendedColor.g)))),
        b: String(Math.min(208, Math.max(1, Number(blendedColor.b)))),
      };

      shades.push(adjustedColor);
    }

    return shades;
  }

  const colorsss = generateStrictShades(c1, acc);

  // console.log(`%c C1 COLOR`, `background: ${c1}`);
  // colorsss.forEach((color, index) => {
  //   console.log(
  //     `%c colorindex${index}, ${JSON.stringify(color)}`,
  //     `background: rgb(${color.r},${color.g},${color.b})`
  //   );
  // });
  // console.log(`%c ACCENT COLOR`, `background: ${acc}`);

  const [color1, color2, color3, color4] = colorsss;

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setSize(window.innerWidth, window.innerHeight);

      const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", resize);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );

      let vCheck = false;

      camera.position.z = 300;

      const randomisePosition = new THREE.Vector2(1, 2);

      const R = (x: number, y: number, t: number): number => {
        return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
      };

      const G = (x: number, y: number, t: number): number => {
        return Math.floor(
          192 +
            64 *
              Math.sin(
                (x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300
              )
        );
      };

      const B = (x: number, y: number, t: number): number => {
        return Math.floor(
          192 +
            64 *
              Math.sin(
                5 * Math.sin(t / 9) +
                  ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
              )
        );
      };

      let geometry = new THREE.PlaneGeometry(
        window.innerWidth / 2,
        400,
        100,
        100
      );
      let material = new THREE.ShaderMaterial({
        uniforms: {
          //@ts-ignore
          u_bg: { type: "v3", value: rgb(color3?.r, color3?.g, color3?.b) },
          //@ts-ignore
          u_bgMain: { type: "v3", value: rgb(color2?.r, color2?.g, color2?.b) },
          //@ts-ignore
          u_color1: { type: "v3", value: rgb(color1?.r, color1?.g, color1?.b) },
          //@ts-ignore
          u_color2: { type: "v3", value: rgb(color4?.r, color4?.g, color4?.b) },
          //@ts-ignore
          u_time: { type: "f", value: 60 },
          //@ts-ignore
          u_randomisePosition: { type: "v2", value: randomisePosition },
        },
        fragmentShader: snoiseFunction + fragmentShader,
        vertexShader: snoiseFunction + vertexShader,
      });

      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 140, -280);
      mesh.scale.multiplyScalar(5);
      //@ts-ignore
      mesh.rotationX = -1.0;
      //@ts-ignore
      mesh.rotationY = 0.0;
      //@ts-ignore
      mesh.rotationZ = 0.1;

      scene.add(mesh);

      renderer.render(scene, camera);
      let t = Math.floor(Math.random() * 500000);
      let j = 0;
      let x = randomInteger(0, 16);
      let y = randomInteger(0, 16);

      const animate = function () {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        mesh.material.uniforms.u_randomisePosition.value = new THREE.Vector2(
          j,
          j
        );

        mesh.material.uniforms.u_color1.value = new THREE.Vector3(
          R(x, y, t / 2),
          G(x, y, t / 2),
          B(x, y, t / 2)
        );

        mesh.material.uniforms.u_time.value = t;
        if (t % 0.1 == 0) {
          if (vCheck == false) {
            x -= 1;
            if (x <= 0) {
              vCheck = true;
            }
          } else {
            x += 1;
            if (x >= 32) {
              vCheck = false;
            }
          }
        }

        j = j + 0.005;
        t = t + 0.005;
      };
      animate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [c1, acc]);

  return (
    <motion.canvas
      className="absolute -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      ref={canvasRef}
    />
  );
};

export default BackgroundImage;
