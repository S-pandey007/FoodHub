import React, { useState, useEffect } from "react";
import { View, Text, Pressable, FlatList, Image, ActivityIndicator } from "react-native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import AntDesign from "@expo/vector-icons/AntDesign";
const FilterScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState("category");
  const [selectedValue, setSelectedValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        const categoryRes = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
        const areaRes = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        const ingredientRes = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?i=list");

        setCategories(categoryRes.data.meals.map(item => ({ label: item.strCategory, value: item.strCategory })));
        setAreas(areaRes.data.meals.map(item => ({ label: item.strArea, value: item.strArea })));
        setIngredients(ingredientRes.data.meals.map(item => ({ label: item.strIngredient, value: item.strIngredient })));
      } catch (err) {
        console.error("Error fetching filter options:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFilterOptions();
  }, []);

  const fetchMeals = async () => {
    if (!selectedValue) return;

    let url = "";
    if (selectedFilter === "category") {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedValue}`;
    } else if (selectedFilter === "area") {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedValue}`;
    } else if (selectedFilter === "ingredient") {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedValue}`;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(url);
      setMeals(res.data.meals || []);
    } catch (err) {
      setError("Failed to fetch meals. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.filterContainer}>
        <View style={styles.headerContainer}>
        <AntDesign
          onPress={() => navigation.navigate("Home")}
          name="arrowleft"
          size={24}
          color="#973838"
        />
        <Text style={styles.headerText}>Filter </Text>
      </View>
      {loading && <ActivityIndicator size="large" color="blue" style={{ marginBottom: 10 }} />}

      <Picker selectedValue={selectedFilter} onValueChange={(itemValue) => setSelectedFilter(itemValue)}>
        <Picker.Item label="Category" value="category" />
        <Picker.Item label="Area" value="area" />
        <Picker.Item label="Ingredient" value="ingredient" />
      </Picker>

      <Picker selectedValue={selectedValue} onValueChange={(itemValue) => setSelectedValue(itemValue)}>
        {(selectedFilter === "category" ? categories : selectedFilter === "area" ? areas : ingredients).map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

      <Pressable
        style={[styles.searchButton, { opacity: selectedValue ? 1 : 0.5 }]}
        onPress={fetchMeals}
        disabled={!selectedValue}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </Pressable>

      {error && <Text style={{ color: "red", textAlign: "center", marginTop: 10 }}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
      ) : meals.length > 0 ? (
        <FlatList
          data={meals}
          style={{marginBottom:70}}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            
              <Pressable onPress={() => navigation.navigate("SearchDetail", { mealID: item.idMeal })} style={styles.mealCard}>
              <Image style={styles.mealImage} source={{ uri: item.strMealThumb }} />
              <View style={styles.mealDetails}>
                <Text style={styles.mealName}>{item.strMeal}</Text>
              </View>
            </Pressable>
          
          )}
        />
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
          <Feather name="search" size={34} color="black" />
          <Text>No meals found</Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  filterContainer: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop:15
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
  searchButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#973838",
    borderRadius: 5,
    alignItems: "center",
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  mealCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    
  },
  mealImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  mealDetails: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default FilterScreen;
