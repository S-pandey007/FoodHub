import { View, Text, Image, StyleSheet,ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { FlatList, Pressable, TextInput } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
const HomeScreen = () => {
  

  const [meals ,setMeals] = useState()
  const [loading , setLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(()=>{
   const FetchData = async()=>{
      const Data = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s')
      const JSONdata = Data.data 
      setMeals(JSONdata || [])
      
    }
    FetchData()
  },[])
  console.log(meals);
  
  return (
    <>
      <View 
      
      style={styles.container}
      
      >
      {/* Header */}
      <Animatable.View 
      animation="fadeInDown" direction="alternate" duration={1200}
      style={styles.headerView}>
        <View>
          <Text style={styles.greetingText}>Hello, Shubham</Text>
          <Text style={styles.subGreetingText}>What do you want today?</Text>
        </View>
        <Pressable onPress={()=>navigation.navigate("Profile")}>

        <Image
          style={styles.profileImage}
          source={{ uri: "https://yt3.ggpht.com/yti/ANjgQV9v56tO5WccYmiXtKsAVQxg7KhnxfANPiyr56F1uDPSv68=s88-c-k-c0x00ffffff-no-rj" }}
        />
        </Pressable>
      </Animatable.View>

      {/* Search Bar */}
      <Animatable.View 
      animation="fadeInDown" direction="alternate" duration={1200}
      style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#999" />
          <TextInput style={styles.searchInput} placeholder="Search for recipes..." />
        </View>
        <Pressable onPress={()=>navigation.navigate("Search")} style={{backgroundColor:'#973838',padding:10,borderRadius:10,marginRight:5}}>
          <Text style={{fontSize:18,fontWeight:'600',color:'#fff'}}>search</Text>
        </Pressable>
        {/* <Pressable style={styles.filterButton}>
          <Feather name="filter" size={20} color="#fff" />
        </Pressable> */}
      </Animatable.View>

      {/* Categories */}
      <View style={{backgroundColor:'',borderRadius:12}}>

      <FlatList
        // data={foodCategories}
        data={meals}
        keyExtractor={(item) => item.idMeal.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <Pressable onPress={()=> navigation.navigate("CategoryDetail")}>
            <Animatable.View
          animation="fadeInRight" duration={1200}
          style={styles.categoryContainer}>
            <Image style={styles.categoryImage} source={{uri:item.strMealThumb}}/>
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.6)']}
              style={styles.overlay}
            >
              <Text style={styles.categoryText}>{item.strCategory}</Text>
            </LinearGradient>
          </Animatable.View>
          </Pressable>
        )}
      />
      </View>
      
      {/* Food Cards */}
      <View style={{marginTop: 20,paddingBottom:250}}>       
      <FlatList
        // data={foodCategories}
        data={meals}
        keyExtractor={(item) => item.idMeal.toString()}
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
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subGreetingText: {
    fontSize: 16,
    color: '#666',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 8,
    flex: 1,
    marginRight: 10,
    height: 50,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#973838',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  categoryContainer: {
    width: 70,
    height: 70,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    top: 10,
  },

  // card styles 
  
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
  
});

export default HomeScreen;
