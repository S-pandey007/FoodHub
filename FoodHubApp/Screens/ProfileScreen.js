import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Modal,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  RefreshControl,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import * as ImagePicker from "expo-image-picker";
import { ToastAndroid } from "react-native";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import axios from "axios";
import styles from "../styles/ProfileStyle";

const ProfileScreen = () => {
  const navigation = useNavigation();

  // State for user data and loading
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // State for edit profile modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [age, setAge] = useState("");

  // State for menu and password change modal
  const [menuModal, setMenuModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for liked/saved content
  const [userInteractionData, setUserInteractionData] = useState({
    like: [],
    dislike: [],
    saved: [],
  });
  const [likeImagesLink, setLikeImagesLink] = useState([]);
  const [savedImageLink, setSavedImageLink] = useState([]);
  const [selectedOption, setSelectedOption] = useState("likes");
  const [refreshing, setRefreshing] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) throw new Error("No authenticated user");
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setName(data.name || "");
          setBio(data.bio || "");
          setCity(data.city || "");
          setAge(data.age || "");
          setProfileImage(data.profileImageURL || "");
        } else {
          console.log("No user data found");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        Alert.alert("Error", "Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Fetch user interactions in real-time
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userInteractionRef = doc(db, "users", user.uid, "interactions", "current");
    const unsubscribe = onSnapshot(userInteractionRef, (docSnap) => {
      if (docSnap.exists()) {
        const { liked = [], dislike = [], saved = [] } = docSnap.data();
        setUserInteractionData({ like: liked, dislike, saved });
      }
    }, (error) => {
      console.error("Error fetching interactions: ", error);
    });

    return () => unsubscribe();
  }, []);

  // Fetch liked and saved images when interactions change
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const [likedImages, savedImages] = await Promise.all([
          Promise.all(userInteractionData.like.map(fetchMeals)),
          Promise.all(userInteractionData.saved.map(fetchMeals)),
        ]);
        setLikeImagesLink(likedImages.filter(Boolean));
        setSavedImageLink(savedImages.filter(Boolean));
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };
    fetchImages();
  }, [userInteractionData]);

  // Cloudinary configuration
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/do9zifunn/upload";
  const UPLOAD_PRESET = "auth_app";

  // Utility Functions
  const fetchMeals = async (id) => {
    try {
      const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const meal = data.meals?.[0];
      return meal ? { link: meal.strMealThumb, id } : null;
    } catch (error) {
      console.error(`Error fetching meal ${id}: `, error);
      return null;
    }
  };

  const uploadCloud = async (imageLocalPath) => {
    const imageData = new FormData();
    imageData.append("file", {
      uri: imageLocalPath,
      type: "image/jpeg",
      name: `${name || "user"}profile.jpeg`,
    });
    imageData.append("upload_preset", UPLOAD_PRESET);
    imageData.append("cloud_name", "do9zifunn");

    try {
      const response = await fetch(CLOUDINARY_URL, { method: "POST", body: imageData });
      const result = await response.json();
      if (result.secure_url) {
        setProfileImage(result.secure_url);
        ToastAndroid.show("Image uploaded successfully!", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
      Alert.alert("Error", "Failed to upload image");
    }
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) await uploadCloud(result.assets[0].uri);
  };

  const handleSaveChanges = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user");
      const userRef = doc(db, "users", user.uid);
      const updatedData = { name, bio, city, age, profileImageURL: profileImage };
      await updateDoc(userRef, updatedData);
      setUserData((prev) => ({ ...prev, ...updatedData }));
      setEditModalVisible(false);
      ToastAndroid.show("Profile updated successfully!", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error updating profile: ", error);
      Alert.alert("Error", "Failed to update profile");
    }
  };

  const handleChangeNewPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user");
      await updateDoc(doc(db, "users", user.uid), { password: newPassword });
      setNewPassword("");
      setConfirmPassword("");
      setChangePasswordModal(false);
      ToastAndroid.show("Password updated successfully!", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error updating password: ", error);
      Alert.alert("Error", "Failed to update password");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate("Welcome");
    } catch (error) {
      console.error("Error logging out: ", error);
      Alert.alert("Error", "Failed to log out");
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchMeals(userInteractionData.like), fetchMeals(userInteractionData.saved)]);
    setRefreshing(false);
  }, [userInteractionData]);

  const seeLikedFood = (id) => navigation.navigate("SearchDetail", { mealID: id });

  // Render
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#973838" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <AntDesign name="arrowleft" size={24} color="#973838" />
        </Pressable>
        <Text style={styles.headerText}>Profile</Text>
        <Pressable onPress={() => setMenuModal(true)}>
          <Entypo name="dots-three-vertical" size={24} color="#973838" />
        </Pressable>
      </View>

      {/* Profile Info */}
      <Animatable.View animation="zoomIn" duration={1400} style={styles.profileSection}>
        <Image style={styles.profileImage} source={{ uri: userData?.profileImageURL || "https://via.placeholder.com/150" }} />
        <Text style={styles.FullNameStyle}>{userData?.name || "Unnamed"}</Text>
        <Text style={styles.UserNameStyle}>{userData?.username || "No username"}</Text>
        <Text style={styles.bioText}>{userData?.bio || "No bio yet"}</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInDown" duration={1200}>
        <View style={styles.locationRow}>
          <EvilIcons name="location" size={24} color="#973838" />
          <Text style={styles.UserLocation}>{userData?.city || "Unknown"}</Text>
        </View>
      </Animatable.View>

      {/* Stats */}
      <Animatable.View animation="fadeInDown" duration={1200} style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>23</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>1.2k</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </Animatable.View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <View style={styles.optionInsideContainer}>
          <Pressable style={styles.postsOption}>
            <Text style={styles.postsOptionText}>Posts</Text>
          </Pressable>
          <Pressable onPress={() => setSelectedOption("likes")} style={styles.likesOption}>
            <Text style={styles.likesOptionText}>Likes</Text>
          </Pressable>
          <Pressable onPress={() => setSelectedOption("saved")} style={styles.savedOption}>
            <Text style={styles.savedOptionText}>Saved</Text>
          </Pressable>
        </View>
      </View>

      {/* Menu Modal */}
      <Modal animationType="fade" transparent visible={menuModal} onRequestClose={() => setMenuModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable onPress={() => setMenuModal(false)} style={{ flexDirection: "row-reverse" }}>
              <Entypo name="cross" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => setEditModalVisible(true)} style={{ flexDirection: "row", gap: 10 }}>
              <AntDesign name="edit" size={20} color="black" />
              <Text style={{ fontSize: 16 }}>Edit profile</Text>
            </Pressable>
            <Pressable onPress={() => setChangePasswordModal(true)} style={{ flexDirection: "row", gap: 10 }}>
              <MaterialIcons name="password" size={20} color="black" />
              <Text style={{ fontSize: 16 }}>Change password</Text>
            </Pressable>
            <Pressable onPress={handleLogout} style={{ flexDirection: "row", gap: 10 }}>
              <MaterialIcons name="logout" size={20} color="black" />
              <Text style={{ fontSize: 16 }}>Logout</Text>
            </Pressable>
            <Pressable style={{ flexDirection: "row", gap: 10 }}>
              <AntDesign name="deleteuser" size={20} color="black" />
              <Text style={{ fontSize: 16 }}>Delete account</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal animationType="slide" transparent visible={editModalVisible} onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.editmodalOvarlay}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.editmodalContainer}>
            <Pressable style={styles.editcloseButton} onPress={() => setEditModalVisible(false)}>
              <Ionicons name="close" size={35} color="black" />
            </Pressable>
            <ScrollView>
              <Text style={styles.editmodalTitle}>Update Profile</Text>
              <Pressable style={styles.imageContainer} onPress={handleImagePicker}>
                <Text>Add Profile Image</Text>
                <Image source={{ uri: profileImage || "https://via.placeholder.com/150" }} style={styles.editprofileImage} />
              </Pressable>
              <View>
                <Text>Name</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Update name" />
              </View>
              <View>
                <Text>Bio</Text>
                <TextInput style={styles.input} value={bio} onChangeText={setBio} placeholder="Bio" />
              </View>
              <View>
                <Text>City</Text>
                <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="City" />
              </View>
              <View>
                <Text>Age</Text>
                <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Age" keyboardType="numeric" />
              </View>
              <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* Change Password Modal */}
      <Modal animationType="slide" transparent visible={changePasswordModal} onRequestClose={() => setChangePasswordModal(false)}>
        <View style={styles.passwordChangemodalOvarlay}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.editmodalContainer}>
            <Pressable style={styles.passwordChangecloseButton} onPress={() => setChangePasswordModal(false)}>
              <Ionicons name="close" size={35} color="black" />
            </Pressable>
            <ScrollView>
              <Text style={styles.passwordChangemodalTitle}>Change Password</Text>
              <View>
                <Text style={{ padding: 7, fontSize: 18, fontWeight: "bold" }}>New Password</Text>
                <TextInput
                  style={styles.passwordChangeinput}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="New password"
                  secureTextEntry
                />
              </View>
              <View>
                <Text style={{ padding: 7, fontSize: 18, fontWeight: "bold" }}>Confirm Password</Text>
                <TextInput
                  style={styles.passwordChangeinput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm password"
                  secureTextEntry
                />
              </View>
              <TouchableOpacity onPress={handleChangeNewPassword} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* Liked/Saved Content */}
      {likeImagesLink.length || savedImageLink.length ? (
        <View style={styles.likesOptionmodalOverlay}>
          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={styles.imageGrid}
          >
            {(selectedOption === "likes" ? likeImagesLink : savedImageLink).map((meal) => (
              <TouchableOpacity key={meal.id} style={styles.likesOptionimageContainer} onPress={() => seeLikedFood(meal.id)}>
                <Image source={{ uri: meal.link }} style={styles.likesOptionimage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>No {selectedOption} yet</Text>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;