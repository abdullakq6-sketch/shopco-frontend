import { useCallback, useEffect, useState } from "react";
import { api, BASE_URL } from "@/api/client";

export function BackendStatus() {
  const [state, setState] = useState("checking"); 

  const [dbWarning, setDbWarning] = useState(null);
  const [retrying, setRetrying] = useState(false);

  const check = useCallback(async () => {
    try {
      const data = await api.health();
      setState(data?.success ? "up" : "down");
      setDbWarning(data?.db === "disconnected" ? "MongoDB connect nahi hai" : null);
    } catch {
      setState("down");
      setDbWarning(null);
    }
  }, []);

  useEffect(() => {
    check();
    const timer = setInterval(check, 5000);
    return () => clearInterval(timer);
  }, [check]);

  if (state === "up" && dbWarning) {
    return (
      <div className="border-b border-[#FFB020] bg-[#FFF8E6]">
        <div className="mx-auto max-w-[1240px] px-4 py-3">
          <p className="text-xs text-[#7A5200]">
            <span className="font-bold">⚠️ MongoDB connect nahi hai</span> — backend/.env me
            apna MONGODB_URL check karein.
            <br />
            <span className="opacity-80">{dbWarning}</span>
          </p>
        </div>
      </div>
    );
  }

  if (state !== "down") return null;

  return (
    <div className="border-b-2 border-[#FF3333] bg-[#FFF4F4]">
      <div className="mx-auto max-w-[1240px] px-4 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold text-[#B00000]">
              <span>⚠️</span> Backend nahi chal raha
            </p>
            <p className="mt-1 text-xs text-black/70">
              Frontend <code className="rounded bg-black/5 px-1">{BASE_URL}</code> par API
              dhoond raha hai, lekin backend server band hai. Doosre terminal me chalayein:
            </p>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-black px-3 py-2 text-[11px] leading-relaxed text-[#9CFF9C]">
{`cd shopco-backend
npm install
npm run dev`}
            </pre>
          </div>

          <button
            type="button"
            onClick={async () => {
              setRetrying(true);
              await check();
              setTimeout(() => setRetrying(false), 400);
            }}
            className="h-10 shrink-0 rounded-full bg-black px-6 text-xs font-medium text-white transition hover:bg-black/85"
          >
            {retrying ? "Checking…" : "Retry"}
          </button>
        </div>
      </div>
    </div>
  );
}
