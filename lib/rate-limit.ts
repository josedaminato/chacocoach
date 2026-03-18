const submissions = new Map<string, number[]>();
const MAX_SUBMISSIONS = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hora

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function cleanupOldEntries(entries: number[]): number[] {
  const now = Date.now();
  return entries.filter((t) => now - t < WINDOW_MS);
}

export function checkRateLimit(request: Request): boolean {
  const ip = getClientIp(request);
  const now = Date.now();
  const entries = submissions.get(ip) || [];
  const recent = cleanupOldEntries(entries);

  if (recent.length >= MAX_SUBMISSIONS) {
    return false;
  }

  recent.push(now);
  submissions.set(ip, recent);
  return true;
}
