import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Pressable,
  ViewBase,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
// import Video from "react-native-video";

import * as ImagePicker from "expo-image-picker";
const CreatePost = () => {
  const navigation = useNavigation();
  const [difficulty, setDifficulty] = useState("Easy");
  const [ingredient, setIngredient] = useState([]);
  const [inputTextIngredient, setInputTextIngredient] = useState();
  const [inputTextSteps, setInputTextSteps] = useState();
  const [image, setImage] = useState([]);


  const [title,setTitle] = useState()
  const  [description , setDescription] = useState()
  const [category,setCategory] = useState()

  const [Postdata,setPostData] = useState({
    title:"",
    description:"",
    image:[],
    category:"",
    difficulty:"",
    ingredient:[],
    steps:[],
  })
  // const [video ,setVideo] = useState([])

  const [steps, setSteps] = useState([]);
  // console.log("ingredient : ",ingredient)

  // send data 
const sendData = ()=>{
  setPostData({...Postdata,
    title:title,
    description:description,
    image:image,
    category:category,
    difficulty:difficulty,
    ingredient:ingredient,
    steps:steps
  })
  console.log("Postdata :", Postdata);
  setCategory("")
  setDescription("")
  setDifficulty("")
  setIngredient("")
  setImage("")
  setTitle("")
  setSteps("")
  
}


  const addIngredients = () => {
    setIngredient([...ingredient, inputTextIngredient]);
    setInputTextIngredient("");
    // console.log(ingredient);
  };

  // const deleteIngredient = (index) => {
  //   // console.log(index);
  //   ingredient.splice(index, 1);
  //   setIngredient([...ingredient]);
  //   // console.log(ingredient);
  // };

  const deleteIngredient = (index) => {
    setIngredient((prev) => prev.filter((_, i) => i !== index));
  };

  const addSteps = () => {
    setSteps([...steps, inputTextSteps]);
    // console.log(steps);

    setInputTextSteps("");
  };

  // const deleteSteps = (index) => {
  //   steps.splice(index, 1);
  //   setSteps([...steps]);
  // };

  const deleteSteps = (index) => {
    console.log(index);
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  // const deleteImgae = (index)=>{
  //     image.splice(index,1);
  //     setImage([...image])
  // }

  const deleteImage = (index) => {
    setImage((prev) => prev.filter((_, i) => i !== index));
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage((prevImages) => [
        ...prevImages,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  // const pickVideo = async () => {

  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Videos,
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setVideo((prevVideos) => [
  //       ...prevVideos,
  //       ...result.assets.map((asset) => asset.uri),
  //     ]);
  //   }
  // };

  useEffect(() => {
    console.log("image uri : ", image);
  }, [image]);

  // useEffect(() => {
  //   console.log("video uri : ", video);
  // }, [video]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <AntDesign
          onPress={() => navigation.goBack()}
          name="arrowleft"
          size={24}
          color="black"
        />
        <Text style={styles.headerTitle}>Create Post</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Title */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Title</Text>
          <TextInput value={title} onChangeText={setTitle} placeholder="Enter title" style={styles.input} />
        </View>

        {/* Description */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="Enter description"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* Add Images */}
        <View style={styles.inputContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Add Images</Text>
            <AntDesign
              onPress={pickImage}
              name="plus"
              size={24}
              color="black"
            />
          </View>
          {/* Image Picker Component can be added here */}
          <ScrollView horizontal style={{ width: "auto", height: "auto" }}>
            {image &&
              image.map((src, index) => (
                <View key={index}>
                  <Image
                    source={{ uri: src }}
                    style={{
                      width: 200,
                      height: 200,
                      marginTop: 10,
                      marginRight: 5,
                    }}
                  />
                  <Pressable
                  onPress={()=>deleteImage(index)}
                    style={{
                      backgroundColor: "#973838",
                      borderRadius: 17,
                      justifyContent: "center",
                      shadowColor: "#973838",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.3,
                      shadowRadius: 4,
                      elevation: 10,
                      width: 35,
                      height: 35,
                      alignItems: "center",
                      bottom:39,
                      left:80
                    }}
                  >
                    <AntDesign
                      onPress={() => {
                        deleteSteps(index);
                      }}
                      style={{ padding: 3 }}
                      name="delete"
                      size={20}
                      color="#fff"
                    />
                  </Pressable>
                </View>
              ))}
          </ScrollView>
        </View>

        {/* Add Video*/}
        {/* <View style={styles.inputContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.label}>Add Videos</Text>
            <AntDesign
              onPress={pickVideo}
              name="plus"
              size={24}
              color="black"
            />
          </View>
          {/* Image Picker Component can be added here */}
        {/* <ScrollView horizontal style={{ width: 'auto', height: 'auto'}} >
            {video && (
              video.map((src,index)=>(
                <Video
                key={index}
                source={{ uri: src }}
                style={{ width: 200, height: 200, marginTop: 10 , marginRight:5}}
                useNativeControls
                resizeMode="contain"
                shouldPlay
              />
              ))
            )}
          </ScrollView> */}
        {/* </View> */}

        {/* Category */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category</Text>
          <TextInput value={category} onChangeText={setCategory} placeholder="Enter category" style={styles.input} />
        </View>

        {/* Difficulty Selection */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Difficulty</Text>
          <View style={styles.difficultyContainer}>
            {["Easy", "Medium", "Hard"].map((level) => (
              <Pressable
                key={level}
                style={[
                  styles.difficultyButton,
                  difficulty === level && styles.selectedDifficulty,
                ]}
                onPress={() => setDifficulty(level)}
              >
                <Text style={styles.difficultyText}>{level}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Ingredients */}
        <View style={styles.inputContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.label}>Ingredients</Text>
            {/* <AntDesign name="plus" size={24} color="black" /> */}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder="Enter ingredient"
              style={[styles.input, { width: "80%" }]}
              multiline
              value={inputTextIngredient}
              onChangeText={setInputTextIngredient}
            />
            <Pressable style={styles.addButton} onPress={addIngredients}>
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          </View>

          {ingredient ? (
            <ScrollView horizontal style={styles.ingredientsList}>
              {ingredient.map((ingredient, index) => (
                <View
                key={index}
                  style={{
                    flexDirection: "row",
                    marginRight: 8,
                    borderRadius: 8,
                    alignItems: "center",
                    backgroundColor: "#f09081",
                  }}
                >
                  <View style={styles.ingredientContainer}>
                    <Text  style={styles.ingredientItem}>
                      {ingredient}
                    </Text>
                  </View>
                  <AntDesign
                    onPress={() => {
                      deleteIngredient(index);
                    }}
                    style={{ padding: 3 }}
                    name="delete"
                    size={20}
                    color="white"
                  />
                </View>
              ))}
            </ScrollView>
          ) : (
            <View></View>
          )}
        </View>

        {/* Steps */}
        <View style={styles.inputContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.label}>Steps</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder="Enter ingredient"
              style={[styles.input, { width: "80%" }]}
              multiline
              value={inputTextSteps}
              onChangeText={setInputTextSteps}
            />
            <Pressable style={styles.addButton} onPress={addSteps}>
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          </View>

          {steps ? (
            <ScrollView style={styles.ingredientsList}>
              {steps.map((steps, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 8,
                    borderRadius: 8,
                    alignItems: "center",
                    backgroundColor: "#f09081",
                    flexShrink: 1,
                  }}
                >
                  <View style={styles.ingredientContainer}>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: "#f09081",
                        padding: 5,
                        borderRadius: 10,
                      }}
                    >
                      Step : {index + 1}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                      }}
                    >
                      <Text
                        key={index}
                        style={styles.ingredientItem}
                        numberOfLines={0}
                      >
                        {steps}
                      </Text>
                    </View>
                    <AntDesign
                      onPress={() => {
                        deleteSteps(index);
                      }}
                      style={{ padding: 3 }}
                      name="delete"
                      size={20}
                      color="white"
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View></View>
          )}
        </View>

        {/* Submit Button */}
        <Pressable onPress={sendData} style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 10, flex: 1, backgroundColor: "#fff", padding: 15 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 10 },
  scrollContainer: { paddingBottom: 20 },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  difficultyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  difficultyButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedDifficulty: { backgroundColor: "#ac6060", borderColor: "#ac6060" },
  difficultyText: { fontSize: 16, color: "black" },
  postButton: {
    backgroundColor: "#ac6060",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  postButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },

  ingredientsList: {
    marginBottom: 10,
    marginTop: 8,
    flexDirection: "row",
    gap: 20,
  },
  ingredientContainer: {
    padding: 6,
    borderRadius: 5,
    backgroundColor: "#ac6060",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ingredientItem: {
    fontSize: 19,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },

  addButton: {
    backgroundColor: "#ac6060",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  ingredientItem: {
    fontSize: 16,
    color: "white",
    marginVertical: 5,
  },
});

export default CreatePost;
