import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
const PostDetailScreen = () => {
  const navigation = useNavigation()
  const postData = {
    id: 1,
    user: {
      name: "Shubham Pandey",
      username: "@shubham122",
      profileImage:
        "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
    },
    post: {
      title: "Delicious Homemade Pasta",
      description: "A creamy, cheesy homemade pasta that melts in your mouth.",
      foodImages: [
        "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
        "https://www.themealdb.com/images/category/beef.png",
        "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      ],
      category: "Vegetarian",
      ingredients: ["Pasta", "Cheese", "Garlic", "Tomato Sauce"],
      cookingTime: "30 minutes",
      difficulty: "Easy",
      calories: "450 kcal",
      postDate: "Feb 02, 2025 - 5:30 PM",
      cookingSteps: [
        "Boil pasta in salted water until al dente.",
        "Sauté garlic in olive oil, then add tomato sauce.",
        "Mix in cooked pasta and stir well.",
        "Add grated cheese and let it melt.",
        "Serve hot with fresh basil on top.",
      ],
    },
    interactions: {
      likes: 120,
      comments: 25,
      saves: 40,
      rating: 4.5,
    },
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % postData.post.foodImages.length
    );
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + postData.post.foodImages.length) %
        postData.post.foodImages.length
    );
  };

  return (
    <>
    <View style={styles.header}>
        <AntDesign onPress={()=>navigation.goBack()} name="arrowleft" size={24} color="black" />
        <Text style={styles.headerTitle}>Post</Text>
      </View>
      <ScrollView style={styles.container}>
      <View style={styles.postContainer}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: postData.user.profileImage }}
              style={styles.userImage}
            />
            <View>
              <Text style={styles.username}>{postData.user.name}</Text>
              <Text style={styles.userHandle}>{postData.user.username}</Text>
            </View>
          </View>
          <View style={styles.postActions}>
            <Pressable style={styles.subscribeButton}>
              <Text style={styles.subscribeText}>Subscribe</Text>
            </Pressable>
            <Entypo name="dots-three-horizontal" size={20} color="black" />
          </View>
        </View>

        {/* Post Content */}
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{postData.post.title}</Text>
          <Text style={styles.postTime}>{postData.post.postDate}</Text>
          <Text style={styles.postDescription}>{postData.post.description}</Text>

          {/* Image Slider */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: postData.post.foodImages[currentIndex] }}
              style={styles.postImage}
            />
            <View style={styles.buttonContainer}>
              <AntDesign
                name="leftcircleo"
                onPress={prevImage}
                size={30}
                color="gray"
              />
              <AntDesign
                name="rightcircleo"
                onPress={nextImage}
                size={30}
                color="gray"
              />
            </View>
          </View>

          {/* Category and Difficulty */}
          <View style={styles.categoryRow}>
            <Text style={styles.category}>{postData.post.category}</Text>
            <Text style={styles.difficulty}>{postData.post.difficulty}</Text>
          </View>

          {/* Ingredients */}
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsList}>
            {postData.post.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientContainer}>
                <Text  style={styles.ingredientItem}>
                {ingredient}
              </Text>
              </View>
            ))}
          </View>

          {/* Cooking Steps */}
          <Text style={styles.sectionTitle}>Cooking Steps</Text>
          {postData.post.cookingSteps.map((step, index) => (
            <Text key={index} style={styles.cookingStep}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>

        {/* Interactions */}
        <View style={styles.actionsContainer}>
          <View style={styles.actionButton}>
            <FontAwesome name="comment-o" size={20} color="black" />
            <Text style={styles.actionText}>{postData.interactions.comments}</Text>
          </View>
          <View style={styles.actionButton}>
            <AntDesign name="hearto" size={20} color="black" />
            <Text style={styles.actionText}>{postData.interactions.likes}</Text>
          </View>
          <View style={styles.actionButton}>
            <AntDesign name="staro" size={24} color="black" />
            <Text style={styles.actionText}>{postData.interactions.rating}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor:'#fff',
    padding:10,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userHandle: {
    fontSize: 14,
    color: "gray",
  },
  postActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  subscribeButton: {
    backgroundColor: "#ac6060",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  subscribeText: {
    color: "white",
    fontSize: 14,
  },
  postContent: {
    marginTop: 10,
  },
  postTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  postTime: {
    fontSize: 12,
    color: "gray",
    marginVertical: 5,
  },
  postDescription: {
    fontSize: 16,
    color: "#555",
    marginVertical: 10,
  },
  imageContainer: {
    position: "relative",
    marginVertical: 20,
    borderRadius: 10,
  },
  postImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    resizeMode: "cover",
  },
  buttonContainer: {
    position: "absolute",
    top: "50%",
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  category: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    padding:6,
    borderRadius:8,
    backgroundColor:'#ac6060'
  },
  difficulty: {
    fontSize: 14,
    color: "white",
    padding:6,
    borderRadius:8,
    backgroundColor:'#ac6060'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  ingredientsList: {
    marginBottom: 10,
    flexDirection:'row',
    gap:20,
    
  },
  ingredientContainer:{
    padding:6,
    borderRadius:8,
    backgroundColor:'gray'
  },
  ingredientItem: {
    fontSize: 16,
    color: "#fff",
    fontWeight:'bold',
    marginBottom: 5,
  },
  cookingStep: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  actionText: {
    fontSize: 14,
    color: "#555",
  },
});

export default PostDetailScreen;
