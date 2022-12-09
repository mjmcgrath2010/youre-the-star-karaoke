import type { AppProps } from "next/app";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { store } from "../store";
import { Provider } from "react-redux";

import createEmotionCache from "../lib/emotion/cache";
import lightTheme from "../styles/theme/light";
import useIdentity from "../hooks/useIdentity";

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache?: typeof clientSideEmotionCache }) {
  const userId = useIdentity();
  console.log(userId);
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
