/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret: "renzo.gorosito.6",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080/api" // development api
        : "http://localhost:8080/api", // production api
  },
};

module.exports = nextConfig;
