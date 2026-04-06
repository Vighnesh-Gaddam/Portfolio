declare module "*.css";
interface Window {
  requestIdleCallback: (cb: IdleRequestCallback) => number;
  cancelIdleCallback: (id: number) => void;
}