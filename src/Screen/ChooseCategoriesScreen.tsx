import React, {memo, useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {CategoryState, getCategoryList} from '../store/categories';
import {UserState} from '../store/signup';

export const ChooseCategoriesScreen = memo(({navigation}: any) => {
  const dispatch = useDispatch();
  const categoryStore = useSelector(
    (state: {categories: CategoryState}) => state.categories,
  );
  const {categoryItem}: any = categoryStore;
  const userStore = useSelector((state: {user: UserState}) => state.user);
  const {userItem}: any = userStore;
  const [itemActive, setItemActive] = useState([]);

  useEffect(() => {
    dispatch(getCategoryList(userItem.token));
  }, []);

  const onPressItem = (id: string) => {
    setItemActive(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      } else {
        return prev.filter((e: string) => {
          return e !== id;
        });
      }
    });
  };

  const itemCategory = (name: string, id: string) => {
    const active = itemActive.includes(id);
    return (
      <LinearGradient
        colors={
          !active ? ['transparent', 'transparent'] : ['#8A32A9', '#8A00FF']
        }
        style={styles.itemCategory}>
        <Pressable
          style={{flex: 1, justifyContent: 'center'}}
          onPress={() => onPressItem(id)}>
          <Text style={styles.textCategory}>{name}</Text>
        </Pressable>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../asset/bg_category.png')}
        resizeMode="stretch"
        style={styles.imageBackground}
      />
      <LinearGradient
        colors={['transparent', 'black', 'black', 'black']}
        style={styles.linearGradient}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <View style={styles.viewHeader}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={require('../asset/ic_arrow.png')}
                resizeMode="center"
                style={styles.imageBack}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                console.log(itemActive);
              }}>
              <Text style={styles.done}>Done</Text>
            </Pressable>
          </View>
          <Text style={styles.textWelcome}>
            Wellcome to Nexle Entrance Test
          </Text>
          <Text style={styles.textDescription}>
            Please select categories what you would like to see on your feed.
            You can set this later on Filter.
          </Text>
          <FlatList
            style={{marginHorizontal: 10}}
            numColumns={3}
            data={categoryItem.categories}
            renderItem={({item}) => itemCategory(item.name, item._id)}
            keyExtractor={item => item._id}
          />
        </KeyboardAwareScrollView>
      </LinearGradient>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  imageBack: {
    width: 10,
    height: 17,
  },
  imageBackground: {
    width: '100%',
    height: '70%',
  },
  textWelcome: {
    marginTop: '30%',
    marginStart: 24,
    color: 'white',
    fontSize: 22,
  },
  textDescription: {
    marginTop: 11,
    marginStart: 24,
    marginEnd: 64,
    color: 'white',
    fontSize: 14,
    marginBottom: 30,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  itemCategory: {
    width: 108,
    height: 71,
    flex: 1,
    flexDirection: 'column',
    margin: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
  },
  textCategory: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 14,
  },
  viewHeader: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginTop: 30,
  },
  scrollView: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  done: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
