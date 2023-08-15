/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			// {
			// 	protocol: "https",
			// 	hostname: "flowbite.s3.amazonaws.com",
			// 	port: "",
			// 	pathname: "/blocks/marketing-ui/avatars/**",
			// },
			// {
			// 	protocol: "https",
			// 	hostname: "cdn.bookingcare.vn",
			// 	pathname: "/**",
			// },
			{
				protocol: "https",
				hostname: "*",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
