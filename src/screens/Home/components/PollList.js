import { View, FlatList } from "react-native";
import PollCard from "./PollCard";
import { useNavigation } from "@react-navigation/native";

const PollList = ({ polls }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={polls}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PollCard poll={item} navigation={navigation} />
      )}
    />
  );
};

export default PollList;
