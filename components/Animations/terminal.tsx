"use client";
import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";

export default function Terminal() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrambleText, setScrambleText] = useState("");
  const typeIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(true);
  const charTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lineAdvanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const scrambleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const terminalLines = [
    { type: "command", text: "cat main.tf", delay: 500 },
    {
      type: "output",
      text: 'module "krv_orchestrator"',
      delay: 200,
    },
    {
      type: "output",
      text: '{ source = "krv-ai/orchestrator/gcp" version = "1.3.1" }',
      delay: 800,
    },
    { type: "command", text: "terraform init", delay: 600 },
    { type: "output", text: "Initializing provider plugins...", delay: 300 },
    {
      type: "output",
      text: "Terraform has been successfully initialized!",
      delay: 600,
    },
    { type: "command", text: "terraform apply -auto-approve", delay: 800 },
    {
      type: "output",
      text: "Creating GKE cluster 'krv-production'...",
      delay: 100,
    },
    {
      type: "output",
      text: "Deploying Kubeflow Pipelines + KServe...",
      delay: 100,
    },
    {
      type: "output",
      text: "Setting up artifact registries (models, feeds, workflows)...",
      delay: 100,
    },
    {
      type: "output",
      text: "Deploying orchestrator control plane...",
      delay: 100,
    },
    {
      type: "output",
      text: "Spinning up feed pods and workflow services...",
      delay: 100,
    },
    {
      type: "output",
      text: "Launching model inference endpoints...",
      delay: 100,
    },
    {
      type: "output",
      text: "Configuring Cloud SQL + CI/CD pipelines...",
      delay: 100,
    },
    {
      type: "output",
      text: "Establishing network policies and load balancers...",
      delay: 200,
    },
    {
      type: "output",
      text: "Apply complete! Resources: 47 added, 0 changed, 0 destroyed.",
      delay: 500,
    },
    {
      type: "success",
      text: "krv-orchestrator deployed successfully!",
      delay: 5000,
    },
  ];

  const scrambleChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";

  const scrambleEffect = (finalText, duration = 300) => {
    const startTime = Date.now();
    const iterations = Math.floor(duration / 30);
    let currentIteration = 0;

    if (scrambleIntervalRef.current) {
      clearInterval(scrambleIntervalRef.current);
    }

    scrambleIntervalRef.current = setInterval(() => {
      if (currentIteration >= iterations) {
        setScrambleText("");
        if (scrambleIntervalRef.current) {
          clearInterval(scrambleIntervalRef.current);
        }
        return;
      }

      const progress = currentIteration / iterations;
      const scrambled = finalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i / finalText.length < progress) return char;
          return scrambleChars[
            Math.floor(Math.random() * scrambleChars.length)
          ];
        })
        .join("");

      setScrambleText(scrambled);
      currentIteration++;
    }, 30);
  };

  // Track if the terminal is in the viewport to pause/resume animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) {
      // Pause timers and intervals while offscreen to prevent layout shifts
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
      }
      if (charTimeoutRef.current) {
        clearTimeout(charTimeoutRef.current);
        charTimeoutRef.current = null;
      }
      if (lineAdvanceTimeoutRef.current) {
        clearTimeout(lineAdvanceTimeoutRef.current);
        lineAdvanceTimeoutRef.current = null;
      }
      setIsTyping(false);
      return;
    }
    if (currentLineIndex >= terminalLines.length) {
      const resetTimer = setTimeout(() => {
        setCurrentLineIndex(0);
        setDisplayedText("");
        typeIndexRef.current = 0;
        setScrambleText("");
      }, 3000);
      return () => clearTimeout(resetTimer);
    }

    const currentLine = terminalLines[currentLineIndex];
    setIsTyping(true);
    typeIndexRef.current = 0;

    // Start scramble effect for output lines
    if (currentLine.type === "output" || currentLine.type === "success") {
      scrambleEffect(currentLine.text, 200);
    }

    const typeChar = () => {
      if (typeIndexRef.current < currentLine.text.length) {
        setDisplayedText(currentLine.text.slice(0, typeIndexRef.current + 1));
        typeIndexRef.current++;

        const charDelay = currentLine.type === "command" ? 30 : 10;
        charTimeoutRef.current = setTimeout(typeChar, charDelay);
      } else {
        setIsTyping(false);
        lineAdvanceTimeoutRef.current = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
        }, currentLine.delay);
      }
    };

    typeChar();

    return () => {
      if (scrambleIntervalRef.current) {
        clearInterval(scrambleIntervalRef.current);
      }
      if (charTimeoutRef.current) {
        clearTimeout(charTimeoutRef.current);
        charTimeoutRef.current = null;
      }
      if (lineAdvanceTimeoutRef.current) {
        clearTimeout(lineAdvanceTimeoutRef.current);
        lineAdvanceTimeoutRef.current = null;
      }
    };
  }, [currentLineIndex, isInView]);

  const copyToClipboard = () => {
    const textToCopy = terminalLines
      .filter((line) => line.type === "command")
      .map((line) => line.text)
      .join("\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentLine = terminalLines[currentLineIndex];
  const displayText = scrambleText || displayedText;
  return (
    <div
      ref={containerRef}
      className="font-mono relative z-50 w-full overflow-hidden bg-white text-sm dark:bg-black"
    >
      <div
        className="grid grid-cols-3 items-center px-3 py-2"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center gap-2.5 justify-self-start">
          <div
            className="rounded-full"
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#ff5f56",
              border: "1px solid rgba(0,0,0,0.15)",
            }}
          />
          <div
            className="rounded-full"
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#ffbd2e",
              border: "1px solid rgba(0,0,0,0.15)",
            }}
          />
          <div
            className="rounded-full"
            style={{
              width: 12,
              height: 12,
              backgroundColor: "#27c93f",
              border: "1px solid rgba(0,0,0,0.15)",
            }}
          />
        </div>
        <span className="text-center text-xs text-gray-400">terminal</span>
        <button
          onClick={copyToClipboard}
          className="justify-self-end transition-colors"
          style={{ color: copied ? "#22c55e" : "#9aa0aa" }}
          onMouseEnter={(e) =>
            !copied && (e.currentTarget.style.color = "#111")
          }
          onMouseLeave={(e) =>
            !copied && (e.currentTarget.style.color = "#9aa0aa")
          }
          aria-label="Copy commands"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="min-h-[300px] p-4">
        <div className="space-y-1">
          {terminalLines.slice(0, currentLineIndex).map((line, index) => {
            const cleanedText =
              line.type === "success"
                ? line.text.replace(/^\[✓\]\s*/, "")
                : line.text;
            return (
              <div key={index} className="flex items-start">
                {line.type === "command" && (
                  <span
                    className="mr-2 select-none"
                    style={{ color: "#22c55e" }}
                  >
                    ❯
                  </span>
                )}
                {line.type === "output" && (
                  <span
                    className="mr-2 select-none"
                    style={{ color: "#9ca3af" }}
                  >
                    │
                  </span>
                )}
                {line.type === "success" && (
                  <span
                    className="mr-2 select-none"
                    style={{ color: "#22c55e" }}
                  >
                    [✓]
                  </span>
                )}
                <span
                  style={{
                    color:
                      line.type === "command"
                        ? "#111"
                        : line.type === "success"
                          ? "#22c55e"
                          : "#8b919e",
                  }}
                >
                  {cleanedText}
                </span>
              </div>
            );
          })}

          {currentLineIndex < terminalLines.length && (
            <div className="flex items-start">
              {currentLine.type === "command" && (
                <span className="mr-2 select-none" style={{ color: "#22c55e" }}>
                  ❯
                </span>
              )}
              {currentLine.type === "output" && (
                <span className="mr-2 select-none" style={{ color: "#9ca3af" }}>
                  │
                </span>
              )}
              {currentLine.type === "success" && (
                <span className="mr-2 select-none" style={{ color: "#22c55e" }}>
                  [✓]
                </span>
              )}
              <span
                style={{
                  color:
                    currentLine.type === "command"
                      ? "#111"
                      : currentLine.type === "success"
                        ? "#22c55e"
                        : "#8b919e",
                }}
              >
                {(scrambleText || displayedText).replace(/^\[✓\]\s*/, "")}
                {isTyping && !scrambleText && (
                  <span
                    className="ml-1 inline-block h-4 w-2 animate-pulse"
                    style={{ backgroundColor: "#111" }}
                  ></span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
