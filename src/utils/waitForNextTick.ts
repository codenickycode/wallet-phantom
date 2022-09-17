export function waitForNextTick() {
  return new Promise((res) => setTimeout(res, 0));
}
