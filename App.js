import "react-native-gesture-handler";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./router/Router";
import { client } from "./src/apollo";

function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App;
