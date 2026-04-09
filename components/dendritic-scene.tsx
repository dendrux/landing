"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Procedurally generates a dendritic / neural network of nodes and edges
 * arranged on a sphere with branching outgrowths. Looks like a glowing
 * neuron cluster — a visual metaphor for Dendrux's branching agent runs.
 */
function generateDendrite(seed = 1) {
  const rand = mulberry32(seed);
  const nodes: THREE.Vector3[] = [];
  const edges: [number, number][] = [];

  // Core sphere of nodes
  const coreCount = 60;
  for (let i = 0; i < coreCount; i++) {
    const phi = Math.acos(2 * rand() - 1);
    const theta = 2 * Math.PI * rand();
    const r = 1.4 + rand() * 0.25;
    nodes.push(
      new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ),
    );
  }

  // Connect nearest neighbors in core
  for (let i = 0; i < coreCount; i++) {
    const distances: { j: number; d: number }[] = [];
    for (let j = 0; j < coreCount; j++) {
      if (i === j) continue;
      distances.push({ j, d: nodes[i].distanceTo(nodes[j]) });
    }
    distances.sort((a, b) => a.d - b.d);
    for (let k = 0; k < 3; k++) {
      const j = distances[k].j;
      if (j > i) edges.push([i, j]);
    }
  }

  // Branching dendrites outward
  const branchSeeds = 12;
  for (let b = 0; b < branchSeeds; b++) {
    const start = Math.floor(rand() * coreCount);
    let current = start;
    const dir = nodes[start].clone().normalize();
    const segments = 4 + Math.floor(rand() * 4);
    for (let s = 0; s < segments; s++) {
      const len = 0.35 + rand() * 0.45;
      const jitter = new THREE.Vector3(
        (rand() - 0.5) * 0.6,
        (rand() - 0.5) * 0.6,
        (rand() - 0.5) * 0.6,
      );
      dir.add(jitter.multiplyScalar(0.4)).normalize();
      const next = nodes[current].clone().add(dir.clone().multiplyScalar(len));
      nodes.push(next);
      const newIdx = nodes.length - 1;
      edges.push([current, newIdx]);
      current = newIdx;

      // occasional sub-branch
      if (rand() > 0.65 && s > 0) {
        const subDir = dir
          .clone()
          .add(new THREE.Vector3((rand() - 0.5) * 1.2, (rand() - 0.5) * 1.2, (rand() - 0.5) * 1.2))
          .normalize();
        const subNext = nodes[current]
          .clone()
          .add(subDir.multiplyScalar(0.3 + rand() * 0.3));
        nodes.push(subNext);
        edges.push([current, nodes.length - 1]);
      }
    }
  }

  return { nodes, edges };
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Dendrite() {
  const groupRef = useRef<THREE.Group>(null);

  const { positions, linePositions, sizes } = useMemo(() => {
    const { nodes, edges } = generateDendrite(7);
    const positions = new Float32Array(nodes.length * 3);
    const sizes = new Float32Array(nodes.length);
    nodes.forEach((n, i) => {
      positions[i * 3] = n.x;
      positions[i * 3 + 1] = n.y;
      positions[i * 3 + 2] = n.z;
      sizes[i] = 0.04 + Math.random() * 0.05;
    });
    const linePositions = new Float32Array(edges.length * 2 * 3);
    edges.forEach(([a, b], i) => {
      const na = nodes[a];
      const nb = nodes[b];
      linePositions[i * 6] = na.x;
      linePositions[i * 6 + 1] = na.y;
      linePositions[i * 6 + 2] = na.z;
      linePositions[i * 6 + 3] = nb.x;
      linePositions[i * 6 + 4] = nb.y;
      linePositions[i * 6 + 5] = nb.z;
    });
    return { positions, linePositions, sizes };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.18) * 0.18;
  });

  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    return g;
  }, [linePositions]);

  const pointGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [positions, sizes]);

  return (
    <group ref={groupRef}>
      {/* Edges */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial
          color="#3ee08f"
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Nodes (glowing points) */}
      <points geometry={pointGeo}>
        <pointsMaterial
          color="#5cffb1"
          size={0.085}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Larger soft halo points for glow effect */}
      <points geometry={pointGeo}>
        <pointsMaterial
          color="#22d3ee"
          size={0.22}
          sizeAttenuation
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Inner core glow */}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial
          color="#5cffb1"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial
          color="#3ee08f"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 220;

  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 2.2;
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.04;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color="#8b5cf6"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function DendriticScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 6]} intensity={1.2} color="#5cffb1" />
      <pointLight position={[-6, -4, -3]} intensity={0.8} color="#8b5cf6" />

      <Float
        speed={1.1}
        rotationIntensity={0.3}
        floatIntensity={0.6}
        floatingRange={[-0.08, 0.08]}
      >
        <Dendrite />
      </Float>

      <Particles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        rotateSpeed={0.3}
      />
    </Canvas>
  );
}
