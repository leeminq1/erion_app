import React, { useEffect } from 'react';

import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Control_pages from '../pages/Control_pages';
import map_pages from '../pages/map_pages';
import Spec_pages from '../pages/Spec_pages';
import Location_add_pages from '../pages/Location_add_pages';
import { Ionicons } from '@expo/vector-icons';

const Tabs = createBottomTabNavigator();

const TabNavigator = ({ navigation, route }) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({

        //헤더 숨기기
        tabBarShowLabel: false,
        headerShown:false,
        tabBarIcon: ({ focused }) => {

          //현재 이 앱을 구동하고 있는 디바이스가 뭔지 Platform.OS 을 통해 확인 할 수 있음
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';

          if (route.name === 'Spec_pages') {
            iconName += 'document-text-outline';
          } else if (route.name === 'Control_pages') {
            iconName += 'game-controller-outline';
          } else if (route.name === 'map_pages') {
            iconName += 'map-outline';
          } else if (route.name === 'Location_add_pages') {
            iconName += 'add-circle-outline';
          }
          
          return (
            <Ionicons
              name={iconName}
              color={focused ? '#f9ca10' : 'grey'}
              size={35}
            />
          );
        },
      })}
      // tabBarOptions={{
      //   showLabel: false,
      //   style: {
      //     backgroundColor: '#fff',
      //     borderTopColor: '#eee',
      //     height: 60,
      //     fontSize: 10,
      //   },
      //   // activeTintColor: 'tomato',
      //   // inactiveTintColor: 'gray',
      // }}
    >
      <Tabs.Screen name="Spec_pages" component={Spec_pages} />
      <Tabs.Screen name="Control_pages" component={Control_pages} />
      <Tabs.Screen name="map_pages" component={map_pages} />
      <Tabs.Screen name="Location_add_pages" component={Location_add_pages} />
    </Tabs.Navigator>
  );
};


export default TabNavigator;
