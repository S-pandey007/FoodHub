import { View, Text ,FlatList,StyleSheet,Pressable,Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import AntDesign from '@expo/vector-icons/AntDesign';
const CategorieDetail = () => {
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
    
  return (
    <>
    <View style={styles.headerContainer}>
            <AntDesign onPress={()=>navigation.goBack()} style={styles.backIcon} name="arrowleft" size={24} color="black" />
            <Text style={styles.headText}>Food Categorie</Text>
    </View>
    <View style={{paddingBottom:20}}>    
        
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
    </>
  )
}

const styles = StyleSheet.create({
    
    headerContainer:{
        flexDirection:'row',
        // justifyContent:'space-between',
        gap:80,
        alignItems:'center',
        backgroundColor:'#fff',
        marginTop:20
        // borderBottomWidth:1
    },
    headText:{
        fontSize:20,
        fontWeight:'bold',

    },
    backIcon:{
        padding:10
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

export default CategorieDetail