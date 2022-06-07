import AsyncStorage from '@react-native-async-storage/async-storage';

enum STORRAGE_KEY {
  TOKEN = 'Token',
}

export const setOAuthToken = async (value: string) => {
  try {
    await AsyncStorage.setItem(STORRAGE_KEY.TOKEN, JSON.stringify(value));
  } catch (e) {}
};

export const getOAuthToken = async () => {
  try {
    const data: any = await AsyncStorage.getItem(STORRAGE_KEY.TOKEN);
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
};
