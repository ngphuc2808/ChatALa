import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalProvider } from '../src/contexts/globalContext';
import { Provider as ReduxProvider } from 'react-redux';
import Head from 'next/head';
import { wrapper } from '../src/features/redux/store';
import { FC } from 'react';

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <GlobalProvider>
      <ReduxProvider store={store}>
        <Head>
          <title>Chatala</title>
        </Head>
        <Component {...pageProps} />
      </ReduxProvider>
    </GlobalProvider>
  );
};

export default MyApp;
