import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
const RecipeDetailScreen = () => {
  const navigation = useNavigation();
  const mealName = "Spaghetti Bolognese";
  const category = "Italian";
  const area = "Italy";
  const process =
    "Fry the finely chopped onions and minced meat in oil. Add the salt and pepper. Grease a round baking tray and put a layer of pastry in it. Cover with a thin layer of filling and cover this with another layer of filo pastry which must be well coated in oil. Put another layer of filling and cover with pastry. When you have five or six layers, cover with filo pastry, bake at 200ºC/392ºF for half an hour and cut in quarters and serve.";
  const thumbnail =
    "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg";
  const youtubeLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  const ingredients = [
    "Spaghetti",
    "Ground beef",
    "Tomatoes",
    "Garlic",
    "Olive oil",
    "Onion",
    "Basil",
    "Parmesan cheese",
  ];

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
        style={styles.container}
      >
        <Pressable onPress={()=>navigation.goBack()} style={styles.header}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>

        {/* Meal Thumbnail and Title */}
        <Animatable.View
        animation="fadeInDown" duration={1200}
        style={styles.imageContainer}>
          <Image 
           
          style={styles.thumbnailImage} source={{ uri: thumbnail }} />
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.6)"]}
            style={styles.overlay}
          >
            <Animatable.Text animation="fadeInDown" duration={1200} style={styles.mealNameText}>{mealName}</Animatable.Text>
          </LinearGradient>
        </Animatable.View>

        {/* Like/Dislike & Heart Icons */}
        <Animatable.View
         animation="fadeInDown" duration={1200}
         style={styles.actionsContainer}>
          <View style={styles.actionsLeft}>
            <AntDesign
              name="like2"
              size={24}
              color="black"
              style={styles.iconSpacing}
            />
            <AntDesign
              name="dislike2"
              size={24}
              color="black"
              style={[styles.iconSpacing, { top: 4, paddingLeft: 10 }]}
            />
          </View>
          <View style={styles.actionsRight}>
            <AntDesign name="hearto" size={24} color="black" />
            <AntDesign name="sharealt" size={24} color="black" />
          </View>
        </Animatable.View>

        {/* Title and YouTube Video */}
        <Animatable.View 
        animation="fadeInDown" duration={1200}
        style={styles.titleContainer}>
          <LinearGradient
            colors={["#ff6f61", "#ff3b30"]}
            style={styles.categoryTag}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </LinearGradient>
        </Animatable.View>

        {/* Cooking Process */}
        <Animatable.View
         animation="fadeInDown" duration={1200}
         style={styles.processContainer}>
          <Text style={styles.sectionTitle}>Cooking Process</Text>
          {process.split(". ").map((step, index) => (
            <Text style={styles.processStep} key={index}>
              {index + 1}.{step.trim()}
            </Text>
          ))}
        </Animatable.View>

        {/* Ingredients List */}

        <Animatable.View 
        animation="fadeInDown" duration={1200}
        style={styles.ingredientsContainer}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsList}>
            {ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.ingredientItem}>
                {ingredient}
              </Text>
            ))}
          </View>
        </Animatable.View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  header: {
    marginBottom: 15,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  thumbnailImage: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  mealNameText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryTag: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  categoryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  areaText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#777",
    marginBottom: 15,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  actionsLeft: {
    flexDirection: "row",
  },
  actionsRight: {
    flexDirection: "row",
    paddingLeft: 30,
    gap: 20,
  },
  iconSpacing: {
    marginRight: 10,
  },
  processContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  processStep: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 8, // Add space between steps
    paddingLeft: 5, // Add indentation for clarity
    borderLeftWidth: 3, // Visual guide
    borderLeftColor: "#ff6f61",
  },

  youtubeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff6f61",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 20,
  },
  youtubeText: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  ingredientsList: {
    flexDirection: "row",
    flexWrap: "wrap", // Allows wrapping to the next row
    gap: 10, // Add spacing between items
  },
  ingredientItem: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
    marginBottom: 10,
  },
});

export default RecipeDetailScreen;
