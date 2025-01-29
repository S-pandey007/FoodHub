import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
const CategorieDetail = ({ route }) => {
  const categories = route.params;
  const categoriesName = categories.CategoryName;
  // console.log(categoriesName);

  // console.log(categories);
  const [meals, setMeals] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const Data = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoriesName}`
        );
        const JSONData = Data.data.meals;
        setMeals(JSONData);
      } catch (error) {
        console.log(`Error to fetch ${categories} data : `, error);
      }
    };

    fetchCategoryData();
  }, []);
  // console.log(meals);

  const sendMeals_Data_To_DetailScreen = async(idMeal)=>{
    console.log("food id : " ,idMeal);
    try {
      const Data = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      const JSONData = Data.data.meals[0];
      navigation.navigate("Detail", JSONData);
      
    } catch (error) {
      console.log(`Error to fetch data ${idMeal} data : `,error);
    }
    
  }

  

  return (
    <>
      <View style={styles.headerContainer}>
        <AntDesign
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
          name="arrowleft"
          size={24}
          color="black"
        />
        <Text style={styles.headText}>Food Categorie</Text>
      </View>
      <View style={{ paddingBottom: 20 }}>
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cardList}
          numColumns={2}
          renderItem={({ item }) => (
            <Animatable.View
              animation="fadeInLeft"
              duration={1200}
              style={styles.cardWrapper}
            >
              {/* first card  */}
              <Pressable
                // onPress={() => navigation.navigate("Detail",{mealID:item.idMeal})}
                onPress={()=>sendMeals_Data_To_DetailScreen(item.idMeal)}
                style={styles.card}
              >
                <Animatable.View animation="fadeInLeft" duration={1200}>
                  <Image
                    style={styles.cardImage}
                    source={{ uri: item.strMealThumb }}
                  />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.strMeal}</Text>
                    <Text style={styles.cardSubtitle}>Categorie</Text>
                    {/* <View style={styles.cardFooter}> */}
                      {/* <Text style={styles.cardPrice}>Rs.20</Text> */}
                      <Pressable style={styles.heartIcon}>
                        <AntDesign name="hearto" size={20} color="#ff6f61" />
                      </Pressable>
                    {/* </View> */}
                  </View>
                </Animatable.View>
              </Pressable>
            </Animatable.View>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    // justifyContent:'space-between',
    gap: 80,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 20,
    // borderBottomWidth:1
  },
  headText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  backIcon: {
    padding: 10,
  },

  cardList: {
    paddingHorizontal: 1,
    paddingBottom: 20,
  },

  cardWrapper:{
    flex:1,
    margin:10,
    maxWidth:"50%",
  },
  card:{
    backgroundColor:'#fff',
    borderRadius:10,
    overflow:'hidden',
    shadowColor:'#000',
    shadowOpacity:0.1,
    shadowRadius:10,
    elevation:5
  },
  cardImage:{
    width:'100%',
    height:120,
  },
  cardContent:{
    padding:10,
  },
  cardTitle:{
    fontSize:15,
    fontWeight:'bold',
  },
  cardSubtitle:{
    fontSize:13,
    color:'#666',
    marginVertical:5
  },
  heartIcon:{
    padding:5
  }
});

export default CategorieDetail;
