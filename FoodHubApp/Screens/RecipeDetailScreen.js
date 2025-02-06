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
import * as Animatable from "react-native-animatable";
const RecipeDetailScreen = ({ route }) => {
  const  meal  = route?.params[0];
  console.log("recipe scree : ",meal.idMeal);
  
  const navigation = useNavigation();
  const mealName = meal.strMeal;
  const category = meal.strCategory;

  const process = meal.strInstructions;

  const thumbnail = meal.strMealThumb;
  
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`] ||"";
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(ingredient);
    }
  }
  
  // console.log("Detail meal screen : ",meal);
  // console.log(meal.strIngredient1||"");
  // console.log("mealName : ",mealName);
  





  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
        style={styles.container}
      >
        <Pressable onPress={() => navigation.goBack()} style={styles.header}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>

        {/* Meal Thumbnail and Title */}
        <Animatable.View
          animation="fadeInDown"
          duration={1200}
          style={styles.imageContainer}
        >
          <Image style={styles.thumbnailImage} source={{uri:thumbnail}} />
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.6)"]}
            style={styles.overlay}
          >
            <Animatable.Text
              animation="fadeInDown"
              duration={1200}
              style={styles.mealNameText}
            >
              {mealName}
            </Animatable.Text>
          </LinearGradient>
        </Animatable.View>

        {/* Like/Dislike & Heart Icons */}
        <Animatable.View
          animation="fadeInDown"
          duration={1200}
          style={styles.actionsContainer}
        >
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
          animation="fadeInDown"
          duration={1200}
          style={styles.titleContainer}
        >
          <LinearGradient
            colors={["#ff6f61", "#ff3b30"]}
            style={styles.categoryTag}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </LinearGradient>
        </Animatable.View>

        {/* Cooking Process */}
        <Animatable.View
          animation="fadeInDown"
          duration={1200}
          style={styles.processContainer}
        >
          <Text style={styles.sectionTitle}>Cooking Process</Text>
          {
            process.split(/STEP \d+/) 
            .filter((step) => step.trim()) 
            .map((step, index) => (
              <View style={styles.stepContainer} key={index}>
                
                <Text style={styles.stepNumber}>Step {index + 1}</Text>
                
                <Text style={styles.stepText}>
                  {step.replace(/\.+$/, "") }
                </Text>
              </View>
            ))}
        </Animatable.View>

        {/* Ingredients List */}

        <Animatable.View
          animation="fadeInDown"
          duration={1200}
          style={styles.ingredientsContainer}
        >
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
  stepContainer: {
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
});

export default RecipeDetailScreen;
