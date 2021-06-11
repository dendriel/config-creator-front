import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import {AuthProvider, ProtectRoute} from "../contexts/auth";

export default function MyApp({ Component, pageProps }) {
  return <AuthProvider>
    <ProtectRoute>
      <Component {...pageProps} />
    </ProtectRoute>
  </AuthProvider>
}
