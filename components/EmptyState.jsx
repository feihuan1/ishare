import { View, Text, Image } from "react-native";

import { images } from "../constants"; 

import CustonButton from './CustomButton'
import { router } from "expo-router";

const EmptyState = ({title, subtitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[270px]"
        resizeMode="contain"
      />
      <Text className="text-xl text-center font-psemibold text-white mb-2">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text> 

      <CustonButton 
        title='Create video' 
        handlePress={() => router.push('/create')} 
        containerStyle='w-full my-5'
      />
    </View>
  );
};

export default EmptyState;
