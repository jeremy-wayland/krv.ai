"use client";
import { CSSProperties, MouseEvent, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Fiber from "./fiber";

type Props = {
  initialColor?: string;
};

const nodeStyle: CSSProperties = {
  borderRadius: 14,
  padding: "12px 14px",
  fontSize: 12,
  textAlign: "center",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
};

export default function SimpleFlow({ initialColor = "#111" }: Props) {
  // pick a shape deterministically so it doesn't flip during hydration
  const shape = useMemo(() => (Math.random() > 0.5 ? "cube" : "tetrahedron"), []);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nSrcSysRef = useRef<HTMLDivElement | null>(null);
  const nEngineRef = useRef<HTMLDivElement | null>(null);
  const nModelsRef = useRef<HTMLDivElement | null>(null);
  const nApiRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef<{ id: string; dx: number; dy: number } | null>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [paths, setPaths] = useState<Array<{ d: string }>>([]);

  const [ready, setReady] = useState(false);

  // Initialize centered, compact vertical layout once container is measured
  useLayoutEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const place = () => {
      const { clientWidth: w, clientHeight: h } = c;
      const centerX = Math.max(0, w / 2);
      const topY = Math.max(0, h / 2 - 220);
      // Vertical stack, compact
      const vGap = 24;
      // Standardize text-only cards to same width; enlarge engine
      const srcW = 260, srcH = 60;
      const engW = 420, engH = 240; // base est; will use real height if available
      const mdlW = 260, mdlH = 60;
      const apiW = 260, apiH = 60;

      const engRealH = (nEngineRef.current?.offsetHeight ?? (engH + 40));
      const extraGap = 24; // additional breathing room between engine and models

      setPositions({
        srcSys: { x: centerX - srcW / 2, y: topY },
        engine: { x: centerX - engW / 2, y: topY + srcH + vGap },
        models: { x: centerX - mdlW / 2, y: topY + srcH + vGap + engRealH + vGap + extraGap },
        api: { x: centerX - apiW / 2, y: topY + srcH + vGap + engRealH + vGap + extraGap + mdlH + vGap },
      });
      setReady(true);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  // Compute curvy connector paths from node DOM boxes (throttled to rAF)
  useEffect(() => {
    let raf: number | null = null;
    const compute = () => {
      const c = containerRef.current;
      const srcSys = nSrcSysRef.current;
      const eng = nEngineRef.current;
      const mdl = nModelsRef.current;
      const api = nApiRef.current;
      if (!c || !srcSys || !eng || !mdl || !api) return;
      const cb = c.getBoundingClientRect();
      const srcSysB = srcSys.getBoundingClientRect();
      const engB = eng.getBoundingClientRect();
      const mdlB = mdl.getBoundingClientRect();
      const apiB = api.getBoundingClientRect();

      const bottomCenter = (r: DOMRect) => ({ x: r.left - cb.left + r.width / 2, y: r.top - cb.top + r.height });
      const topCenter = (r: DOMRect) => ({ x: r.left - cb.left + r.width / 2, y: r.top - cb.top });

      const pSys = bottomCenter(srcSysB);
      const pEngTop = topCenter(engB);
      const pEngBottom = bottomCenter(engB);
      const pMdlTop = topCenter(mdlB);
      const pMdlBottom = bottomCenter(mdlB);
      const pApiTop = topCenter(apiB);

      const curve = (a: { x: number; y: number }, b: { x: number; y: number }, bend = 0) => {
        const dy = b.y - a.y;
        const cx1 = a.x + bend;
        const cy1 = a.y + Math.max(24, dy * 0.5);
        const cx2 = b.x + bend;
        const cy2 = b.y - Math.max(24, dy * 0.5);
        return `M ${a.x} ${a.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${b.x} ${b.y}`;
      };

      setPaths([
        { d: curve(pSys, pEngTop, 0) },
        { d: curve(pEngBottom, pMdlTop, 0) },
        { d: curve(pMdlBottom, pApiTop, 0) },
      ]);
    };

    const schedule = () => {
      if (raf != null) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        compute();
      });
    };

    compute();
    const ro = new ResizeObserver(schedule);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", schedule);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", schedule);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [positions]);

  // Drag logic for nodes
  const onMouseDown = (id: string) => (e: MouseEvent) => {
    const c = containerRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const pos = positions[id] || { x: 0, y: 0 };
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    draggingRef.current = { id, dx: mouseX - pos.x, dy: mouseY - pos.y };
    (e.currentTarget as HTMLElement).style.cursor = "grabbing";
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current) return;
    const c = containerRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const { id, dx, dy } = draggingRef.current;
    const nx = mouseX - dx;
    const ny = mouseY - dy;
    setPositions((p) => ({ ...p, [id]: { x: nx, y: ny } }));
  };

  const onMouseUp = () => {
    draggingRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-[600px] lg:h-[550px] xl:h-[600px] relative"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* Node: Enterprise Systems */}
      <div
        ref={nSrcSysRef}
        className="absolute select-none bg-white/60 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-700/60 text-slate-900 dark:text-slate-100 shadow-[0_6px_16px_rgba(2,6,23,0.12)]"
        style={{
          ...nodeStyle,
          width: 260,
          left: positions.srcSys?.x ?? 20,
          top: positions.srcSys?.y ?? 20,
          cursor: "grab",
          opacity: ready ? 1 : 0,
        }}
        onMouseDown={onMouseDown("srcSys")}
      >
        <div className="text-[13px] font-medium">Enterprise Systems</div>
      </div>

      {/* Enterprise Data node removed per request */}

      {/* Node: Hypergraph Data Engine (with canvas) */}
      <div
        ref={nEngineRef}
        className="absolute select-none bg-white/60 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-700/60 text-slate-900 dark:text-slate-100 shadow-[0_6px_16px_rgba(2,6,23,0.12)]"
        style={{
          ...nodeStyle,
          width: 420,
          left: positions.engine?.x ?? 300,
          top: positions.engine?.y ?? 80,
          cursor: "grab",
          opacity: ready ? 1 : 0,
        }}
        onMouseDown={onMouseDown("engine")}
      >
        <div className="mb-2 text-[13px] font-medium">Hypergraph Data Engine</div>
        <div className="mb-[30px] mx-[30px] w-[calc(100%-60px)] h-[200px] rounded-lg overflow-hidden border border-slate-200/60 dark:border-slate-700/60 bg-gradient-to-br from-sky-400/5 to-pink-500/5">
          <Fiber color={initialColor} shape={shape} zoom={12} drift={2} />
        </div>
      </div>

      {/* Node: AI/ML Models */}
      <div
        ref={nModelsRef}
        className="absolute select-none bg-white/60 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-700/60 text-slate-900 dark:text-slate-100 shadow-[0_6px_16px_rgba(2,6,23,0.12)]"
        style={{
          ...nodeStyle,
          width: 260,
          left: positions.models?.x ?? 640,
          top: positions.models?.y ?? 120,
          cursor: "grab",
          opacity: ready ? 1 : 0,
        }}
        onMouseDown={onMouseDown("models")}
      >
        <div className="text-[13px] font-medium">AI/ML Models</div>
      </div>

      {/* Node: API */}
      <div
        ref={nApiRef}
        className="absolute select-none bg-white/60 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-700/60 text-slate-900 dark:text-slate-100 shadow-[0_6px_16px_rgba(2,6,23,0.12)]"
        style={{
          ...nodeStyle,
          width: 260,
          left: positions.api?.x ?? 900,
          top: positions.api?.y ?? 120,
          cursor: "grab",
          opacity: ready ? 1 : 0,
        }}
        onMouseDown={onMouseDown("api")}
      >
        <div className="text-[13px] font-medium">API</div>
      </div>

      {/* Curvy connectors */}
      <svg
        className="pointer-events-none absolute inset-0 text-slate-400 dark:text-slate-600"
        width="100%"
        height="100%"
        style={{ opacity: ready ? 1 : 0 }}
      >
        <defs>
          <marker id="sf-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
          </marker>
        </defs>
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            markerEnd="url(#sf-arrow)"
          />
        ))}
      </svg>
    </div>
  );
}
