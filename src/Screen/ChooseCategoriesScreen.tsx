import React, {memo, useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {data} from '../common/data';

export const ChooseCategoriesScreen = memo(({navigation}: any) => {
  const listCategoryChoosed = [];

  const itemCategory = (category: string, isChoose = false) => {
    return (
      <LinearGradient
        colors={!isChoose ? ['transparent'] : ['#8A32A9', '#8A00FF']}
        style={{
          width: 108,
          height: 71,
          flex: 1,
          flexDirection: 'column',
          margin: 4,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.12)',
          justifyContent: 'center',
        }}>
        <Pressable
          style={{flex: 1, justifyContent: 'center'}}
          onPress={() => {
            isChoose = !isChoose;
            console.log(isChoose);
            isChoose
              ? listCategoryChoosed.push(category)
              : listCategoryChoosed.splice(listCategoryChoosed.length, 1);
          }}>
          <Text style={{alignSelf: 'center', color: 'white', fontSize: 14}}>
            {category}
          </Text>
        </Pressable>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.container}>
      <View></View>
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
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 24,
              marginTop: 55,
            }}>
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
                console.log(listCategoryChoosed);
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Done
              </Text>
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
            data={data.categories}
            renderItem={({item}) => itemCategory(`${item.name}`)}
            keyExtractor={item => item._id}
          />
        </KeyboardAwareScrollView>
      </LinearGradient>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'row'},
  imageBack: {width: 10, height: 17},
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
});
