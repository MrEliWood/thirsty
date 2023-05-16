/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.thecocktaildb.com',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'placekitten.com',
				port: '',
				pathname: '/**'
			}
		]
	}
};

module.exports = nextConfig;
