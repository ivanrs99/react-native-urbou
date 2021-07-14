import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, SafeAreaView, Image } from 'react-native';
import * as buses from './archives/buses.json'
import moment from 'moment'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import logo from './assets/logo-urb.png'

moment.locale('es');

const App = () => {
  const [data, setData] = useState([]);

  const update = () => {
    var b = [];
    for (var i = 0; i < buses.default.length; i++) {
      for (var j = 0; j < buses.default[i].salidas.length; j++) {
        var salida = moment(buses.default[i].salidas[j], 'HH:mm')
        if (moment() < salida) {
          if (moment().diff(salida, 'minutes') < 0 && moment().diff(salida, 'minutes') > -70) {
            var item = [{
              bus: buses.default[i].bus,
              salida: buses.default[i].salidas[j]
            }]
            b.push(item[0])
          }
        }
      }
    }
    b.sort(orderTimes)
    setData(b)
  }

  const orderTimes = (a, b) => {
    var salida1 = moment(a.salida, 'HH:mm')
    var salida2 = moment(b.salida, 'HH:mm')
    if (salida1 > salida2) {
      return 1
    } else if (salida1 < salida2) {
      return -1
    }
    return 0
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={{ backgroundColor: '#fff', height:70, alignItems:'center', justifyContent:'center' }}>
          <Image source={logo} style={{ width: "200", height: "50" }}/>
          <Text style={{ color: '#373B44', fontWeight: 'bold', marginTop: 10, fontSize: 30 }}>URBOU</Text>
        </View>

        <View style={{ padding: 20 }}>
          <Button color="black"
            title="Actualizar"
            onPress={update}
          />
          <SafeAreaView>
            <FlatList style={{ alignSelf: 'center' }}
              data={data}
              renderItem={({ item }) =>
                <Text style={styles.item}>
                  <Text style={{ fontSize: 20 }}><Text style={{ fontWeight: 'bold' }}>{item.bus}</Text> - {item.salida}</Text>
                </Text>}
            />
          </SafeAreaView>
          <StatusBar style="auto" />
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#86a8e7',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    textAlign: 'center',
    width: 200
  }
});

export default App;