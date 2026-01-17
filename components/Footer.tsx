export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white/50 backdrop-blur-md py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-8 mx-auto max-w-7xl">
        <p className="text-balance text-center text-sm leading-loose text-zinc-600 md:text-left">
          Built by{" "}
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 text-zinc-800 hover:text-black transition-colors"
          >
            Attento Team
          </a>
          . The source code is available on{" "}
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 text-zinc-800 hover:text-black transition-colors"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
