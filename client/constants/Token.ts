let TOKEN;

const ISSERVER = typeof window === "undefined";

if (!ISSERVER) {
  TOKEN = localStorage.getItem("jwt");
}

export { TOKEN };
