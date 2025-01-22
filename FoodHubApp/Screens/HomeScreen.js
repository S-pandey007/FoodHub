import { View, Text, Image, StyleSheet,ScrollView } from 'react-native';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import { FlatList, Pressable, TextInput } from 'react-native-gesture-handler';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
const HomeScreen = () => {
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
    { id: 10, name: "Desserts", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 11, name: "Fast Food", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 12, name: "Soups", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 13, name: "Salads", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 14, name: "Frozen Foods", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 15, name: "Condiments", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 16, name: "Herbs and Spices", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 17, name: "Pasta", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 18, name: "Cereals", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 19, name: "Nuts and Seeds", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
    { id: 20, name: "Sauces", image: "https://lh3.googleusercontent.com/a/AEdFTp7_F3RiM9QFW0h1Lrflcjd-Dpj6HaTFhbZdSrrH=s96-c" },
  ];
  const navigation = useNavigation()
  return (
    <>
      <View 
      
      style={styles.container}>
      {/* Header */}
      <Animatable.View 
      animation="fadeInDown" direction="alternate" duration={1200}
      style={styles.headerView}>
        <View>
          <Text style={styles.greetingText}>Hello, Shubham</Text>
          <Text style={styles.subGreetingText}>What do you want today?</Text>
        </View>
        <Image
          style={styles.profileImage}
          source={{ uri: "https://yt3.ggpht.com/yti/ANjgQV9v56tO5WccYmiXtKsAVQxg7KhnxfANPiyr56F1uDPSv68=s88-c-k-c0x00ffffff-no-rj" }}
        />
      </Animatable.View>

      {/* Search Bar */}
      <Animatable.View 
      animation="fadeInDown" direction="alternate" duration={1200}
      style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#999" />
          <TextInput style={styles.searchInput} placeholder="Search for recipes..." />
        </View>
        <Pressable style={styles.filterButton}>
          <Feather name="filter" size={20} color="#fff" />
        </Pressable>
      </Animatable.View>

      {/* Categories */}
      <View style={{backgroundColor:'',borderRadius:12}}>

      <FlatList
        data={foodCategories}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <Animatable.View
          animation="fadeInRight" duration={1200}
          style={styles.categoryContainer}>
            <Image style={styles.categoryImage} source={{uri:item.image}}/>
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.6)']}
              style={styles.overlay}
            >
              <Text style={styles.categoryText}>{item.name}</Text>
            </LinearGradient>
          </Animatable.View>
        )}
      />
      </View>
      
      {/* Food Cards */}
      <View style={{marginTop: 20}}>       
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
    paddingHorizontal: 10,
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
