import React from "react";
import { useColorScheme, View, Text, StyleProp, } from "react-native";
import {Colors} from "react-native/Libraries/NewAppScreen";

const Section: React.FC<{
    title: string;
    children: any;
  }> = ({children, title}) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
      <View style={$sectionContainer}>
        <Text
          style={[
            $sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {title}
        </Text>
        {children}
      </View>
    );
  };

  const $sectionContainer: StyleProp<any> = {
    marginTop: 32,
    paddingHorizontal: 24,
  }
  const $sectionTitle: StyleProp<any> = {
    fontSize: 24,
    fontWeight: '600',
  }
  export default Section;