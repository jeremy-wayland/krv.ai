import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

type Props = {
  color?: string;
  zoom?: number;
  shape?: "cube" | "tetrahedron" | string;
  count?: number;
  drift?: number; // pixel drift amplitude for node motion
};

type NodeP = {
  x: number; // normalized 0..1
  y: number; // normalized 0..1
  phase: number;
  speed: number;
  size: number;
  neighbors: number[]; // indices
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function App({
  color = "#ff0071",
  zoom = 12,
  shape = "tetrahedron",
  count = 28,
  drift = 0,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodesRef = useRef<NodeP[]>([]);
  const rafRef = useRef<number | null>(null);
  const visibleRef = useRef<boolean>(true);
  const lastRewireRef = useRef<number>(0);
  const travelersRef = useRef<
    Array<{
      from: number;
      to: number;
      t: number;
      speed: number;
      prev?: number;
      segs: { ax: number; ay: number; bx: number; by: number; speed: number }[];
    }>
  >([]);
  const lastTsRef = useRef<number | null>(null);
  const segmentsRef = useRef<
    Array<{
      ax: number;
      ay: number;
      bx: number;
      by: number;
      t: number; // progress 0..1
      speed: number; // draw speed
      dir: 1 | -1; // 1=grow, -1=undraw
    }>
  >([]);
  const maxTrailsRef = useRef<number>(300);

  // Precompute item positions and motion
  const seed = useMemo(() => Math.random() * 1000, []);

  // Initialize network when count or zoom changes
  useLayoutEffect(() => {
    // base size inversely related to zoom (higher zoom -> smaller)
    // larger base for bigger nodes with fewer overall
    const base = clamp(9 * (12 / (zoom || 12)), 3.5, 16);

    // distribute nodes in normalized space with margin
    const margin = 0.08;
    const pts: NodeP[] = [];
    for (let i = 0; i < count; i++) {
      pts.push({
        x: margin + Math.random() * (1 - margin * 2),
        y: margin + Math.random() * (1 - margin * 2),
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.6,
        size: base * (0.8 + Math.random() * 0.6),
        neighbors: [],
      });
    }
    // initial neighbor assignment
    const assignNeighbors = () => {
      for (let i = 0; i < pts.length; i++) {
        const dists: Array<{ j: number; d: number }> = [];
        for (let j = 0; j < pts.length; j++) {
          if (i === j) continue;
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          dists.push({ j, d: dx * dx + dy * dy });
        }
        dists.sort((a, b) => a.d - b.d);
        const k = 2 + Math.floor(Math.random() * 3); // 2..4
        pts[i].neighbors = dists.slice(0, k).map((e) => e.j);
      }
    };
    assignNeighbors();
    nodesRef.current = pts;
    lastRewireRef.current = performance.now();
    // seed travelers
    const m = Math.max(12, Math.floor(count / 2));
    const travelers: Array<{
      from: number;
      to: number;
      t: number;
      speed: number;
      prev?: number;
      segs: { ax: number; ay: number; bx: number; by: number; speed: number }[];
    }> = [];
    for (let i = 0; i < m; i++) {
      const from = Math.floor(Math.random() * pts.length);
      const neigh = pts[from].neighbors.length
        ? pts[from].neighbors
        : [Math.floor(Math.random() * pts.length)];
      const to = neigh[Math.floor(Math.random() * neigh.length)];
      travelers.push({
        from,
        to,
        t: Math.random() * 0.8,
        // slower default draw speed to avoid appearing fully connected
        speed: 0.15 + Math.random() * 0.35,
        segs: [],
      });
    }
    travelersRef.current = travelers;
    lastTsRef.current = null;
    segmentsRef.current = [];
  }, [count, zoom]);

  // Resize canvas to fit container and DPR
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      canvas.style.width = clientWidth + "px";
      canvas.style.height = clientHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // Animation loop
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t0 = performance.now();

    const drawCircle = (cx: number, cy: number, r: number) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    };

    const draw = (now: number) => {
      const t = (now - t0) / 1000; // seconds
      const { clientWidth: w, clientHeight: h } = container;

      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;

      // compute dt early for persistence aging
      const tsPrev = lastTsRef.current ?? now;
      const dt = Math.min(0.05, (now - tsPrev) / 1000); // clamp delta
      lastTsRef.current = now;

      // periodically rewire connectivity to simulate connect/disconnect
      if (now - lastRewireRef.current > 2000) {
        // Occasionally adjust connectivity with O(1) random picks to keep CPU low
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].neighbors.length > 0 && Math.random() < 0.5) nodes[i].neighbors.pop();
          let pick = i;
          // pick a different random neighbor index without allocating arrays
          while (pick === i) pick = Math.floor(Math.random() * nodes.length);
          if (!nodes[i].neighbors.includes(pick)) nodes[i].neighbors.push(pick);
        }
        lastRewireRef.current = now;
      }

      // draw edges first
      // draw persistent segments (grow, then undraw smoothly)
      const segs = segmentsRef.current;
      for (let s = segs.length - 1; s >= 0; s--) {
        const seg = segs[s];
        const factor = seg.dir === -1 ? 0.55 : 1; // slow down undraw
        seg.t += seg.speed * factor * dt * seg.dir;
        if (seg.dir === 1 && seg.t >= 1) {
          seg.t = 1;
          seg.dir = -1;
        } else if (seg.dir === -1 && seg.t <= 0) {
          segs.splice(s, 1);
          continue;
        }
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.18;
        ctx.lineWidth = 1.1;
        const px = Math.max(0, Math.min(1, seg.t));
        const gx = seg.ax + (seg.bx - seg.ax) * px;
        const gy = seg.ay + (seg.by - seg.ay) * px;
        ctx.beginPath();
        ctx.moveTo(seg.ax, seg.ay);
        ctx.lineTo(gx, gy);
        ctx.stroke();
      }

      // animate travelers: solid paths that grow across multiple nodes
      const pos = (idx: number) => {
        const n = nodes[idx];
        return {
          x: n.x * w + (drift ? Math.sin(t * 0.25 + n.phase + seed) * drift : 0),
          y: n.y * h + (drift ? Math.cos(t * 0.22 + n.phase) * drift : 0),
        };
      };

      ctx.strokeStyle = color;
      ctx.lineWidth = 1.3;
      ctx.globalAlpha = 0.45;

      const walkers = travelersRef.current;
      for (let k = 0; k < walkers.length; k++) {
        const wkr = walkers[k];
        const a = pos(wkr.from);
        const b = pos(wkr.to);
        const x = a.x + (b.x - a.x) * wkr.t;
        const y = a.y + (b.y - a.y) * wkr.t;
        // draw already-completed solid segments for this traveler
        for (let s = 0; s < wkr.segs.length; s++) {
          const sg = wkr.segs[s];
          ctx.beginPath();
          ctx.moveTo(sg.ax, sg.ay);
          ctx.lineTo(sg.bx, sg.by);
          ctx.stroke();
        }
        // draw current partial segment as solid
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(x, y);
        ctx.stroke();

        // advance
        wkr.t += dt * wkr.speed;
        if (wkr.t >= 1) {
          // On hop completion: keep recent segments as solid; demote oldest to trails
          const MAX_ACTIVE_SOLID = 3;
          wkr.segs.push({
            ax: a.x,
            ay: a.y,
            bx: b.x,
            by: b.y,
            speed: wkr.speed,
          });
        if (wkr.segs.length > MAX_ACTIVE_SOLID) {
          const old = wkr.segs.shift();
          if (old)
            segmentsRef.current.push({
              ax: old.ax,
              ay: old.ay,
              bx: old.bx,
              by: old.by,
              t: 0,
              speed: old.speed,
              dir: 1,
            });
          // cap total number of trail segments to avoid unbounded growth
          const MAX = maxTrailsRef.current;
          if (segmentsRef.current.length > MAX) {
            const overflow = segmentsRef.current.length - MAX;
            // Rather than deleting (which causes popping), force oldest to undraw
            for (let i = 0; i < overflow && i < segmentsRef.current.length; i++) {
              const seg = segmentsRef.current[i];
              seg.dir = -1; // begin undrawing smoothly
              seg.speed *= 0.55; // slow undraw a bit
            }
          }
        }
          wkr.t = 0;
          wkr.prev = wkr.from;
          wkr.from = wkr.to;
          // pick next hop from neighbors, avoid immediate backtrack when possible
          const neigh = nodes[wkr.from].neighbors.length
            ? nodes[wkr.from].neighbors
            : [Math.floor(Math.random() * nodes.length)];
          let next = neigh[Math.floor(Math.random() * neigh.length)];
          if (neigh.length > 1 && wkr.prev != null && next === wkr.prev) {
            next = neigh[(neigh.indexOf(next) + 1) % neigh.length];
          }
          wkr.to = next;
          // slower per-hop speed as well
          wkr.speed = 0.15 + Math.random() * 0.35;
        }
      }

      // draw circular nodes on top
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.95;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const x = n.x * w + (drift ? Math.sin(t * 0.25 + n.phase + seed) * drift : 0);
        const y = n.y * h + (drift ? Math.cos(t * 0.22 + n.phase) * drift : 0);
        // larger nodes for clearer emphasis in a sparser network
        drawCircle(x, y, n.size * 0.32);
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    const startRAF = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(draw);
    };
    const stopRAF = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    // Intersection Observer to pause offscreen
    const io = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((e) => e.isIntersecting);
        visibleRef.current = isVisible;
        if (isVisible) startRAF();
        else stopRAF();
      },
      { root: null, threshold: 0.01 }
    );
    io.observe(container);

    const onVis = () => {
      if (document.hidden) stopRAF();
      else if (visibleRef.current) startRAF();
    };
    document.addEventListener("visibilitychange", onVis);

    // kick off
    startRAF();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      stopRAF();
    };
  }, [color, shape, seed]);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
