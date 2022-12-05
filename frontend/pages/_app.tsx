import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import Head from "next/head";
import { wrapper } from "../src/features/redux/store";
import { FC } from "react";
import { SocketProvider } from "../src/contexts/socket";

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <SocketProvider>
      <ReduxProvider store={store}>
        <Head>
          <title>Chatala</title>
        </Head>
        <Component {...pageProps} />
      </ReduxProvider>
    </SocketProvider>
  );
};

export default MyApp;
