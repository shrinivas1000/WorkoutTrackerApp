import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Workouts from '../../components/workouts';


const profile = () => {
  return (
    <View style={styles.container}>
      <Workouts/>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  
});
