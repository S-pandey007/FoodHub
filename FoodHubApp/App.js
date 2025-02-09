
import Navigation from './Navigation'
import {Provider} from 'react-redux'

import {store} from "./redux/store"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  return (
    <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation/>
    </GestureHandlerRootView>
    </Provider>
  );
}

