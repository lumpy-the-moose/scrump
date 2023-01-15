import 'node_modules/modern-normalize/modern-normalize.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../components/App/store';
import { CookiesProvider } from 'react-cookie';
import { GlobalStyles } from '../components/Styled/Global.styled';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </CookiesProvider>
    </Provider>
  );
}
