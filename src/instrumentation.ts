export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  try {
    // Pre-warm Google Sheets auth client + fetch both sheets into memory cache
    // so the first user request hits cache instead of waiting ~20s for cold API call
    const { EventController } = await import(
      "@/controllers/events/events.controller"
    );
    const controller = new EventController();
    await controller.getAllEvents();
    console.log("[instrumentation] Events cache pre-warmed ✓");
  } catch (err) {
    console.warn("[instrumentation] Pre-warm failed (will fetch on demand):", err);
  }
}
