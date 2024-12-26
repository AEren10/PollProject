import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../src/screens/Home/HomeScreen";
import CreatePollScreen from "../src/screens/CreatePoll/CreatePollScreen";
import PollDetailScreen from "../src/screens/PollDetail/PollDetailScreen";
import Icon from "../src/components/Icon";

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "Anketler",
          headerRight: () => (
            <Icon
              name="add-outline"
              size={38}
              color="#000"
              onPress={() => navigation.navigate("CreatePoll")}
              style={{ marginRight: 5 }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CreatePoll"
        component={CreatePollScreen}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen name="PollDetail" component={PollDetailScreen} />
    </Stack.Navigator>
  );
};

export default Router;
