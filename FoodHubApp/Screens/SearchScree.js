import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  FlatList,
  Modal,
} from "react-native";
import React, { useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import axios from "axios";
// import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
const SearchScreen = () => {
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const navigation = useNavigation();
  // useEffect(() => {
  //   const fetchFilterOptions = async () => {
  //     const categoruRes = await axios.get(
  //       "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
  //     );

  //     const areaRes = await axios.get(
  //       "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  //     );

  //     const ingredientRes = await axios.get(
  //       "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  //     );

  //     setCategories(categoruRes.data.meals);
  //     setAreas(areaRes.data.meals);
  //     setIngredients(ingredientRes.data.meals);
  //   };

  //   fetchFilterOptions();
  // }, []);
  // console.log("category" , categories);

  // fetch meals based on selexted filter
  // const fetchMeals = async () => {
  //   let url = "";
  //   if (selectedFilter === "category") {
  //     url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedValue}`;
  //   } else if (selectedFilter === "area") {
  //     url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedValue}`;
  //   } else if (selectedFilter === "ingredient") {
  //     url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedValue}`;
  //   }

  //   const res = await axios.get(url);
  //   setMeals(res.data.meals);
  //   // console.log("meals ",meals);
  // };

  const [search, setSearch] = useState();

  const [searchData, setSearchData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const fetchSearch = async (search) => {
    try {
      const searchIteam =
        search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();
      const searchQuery = searchIteam.replace(/ /g, "%20");
      console.log("search item : ", searchIteam);
      console.log("search final query  : ", searchQuery);
      const Data = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const JSONdata = Data.data.meals;
      console.log("JSONdata :", JSONdata);
      setSearchData(JSONdata);
      setModalVisible(true);
      setSearch("");
    } catch (error) {
      console.error("Error serched info : ", error);
    }
  };

  console.log("search Data : ", searchData);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <AntDesign
          onPress={() => navigation.navigate("Home")}
          name="arrowleft"
          size={24}
          color="#973838"
        />
        <Text style={styles.headerText}>Search</Text>
      </View>

      {/* Search Bar Section */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipe..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <Pressable
          onPress={() => fetchSearch(search)}
          style={styles.searchButton}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
        <Feather 
        onPress={()=>navigation.navigate("FilterScreen")}
        style={{ left:8}} name="filter" size={24} color="#973838" />
      </View>

      {/* filter DropDowna  */}
      {/* <View style={styles.filterContainer}>
        <Picker
          selectedValue={selectedFilter}
          onValueChange={(itemValue) => setSelectedFilter(itemValue)}
        >
          <Picker.Item label="Category" value="category" />
          <Picker.Item label="Area" value="area" />
          <Picker.Item label="Ingredient" value="ingredient" />
        </Picker>

        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          {selectedFilter === "category" &&
            categories.map((item) => (
              <Picker.Item
                key={item.strCategory}
                label={item.strCategory}
                value={item.strCategory}
              />
            ))}
          {selectedFilter === "area" &&
            areas.map((item) => (
              <Picker.Item
                key={item.strArea}
                label={item.strArea}
                value={item.strArea}
              />
            ))}
          {selectedFilter === "ingredient" &&
            ingredients.map((item) => (
              <Picker.Item
                key={item.strIngredient}
                label={item.strIngredient}
                value={item.strIngredient}
              />
            ))}
        </Picker> */}

        {/* Search Button */}
        {/* <Pressable style={styles.searchButton} onPress={fetchMeals}>
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View> */}

      {/* {selectedValue ? (
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate("SearchDetail", { mealID: item.idMeal })
              }
              style={styles.mealCard}
            >
              <Image
                style={styles.mealImage}
                source={{ uri: item.strMealThumb }}
              />
              <View style={styles.mealDetails}>
                <Text style={styles.mealName}>{item.strMeal}</Text> */}
                {/* <Text style={styles.mealCategory}>{item.strCategory}</Text> */}
              {/* </View>
            </Pressable>
          )}
        />
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              top: 40,
            }}
          >
            <Feather name="search" size={34} color="black" />
            <Text>Search not found</Text>
          </View>
        </View>
      )} */}
        <View>
              <FlatList
                data={searchData}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("SearchDetail", {
                        mealID: item.idMeal,
                      })
                    }
                    style={styles.modalMealCard}
                  >
                    <Image
                      style={styles.modalMealImage}
                      source={{ uri: item.strMealThumb }}
                    />
                    <View style={styles.modalMealDetails}>
                      <Text style={styles.modalMealName}>{item.strMeal}</Text>
                      {/* <Text style={styles.mealCategory}>{item.strCategory}</Text> */}
                    </View>
                  </Pressable>
                )}
              />
              </View>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOvarlay}>
          
            <View style={styles.modalContainer}>
            <Pressable
                style={styles.closeButton}
                onPress={() => {
                  setSearchData("");
                  setModalVisible(false);
                  setMeals("");
                }}
              >
                <Ionicons name="close" size={35} color="black" />
              </Pressable>
              <View>
              <FlatList
                data={searchData}
                keyExtractor={(item) => item.idMeal}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("SearchDetail", {
                        mealID: item.idMeal,
                      })
                    }
                    style={styles.modalMealCard}
                  >
                    <Image
                      style={styles.modalMealImage}
                      source={{ uri: item.strMealThumb }}
                    />
                    <View style={styles.modalMealDetails}>
                      <Text style={styles.modalMealName}>{item.strMeal}</Text> */}
                      {/* <Text style={styles.mealCategory}>{item.strCategory}</Text> */}
                    {/* </View>
                  </Pressable>
                )}
              />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    top:10,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#973838",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#973838",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  categoriesContainer: {
    marginTop: 10,
  },
  mealCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff", // White background for a clean look
    borderRadius: 12, // Slightly more rounded corners
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
  },
  mealImage: {
    width: 90, // Slightly larger image
    height: 90,
    borderRadius: 45, // Fully rounded image
    marginRight: 12, // Adds spacing between image and text
  },
  mealDetails: {
    flex: 1, // Takes remaining space
  },
  mealName: {
    fontSize: 18, // Bigger text
    fontWeight: "bold",
    color: "#333",
  },

  // modal styling
  modalOvarlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    width: "100%",
    height: "70%",
    backgroundColor: "#f7efef",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    alignItems: "center",
  },
  closeButton: {
    // position: "absolute",
    top: 10,
    justifyContent:'flex-end',
    paddingBottom:10
  },

  modalMealCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  modalMealImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  modalMealDetails: {
    marginLeft: 10,
  },
  modalMealName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SearchScreen;
