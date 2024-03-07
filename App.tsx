import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import '@react-native-firebase/app'; // Add this line before any other @react-native-firebase/* imports
import firestore from '@react-native-firebase/firestore'; // Assuming you have installed @react-native-firebase/firestore

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await firestore().collection('test').get();
      const dataList = snapshot.docs.map(doc => doc.data());
      setData(dataList);
      console.log(data)
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Firestore Data:</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{JSON.stringify(item)}</Text>}
      />
    </View>
  );
};

export default App;
