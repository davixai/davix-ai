/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Pagina „Despre” a trecut la persoana I — vechiul URL rămâne valid pentru linkuri și SEO.
  async redirects() {
    return [
      { source: "/despre-noi", destination: "/despre-mine", permanent: true },
    ]
  },
}

export default nextConfig
