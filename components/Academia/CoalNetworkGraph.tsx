"use client";
import dynamic from "next/dynamic";
import { colorForGroup } from "./groupColors";
import { useEffect, useMemo, useRef, useState } from "react";

// Dynamically import to avoid SSR and keep bundle light
const ForceGraph2D: any = dynamic(
  () => import("react-force-graph-2d").then((m) => m.default as any),
  { ssr: false },
);

type GraphData = {
  nodes: Array<{ id: string | number; [k: string]: any }>;
  links: Array<{
    source: string | number;
    target: string | number;
    [k: string]: any;
  }>;
};

type Props = {
  dataUrl: string; // e.g. "/coal/coalPlant_graph.json"
  height: number; // pixels
  freeLayout?: boolean; // if true, let ForceGraph simulate; otherwise stick to provided x,y
};

export default function CoalNetworkGraph({
  dataUrl,
  height,
  freeLayout = true,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(800);
  const [data, setData] = useState<GraphData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [highlightNodes, setHighlightNodes] = useState<Set<any>>(new Set());
  const [highlightLinks, setHighlightLinks] = useState<Set<any>>(new Set());
  const [hoverNode, setHoverNode] = useState<any | null>(null);
  const [selected, setSelected] = useState<{
    node: any;
    x: number;
    y: number;
  } | null>(null);
  const [query, setQuery] = useState("");
  const fgRef = useRef<any>(null);
  const fitOnceRef = useRef<boolean>(false);
  const [groups, setGroups] = useState<
    Array<{
      id: number;
      label?: string;
      description?: string;
      meta?: Record<string, any>;
      nodes: any[];
    }>
  >([]);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(() => {
      if (wrapRef.current) setWidth(wrapRef.current.clientWidth);
    });
    ro.observe(wrapRef.current);
    setWidth(wrapRef.current.clientWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let abort = false;
    setError(null);
    fetch(dataUrl)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.statusText))))
      .then((json) => {
        if (abort) return;
        const g = json as GraphData;
        // Build neighbor/link refs for highlighting
        const idx: Record<string | number, any> = {};
        g.nodes.forEach((n: any) => (idx[n.id] = n));
        g.links.forEach((lk: any) => {
          const a = typeof lk.source === "object" ? lk.source : idx[lk.source];
          const b = typeof lk.target === "object" ? lk.target : idx[lk.target];
          if (!a || !b) return;
          (a.neighbors ||= []).push(b);
          (b.neighbors ||= []).push(a);
          (a.links ||= []).push(lk);
          (b.links ||= []).push(lk);
        });
        // ensure free layout
        g.nodes.forEach((n: any) => {
          delete n.x;
          delete n.y;
          delete n.vx;
          delete n.vy;
        });
        setData(g);

        // Load group info JSON and align group membership
        fetch("/coal/coalGroup_info.json")
          .then((r) => (r.ok ? r.json() : null))
          .then((info) => {
            if (!info) return;
            const byId: Record<string | number, any> = {};
            g.nodes.forEach((n: any) => {
              byId[n.id] = n;
            });
            const comps: Array<{
              id: number;
              label?: string;
              description?: string;
              meta?: Record<string, any>;
              nodes: any[];
            }> = [];
            Object.keys(info).forEach((k) => {
              const gid = Number(k);
              const gi: any = (info as any)[k] || {};
              const nodes: any[] = [];
              (gi.nodes || []).forEach((nid: any) => {
                const n = byId[nid];
                if (n) {
                  n.groupId = gid;
                  nodes.push(n);
                }
              });
              const { nodes: _omit, ...rest } = gi;
              comps.push({
                id: gid,
                label: gi["Retirement archetype"],
                description: gi["Drivers for planned retirements"],
                meta: rest,
                nodes,
              });
            });
            // Assign ungrouped by connectivity
            const ungrouped = (g.nodes as any[]).filter(
              (n) => typeof n.groupId !== "number",
            );
            if (ungrouped.length) {
              let next = comps.length
                ? Math.max(...comps.map((c) => c.id)) + 1
                : 0;
              const seen = new Set<any>();
              for (const n of ungrouped) {
                if (seen.has(n)) continue;
                const bucket: any[] = [];
                const stack = [n];
                seen.add(n);
                while (stack.length) {
                  const cur = stack.pop();
                  if (!cur) continue;
                  cur.groupId = next;
                  bucket.push(cur);
                  (cur.neighbors || []).forEach((nbr: any) => {
                    if (!seen.has(nbr)) {
                      seen.add(nbr);
                      stack.push(nbr);
                    }
                  });
                }
                comps.push({ id: next, nodes: bucket });
                next++;
              }
            }
            setGroups(comps.sort((a, b) => a.id - b.id));
          })
          .catch(() => {});
      })
      .catch((e) => !abort && setError(e?.message || "Failed to load graph"));
    return () => {
      abort = true;
    };
  }, [dataUrl]);

  const updateHighlight = () => {
    // trigger state update for highlight overlays
    setHighlightNodes(new Set(highlightNodes));
    setHighlightLinks(new Set(highlightLinks));
  };

  const onNodeHover = (node: any) => {
    highlightNodes.clear();
    highlightLinks.clear();
    if (node) {
      highlightNodes.add(node);
      (node.neighbors || []).forEach((nbr: any) => highlightNodes.add(nbr));
      (node.links || []).forEach((lk: any) => highlightLinks.add(lk));
    }
    setHoverNode(node || null);
    updateHighlight();
  };

  const onLinkHover = (link: any) => {
    highlightNodes.clear();
    highlightLinks.clear();
    if (link) {
      highlightLinks.add(link);
      if (link.source) highlightNodes.add(link.source);
      if (link.target) highlightNodes.add(link.target);
    }
    updateHighlight();
  };

  // Search matching and component calculation
  const matchSet = useMemo(() => {
    if (!data || !query.trim()) return new Set<any>();
    const q = query.toLowerCase();
    const s = new Set<any>();
    data.nodes.forEach((n: any) => {
      const plants = Array.isArray(n.plants) ? n.plants : [];
      for (const p of plants) {
        const name = String(p["Plant Name"] ?? "").toLowerCase();
        if (name.includes(q)) {
          s.add(n);
          break;
        }
      }
    });
    return s;
  }, [data, query]);

  const componentSet = useMemo(() => {
    const s = new Set<any>();
    if (!data) return s;
    const visit = (start: any) => {
      const stack = [start];
      const seen = new Set<any>([start]);
      while (stack.length) {
        const cur = stack.pop();
        if (!cur) continue;
        s.add(cur);
        (cur.neighbors || []).forEach((nbr: any) => {
          if (!seen.has(nbr)) {
            seen.add(nbr);
            stack.push(nbr);
          }
        });
      }
    };
    if (selected?.node) visit(selected.node);
    else if (matchSet.size) matchSet.forEach((n) => visit(n));
    if (activeGroup != null) {
      const grp = groups.find((g) => g.id === activeGroup);
      if (grp) {
        s.clear();
        grp.nodes.forEach((n) => s.add(n));
      }
    }
    return s;
  }, [data, selected, matchSet, activeGroup, groups]);

  const paintRing = (node: any, ctx: CanvasRenderingContext2D) => {
    const NODE_R = 8;
    // highlight hovered/neighbor nodes
    if (highlightNodes.has(node)) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
      ctx.fillStyle = node === hoverNode ? "red" : "orange";
      ctx.fill();
    }
    // highlight search matches with blue halo
    if (matchSet.has(node)) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_R * 1.8, 0, 2 * Math.PI, false);
      ctx.strokeStyle = "rgba(59,130,246,0.9)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  // Force a redraw when search changes so highlight rings and sizes update even when engine paused
  useEffect(() => {
    try {
      fgRef.current?.refresh();
    } catch {}
    // Recenter and zoom to the matched component(s)
    if (!fgRef.current || !data) return;
    const nodes = Array.from(componentSet.size ? componentSet : matchSet);
    if (!nodes.length) return;
    const xs = nodes.map((n: any) => n.x).filter((v) => typeof v === "number");
    const ys = nodes.map((n: any) => n.y).filter((v) => typeof v === "number");
    if (!xs.length || !ys.length) return;
    const minX = Math.min(...xs),
      maxX = Math.max(...xs);
    const minY = Math.min(...ys),
      maxY = Math.max(...ys);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const dx = Math.max(1, maxX - minX);
    const dy = Math.max(1, maxY - minY);
    const padding = 80;
    const scaleX = width / (dx + padding);
    const scaleY = height / (dy + padding);
    const k = Math.min(scaleX, scaleY);
    // first zoom out to show some context, then center/zoom
    try {
      fgRef.current.zoom(Math.min(1, k), 200);
      fgRef.current.centerAt(cx, cy, 300);
      setTimeout(() => {
        try {
          fgRef.current.zoom(k * 0.9, 300);
        } catch {}
      }, 350);
    } catch {}
  }, [query]);

  // Also refresh when selection changes so selected node color updates immediately
  useEffect(() => {
    try {
      fgRef.current?.refresh();
    } catch {}
  }, [selected]);

  // Snap to active group on change
  useEffect(() => {
    if (activeGroup == null || !fgRef.current || !groups.length) return;
    const grp = groups.find((g) => g.id === activeGroup);
    if (!grp) return;
    const nodes = grp.nodes;
    const xs = nodes.map((n: any) => n.x).filter((v) => typeof v === "number");
    const ys = nodes.map((n: any) => n.y).filter((v) => typeof v === "number");
    if (!xs.length || !ys.length) return;
    const minX = Math.min(...xs),
      maxX = Math.max(...xs);
    const minY = Math.min(...ys),
      maxY = Math.max(...ys);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const dx = Math.max(1, maxX - minX);
    const dy = Math.max(1, maxY - minY);
    const padding = 80;
    const scaleX = width / (dx + padding);
    const scaleY = height / (dy + padding);
    const k = Math.min(scaleX, scaleY);
    try {
      fgRef.current.zoom(Math.min(1, k), 200);
      fgRef.current.centerAt(cx, cy, 300);
      setTimeout(() => {
        try {
          fgRef.current.zoom(k * 0.9, 300);
        } catch {}
      }, 350);
    } catch {}
  }, [activeGroup, groups, width, height]);

  const closePopup = () => setSelected(null);

  const safeEntries = (obj: any) => {
    if (!obj) return [] as [string, any][];
    const omit = new Set([
      "neighbors",
      "links",
      "x",
      "y",
      "vx",
      "vy",
      "index",
      "__indexColor",
      "plants",
    ]);
    return Object.entries(obj).filter(([k, _]) => !omit.has(k));
  };

  return (
    <div className="flex" style={{ width: "100%", height }}>
      <div ref={wrapRef} className="relative flex-1" style={{ height: "100%" }}>
        {/* Search overlay (always available) */}
        <div className="pointer-events-auto absolute left-3 top-3 z-10 flex w-[min(520px,90%)] items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search plant name…"
            name="plant-search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            inputMode="search"
            aria-autocomplete="none"
            className="w-full rounded-md border border-slate-300 bg-white/90 px-3 py-2 text-sm outline-none backdrop-blur placeholder:text-slate-400 focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
          />
          <button
            type="button"
            className="shrink-0 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            onClick={() => {
              try {
                fgRef.current?.zoomToFit(400, 40);
              } catch {}
            }}
          >
            Reset View
          </button>
        </div>
        {!data && !error && (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-500 dark:text-slate-400">
            Loading graph…
          </div>
        )}
        {error && (
          <div className="flex h-full w-full items-center justify-center text-sm text-red-500">
            {error}
          </div>
        )}
        {data && typeof ForceGraph2D !== "undefined" && (
          <ForceGraph2D
            ref={(el: any) => {
              fgRef.current = el;
              // schedule a single fit after initial mount
              if (
                el &&
                typeof el.zoomToFit === "function" &&
                !fitOnceRef.current
              ) {
                fitOnceRef.current = true;
                setTimeout(() => {
                  try {
                    el.zoomToFit(400, 40);
                  } catch {}
                }, 120);
              }
            }}
            width={width}
            height={height}
            graphData={data}
            nodeRelSize={8}
            nodeVal={(n: any) => (matchSet.has(n) ? 4 : 1)}
            nodeColor={(n: any) => {
              // Selection overrides search color
              if (selected?.node === n) return "#64748b"; // slate-500
              if (matchSet.has(n)) return "#16a34a"; // green for search matches
              // Color by group if available
              if (typeof (n as any).groupId === "number") {
                const c = colorForGroup((n as any).groupId);
                if (c) return c;
              }
              return undefined; // default color
            }}
            autoPauseRedraw={true}
            linkWidth={(lk: any) => (highlightLinks.has(lk) ? 5 : 1)}
            linkDirectionalParticles={4}
            linkDirectionalParticleWidth={(lk: any) =>
              highlightLinks.has(lk) ? 4 : 0
            }
            nodeCanvasObjectMode={(n: any) =>
              highlightNodes.has(n) || matchSet.has(n) ? "before" : undefined
            }
            nodeCanvasObject={paintRing}
            linkColor={(lk: any) => {
              if (activeGroup == null)
                return highlightLinks.has(lk)
                  ? "rgba(59,130,246,0.9)"
                  : "rgba(148,163,184,0.5)";
              const src = lk.source as any;
              const tgt = lk.target as any;
              const inGrp =
                src?.groupId === activeGroup && tgt?.groupId === activeGroup;
              return inGrp
                ? highlightLinks.has(lk)
                  ? "rgba(59,130,246,0.9)"
                  : "rgba(148,163,184,0.7)"
                : "rgba(148,163,184,0.2)";
            }}
            onNodeHover={onNodeHover}
            onLinkHover={onLinkHover}
            onBackgroundClick={() => setSelected(null)}
            onNodeClick={(n: any, evt: any) => {
              const rect = wrapRef.current?.getBoundingClientRect();
              const x = rect ? evt.clientX - rect.left : (evt?.offsetX ?? 0);
              const y = rect ? evt.clientY - rect.top : (evt?.offsetY ?? 0);
              setSelected({ node: n, x, y });
            }}
          />
        )}
        {/* Group control */}
        {groups.length > 0 && (
          <div className="pointer-events-auto absolute right-3 top-3 z-10 flex items-center gap-2 rounded-md bg-white/85 p-2 text-sm shadow dark:bg-slate-900/80">
            <label className="text-slate-600 dark:text-slate-300">Group:</label>
            <select
              className="rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              value={activeGroup ?? ""}
              onChange={(e) =>
                setActiveGroup(
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
            >
              <option value="">All</option>
              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.id}
                  {g.label ? ` – ${g.label}` : ""} ({g.nodes.length})
                </option>
              ))}
            </select>
            <button
              className="rounded bg-slate-900 px-2 py-1 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              onClick={() =>
                setActiveGroup((prev) => {
                  if (prev == null) return groups[0]?.id ?? null;
                  const idx = groups.findIndex((g) => g.id === prev);
                  const next = groups[(idx + 1) % groups.length]?.id;
                  return next ?? null;
                })
              }
            >
              Next
            </button>
          </div>
        )}

        {/* Info tooltip bottom-right */}
        <div className="pointer-events-auto absolute bottom-3 right-3 z-10">
          <div className="group relative">
            <button
              aria-label="Graph help"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-700 shadow hover:bg-white dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
            >
              <span className="text-[13px] font-semibold">i</span>
            </button>
            <div
              role="tooltip"
              className="invisible absolute bottom-9 right-0 w-[min(320px,85vw)] translate-y-1 rounded-md border border-slate-200 bg-white p-3 text-xs text-slate-700 opacity-0 shadow-lg transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              <p>
                Click a node to see its plants and group details in the right sidebar.
              </p>
              <p className="mt-1">
                Use the Group control (top‑right) to view a specific group or cycle through groups.
              </p>
              <p className="mt-1">Hover a node to highlight its neighbors.</p>
            </div>
          </div>
        </div>

        {/* Collapsible Sidebar overlay inside frame */}
        {selected?.node && (
          <aside className="pointer-events-auto absolute right-0 top-0 z-10 flex h-full w-[380px] flex-col border-l border-slate-200 bg-white/90 p-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Node ID:{" "}
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {String(selected.node.id)}
                </span>
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close details"
                className="rounded p-1 text-slate-500 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:bg-slate-800/70"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 6l8 8M14 6l-8 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            {/* Group summary */}
            {typeof (selected.node as any).groupId === "number" && (
              <div className="mb-3 rounded-md border border-slate-200 p-3 text-xs dark:border-slate-700">
                {(() => {
                  const gid = (selected.node as any).groupId;
                  const grp = groups.find((g) => g.id === gid);
                  return (
                    <div>
                      <div className="mb-2 font-medium text-slate-800 dark:text-slate-100">
                        Group {gid}
                        {grp?.label ? `: ${grp.label}` : ""}
                        {grp?.meta?.Name ? ` – ${grp.meta.Name}` : ""}
                      </div>
                      {grp && (
                        <dl className="mb-2 grid grid-cols-[160px_1fr] gap-x-3 gap-y-1 text-slate-700 dark:text-slate-300">
                          {grp.label && (
                            <>
                              <dt className="text-slate-500 dark:text-slate-400">
                                Retirement archetype
                              </dt>
                              <dd>{grp.label}</dd>
                            </>
                          )}
                          {grp.description && (
                            <>
                              <dt className="text-slate-500 dark:text-slate-400">
                                Retirement drivers
                              </dt>
                              <dd>{grp.description}</dd>
                            </>
                          )}
                        </dl>
                      )}
                      <button
                        className="rounded bg-slate-900 px-2 py-1 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                        onClick={() => setActiveGroup(gid)}
                      >
                        Snap to Group
                      </button>
                    </div>
                  );
                })()}
              </div>
            )}
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-slate-200 dark:border-slate-700">
              <div className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium uppercase tracking-wide text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Plants (
                {Array.isArray((selected.node as any).plants)
                  ? (selected.node as any).plants.length
                  : 0}
                )
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                <table className="w-full text-left text-sm">
                  <thead className="sticky top-0 bg-white text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                    <tr>
                      <th className="px-3 py-2">Plant Name</th>
                      <th className="px-3 py-2">Retirement Date</th>
                      <th className="px-3 py-2">Utility Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray((selected.node as any).plants) &&
                      (selected.node as any).plants.map((p: any, i: number) => (
                        <tr
                          key={(p["Plant Name"] ?? "") + String(i)}
                          className="border-t border-slate-100 dark:border-slate-800"
                        >
                          <td className="px-3 py-2 text-slate-900 dark:text-slate-100">
                            {p["Plant Name"] ?? "–"}
                          </td>
                          <td className="px-3 py-2 text-slate-700 dark:text-slate-300">
                            {p["Retirement Date"] ?? "N/A"}
                          </td>
                          <td className="px-3 py-2 text-slate-700 dark:text-slate-300">
                            {p["Utility Name"] ?? "–"}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
