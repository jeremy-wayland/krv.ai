"use client";
import {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const shape = useMemo(
    () => (Math.random() > 0.5 ? "cube" : "tetrahedron"),
    [],
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nSrcSysRef = useRef<HTMLDivElement | null>(null);
  const nEngineRef = useRef<HTMLDivElement | null>(null);
  const nModelsRef = useRef<HTMLDivElement | null>(null);
  const nApiRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef<
    | {
        id: string;
        dx: number;
        dy: number;
        w: number;
        h: number;
        minX: number;
        maxX: number;
        minY: number;
        maxY: number;
      }
    | null
  >(
    null,
  );
  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [paths, setPaths] = useState<Array<{ d: string }>>([]);

  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

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
      const srcW = 260,
        srcH = 60;
      const engW = 420,
        engH = 240; // base est; will use real height if available
      const mdlW = 260,
        mdlH = 60;
      const apiW = 260,
        apiH = 60;

      const engRealH = nEngineRef.current?.offsetHeight ?? engH + 40;
      const extraGap = 12;

      setPositions({
        srcSys: { x: centerX - srcW / 2, y: topY },
        engine: { x: centerX - engW / 2, y: topY + srcH + vGap },
        models: {
          x: centerX - mdlW / 2,
          y: topY + srcH + vGap + engRealH + vGap + extraGap,
        },
        api: {
          x: centerX - apiW / 2,
          y: topY + srcH + vGap + engRealH + vGap + extraGap + mdlH + vGap,
        },
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

      const bottomCenter = (r: DOMRect) => ({
        x: r.left - cb.left + r.width / 2,
        y: r.top - cb.top + r.height,
      });
      const topCenter = (r: DOMRect) => ({
        x: r.left - cb.left + r.width / 2,
        y: r.top - cb.top,
      });

      const pSys = bottomCenter(srcSysB);
      const pEngTop = topCenter(engB);
      const pEngBottom = bottomCenter(engB);
      const pMdlTop = topCenter(mdlB);
      const pMdlBottom = bottomCenter(mdlB);
      const pApiTop = topCenter(apiB);

      const curve = (
        a: { x: number; y: number },
        b: { x: number; y: number },
        bend = 0,
      ) => {
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
  const onPointerDown = (id: string) => (e: ReactPointerEvent) => {
    const c = containerRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const pos = positions[id] || { x: 0, y: 0 };
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const target = e.currentTarget as HTMLElement;
    const w = target.offsetWidth;
    const h = target.offsetHeight;
    // Responsive paddings with more breathing room on all sides
    const padX = Math.max(12, Math.min(32, Math.round(c.clientWidth * 0.04)));
    const padTop = Math.max(12, Math.min(32, Math.round(c.clientHeight * 0.03)));
    const padBottom = Math.max(
      140,
      Math.min(360, Math.round(c.clientHeight * 0.32)),
    );

    // Compute bounds; ensure we don't immediately clamp current position
    const minX = padX;
    let maxX = Math.max(minX, c.clientWidth - w - padX);
    const minY = padTop;
    let maxY = Math.max(minY, c.clientHeight - h - padBottom);
    // Avoid jump if initial layout placed node slightly beyond maxY on small screens
    maxY = Math.max(maxY, pos.y);
    // Avoid jump for X as well if initial layout is slightly beyond
    maxX = Math.max(maxX, pos.x);

    draggingRef.current = {
      id,
      dx: mouseX - pos.x,
      dy: mouseY - pos.y,
      w,
      h,
      minX,
      maxX,
      minY,
      maxY,
    };
    (e.currentTarget as HTMLElement).style.cursor = "grabbing";
    try {
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {}
    e.preventDefault();
  };

  const moveRaf = useRef<number | null>(null);
  const lastMove = useRef<{ x: number; y: number } | null>(null);
  const onPointerMove = (e: ReactPointerEvent) => {
    if (!draggingRef.current) return;
    const c = containerRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    lastMove.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (moveRaf.current != null) return;
    moveRaf.current = requestAnimationFrame(() => {
      moveRaf.current = null;
      if (!draggingRef.current || !lastMove.current) return;
      const { id, dx, dy, minX, maxX, minY, maxY } = draggingRef.current;
      const nx = lastMove.current.x - dx;
      const ny = lastMove.current.y - dy;
      const clampedX = Math.min(Math.max(nx, minX), maxX);
      const clampedY = Math.min(Math.max(ny, minY), maxY);
      setPositions((p) => ({ ...p, [id]: { x: clampedX, y: clampedY } }));
    });
  };

  const onPointerUp = () => {
    draggingRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[600px] w-full lg:h-[550px] xl:h-[600px]"
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      >
      {/* Node: Enterprise Systems */}
      <div
        ref={nSrcSysRef}
        className="absolute select-none border border-slate-200/70 bg-white/60 text-slate-900 shadow-[0_6px_16px_rgba(2,6,23,0.12)] dark:border-slate-700/60 dark:bg-slate-900/40 dark:text-slate-100"
        style={{
          ...nodeStyle,
          width: 260,
          left: positions.srcSys?.x ?? 20,
          top: positions.srcSys?.y ?? 20,
          cursor: "grab",
          opacity: ready ? 1 : 0,
        }}
        onPointerDown={onPointerDown("srcSys")}
      >
        <div className="text-[13px] font-medium">Enterprise Systems</div>
      </div>

      {/* Enterprise Data node removed per request */}

      {/* Node: Hypergraph Data Engine (with canvas) */}
      <div
        ref={nEngineRef}
        className="absolute select-none border border-slate-200/70 bg-white/60 text-slate-900 shadow-[0_6px_16px_rgba(2,6,23,0.12)] dark:border-slate-700/60 dark:bg-slate-900/40 dark:text-slate-100"
        style={{
          ...nodeStyle,
          width: 420,
          left: positions.engine?.x ?? 300,
          top: positions.engine?.y ?? 80,
          cursor: "grab",
          opacity: ready ? 1 : 0,
        }}
        onPointerDown={onPointerDown("engine")}
      >
        <div className="mb-2 text-[13px] font-medium">
          Hypergraph Data Engine
        </div>
        <div className="mx-[30px] mb-[30px] h-[200px] w-[calc(100%-60px)] overflow-hidden rounded-lg border border-slate-200/60 bg-gradient-to-br from-sky-400/5 to-pink-500/5 dark:border-slate-700/60">
          <Fiber color={initialColor} shape={shape} zoom={reducedMotion ? 8 : 12} drift={reducedMotion ? 0 : 2} />
        </div>
      </div>

      {/* Node: AI/ML Models */}
      <div
        ref={nModelsRef}
        className="absolute select-none border border-slate-200/70 bg-white/60 text-slate-900 shadow-[0_6px_16px_rgba(2,6,23,0.12)] dark:border-slate-700/60 dark:bg-slate-900/40 dark:text-slate-100"
        style={{
          ...nodeStyle,
          width: 260,
          left: positions.models?.x ?? 640,
          top: positions.models?.y ?? 120,
          cursor: "grab",
          opacity: ready ? 1 : 0,
        }}
        onPointerDown={onPointerDown("models")}
      >
        <div className="text-[13px] font-medium">AI & ML Models</div>
      </div>

      {/* Node: API */}
      <div
        ref={nApiRef}
        className="absolute select-none border border-slate-200/70 bg-white/60 text-slate-900 shadow-[0_6px_16px_rgba(2,6,23,0.12)] dark:border-slate-700/60 dark:bg-slate-900/40 dark:text-slate-100"
        style={{
          ...nodeStyle,
          width: 260,
          left: positions.api?.x ?? 900,
          top: positions.api?.y ?? 120,
          cursor: "grab",
          opacity: ready ? 1 : 0,
        }}
        onPointerDown={onPointerDown("api")}
      >
        <div className="text-[13px] font-medium">API Endpoints</div>
      </div>

      {/* Curvy connectors */}
      <svg
        className="pointer-events-none absolute inset-0 text-slate-400 dark:text-slate-600"
        width="100%"
        height="100%"
        style={{ opacity: ready ? 1 : 0 }}
      >
        <defs>
          <marker
            id="sf-arrow"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
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
