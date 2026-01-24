import { Atom } from "react-loading-indicators";

export function GlobalLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        <Atom color="#2b7fff" size="medium" text="Growcode" textColor="#2b7fff" />
      </div>
    </div>
  );
}
