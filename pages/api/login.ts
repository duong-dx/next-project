import type {
  NextApiRequest,
  NextApiResponse
} from "next";
import httpProxy, {ProxyResCallback} from 'http-proxy'
import Cookies from "cookies";

export const config = {
  api: {
    bodyParser: false
  }
}

export interface Data {
  message: string
}

const proxy = httpProxy.createProxyServer();

export default function handle(req: NextApiRequest, res: NextApiResponse<Data>) {
  return new Promise((resolve) => {
    console.log('login request')
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'method not supported' })
    }

    // don't send cookie to API server
    req.headers.cookie = '';

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = ''
      proxyRes.on('data', (chunk) => {
        body += chunk;
      })

      proxyRes.on('end', () => {
        try {
          const { token } = JSON.parse(body)
          console.log(token, 'my token');

          // convert and add token to cookies
          const cookies = new Cookies(req, res, { secure: process.env.NODE_ENV !== 'development'});
          cookies.set('access_token', token, {
            httpOnly: true,
            sameSite: 'lax',
            // expires:
          })

          ;(res as NextApiResponse).status(200).json({message: 'login success'})
        } catch (error) {
          ;(res as NextApiResponse).status(500).json({message: 'server something went wrong'})
        }
      })
    }
    proxy.once('proxyRes', handleLoginResponse)

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true, // not return data to Client
    })
  })
}