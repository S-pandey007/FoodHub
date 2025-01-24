import { View, Text,Pressable,StyleSheet ,FlatList,Image,Modal} from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Entypo from "@expo/vector-icons/Entypo";

import { useState } from 'react';
const SearchScree = () => {
  const foodCategories = [
    { id: 1, name: "Fruits", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 2, name: "Vegetables", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 3, name: "Dairy", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 4, name: "Meat", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 5, name: "Seafood", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 6, name: "Grains", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 7, name: "Snacks", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 8, name: "Beverages", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 9, name: "Bakery", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 10, name: "Desserts", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" }
  ];
    const navigation = useNavigation()
    const [MenuModal , setMenuModal] = useState(false)  
  
  return (
    <View style={{flex:1}}>
      <View style={styles.searchHead} >
        <View style={{flexDirection:'row',alignContent:'center',gap:20}}>
      <AntDesign onPress={()=>navigation.goBack()} style={styles.backIcon} name="arrowleft" size={24} color="black" />
        <Text style={styles.searchTitle}>Search Result</Text>
        </View>
        <Pressable onPress={()=> setMenuModal(true)} style={styles.filterButton}>
          <Feather name="filter" size={20} color="#fff" />
        </Pressable>
      </View>

      <View style={{paddingBottom:30}}>    
        
      <FlatList
        data={foodCategories}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardList}
        renderItem={({ item }) => (
          <Animatable.View 
          animation="fadeInLeft" duration={1200}
          style={styles.rowContainer}>
            {/* first card  */}
            <Pressable onPress={()=>navigation.navigate("Detail")} style={styles.card}>
            <Animatable.View 
            animation="fadeInLeft" duration={1200}
            >
              <Image style={styles.cardImage} source={{uri:item.image}}/>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>Categorie</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardPrice}>Rs.20</Text>
                  <Pressable style={styles.heartIcon}>
                  <AntDesign name="hearto" size={20} color="#ff6f61" />
                  </Pressable>
                </View>
              </View>
            </Animatable.View>
            </Pressable>
            

            {/* second card  */}
            <Pressable onPress={()=>navigation.navigate("Detail")} style={styles.card}>
            <Animatable.View
            animation="fadeInLeft" duration={1400}
            style={styles.card}>
              <Image style={styles.cardImage} source={{uri:item.image}}/>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>Categorie</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardPrice}>Rs.20</Text>
                  <Pressable style={styles.heartIcon}>
                  <AntDesign name="hearto" size={20} color="#ff6f61" />
                  </Pressable>
                </View>
              </View>
            </Animatable.View>
            </Pressable>
          </Animatable.View>
        )}
      />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={MenuModal}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
        
          <View style={styles.modalContent}>
          <Pressable onPress={()=>setMenuModal(false)} style={{flexDirection:'row-reverse'}}>
            <Entypo name="cross" size={24} color="black" />
          </Pressable>
            <Pressable style={{flexDirection:'row',gap:10}}>
            {/* <AntDesign name="edit" size={20} color="black" /> */}
              <Text style={{fontSize:16}}>Edit profile</Text></Pressable>
            <Pressable style={{flexDirection:'row',gap:10}}>
            {/* <MaterialIcons name="password" size={20} color="black" /> */}
              <Text style={{fontSize:16}}>change password</Text></Pressable>
            <Pressable style={{flexDirection:'row',gap:10}}>
            {/* <MaterialIcons name="logout" size={20} color="black" /> */}
              <Text style={{fontSize:16}}>logout</Text></Pressable>
            <Pressable style={{flexDirection:'row',gap:10}}>
            {/* <AntDesign name="deleteuser" size={20} color="black" /> */}
              <Text style={{fontSize:16}}>delete account</Text></Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles  = StyleSheet.create({

  searchHead:{
    flexDirection:'row',
    // gap:30,
    justifyContent:"space-between",
    alignItems:"center",
    // paddingHorizontal:15,
    paddingVertical:15,
    top:10

  },

  searchTitle:{
    fontSize:18,
    fontWeight:"bold",

  },
  filterButton: {
    backgroundColor: "#973838",
    padding: 10,
    borderRadius: 8,
    margin:6,
    justifyContent: "center",
    alignItems: "center",
  },
  
  modalContainer: {
    flex: 1,
    left:80,
    top:0,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)",
    gap:10
  },
  modalContent: {
    width: 'auto',
    height: 'auto',
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation:4,
    gap:20
  },
  cardList: {
    paddingHorizontal: 1,
    paddingBottom: 20,
  },

  rowContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap:10
  },  

  card:{
    flex:1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginHorizontal:3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  cardContent:{
    padding:10,
  },

  cardImage:{
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  cardTitle:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  cardSubtitle: {
    fontSize: 12,
    color: '#888',
    marginVertical: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6f61',
  },
  
}) 
export default SearchScree