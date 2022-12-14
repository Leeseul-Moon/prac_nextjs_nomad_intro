/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    // 유저가 알 수 있음. 경로가 바깥에 드러남.
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy/:path*", // 외부로도 리다이렉트 가능, * 붙이면 뒤의 경로 모두 유지되면서 리다이렉트
        permanent: false, // status code => false: 307(임시 리다이렉트), true: 308(영구 리다이렉트)
      },
    ];
  },
  async rewrites() {
    // 유저가 알 수 없음. 숨겨져 있음.
    return [
      {
        source: "/api/movies",
        destination: `http://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `http://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
