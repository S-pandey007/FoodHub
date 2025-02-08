import React, { use, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
import {ToastAndroid} from "react-native";

const ProfileScreen = () => {
  const Profile_Option = [
    { id: "1", option: "Post" },
    { id: "2", option: "Media" },
    { id: "3", option: "Likes" },
    { id: "4", option: "WatchList" },
  ];
  // const [optionDataShow,setOptionDataShow] = useState({})
  const navigation = useNavigation();
  const [MenuModal, setMenuModal] = useState(false);
  const [userData, setUserData] = useState();
  const [editModalVisible, setEditModalVisible] = useState(false);

  // edit userinformation

  const [profileImage, setProfileImage] = useState();
  const [name,setName] = useState()
  const [bio, setBio] = useState();
  const [city, setCity] = useState();
  const [age, setAge] = useState();

  // change password
  const [changePassword,setChangePasswordModal] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
            setName(userData.name)
            setAge(userData.age)
            setBio(userData.bio)
            setCity(userData.city)
            setProfileImage(userData.profileImageURL)
            // console.log("user data : ", userData);
          }
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchUserData();
  }, []);
// console.log("name",name);
// console.log("profile image",profileImage);


  //profile image picker
  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadCloud(result.assets[0].uri)
    }
  };

  // handle logout
  const handleLogout = async () => {
    await signOut(auth);
    navigation.navigate("Welcome");
  };

  // cloudinary 
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/do9zifunn/upload";
  const UPLOAD_PRESET = "auth_app";

  // fetched image from local screen to store in cloud
  const uploadCloud = async (imageLocalPath)=>{
    const ImageData = new FormData();
    ImageData.append("file",{
      uri:imageLocalPath,
      type:"image/jpeg",
      name:`${name}profile.jpeg`
    })
    ImageData.append("upload_preset", UPLOAD_PRESET);
    ImageData.append("cloud_name", "do9zifunn");

    try {
      const response = await fetch(CLOUDINARY_URL,{
        method:"POST",
        body:ImageData,
      })

      const result = await response.json()

      if(result.secure_url){
        setProfileImage(result.secure_url);
        console.log("uploaded image URL : ",result.secure_url);
      }
    } catch (error) {
      console.error("Error uploadign image in cloudinary",error);
    }
  }

  // update user information
  const handleSaveChanges = async()=>{
    console.log("name : ",name);
    console.log("city : ",city);
    console.log("profile image cloud URL : ",profileImage);
    console.log("bio : ",bio);
    try {
      const user = auth.currentUser;
      if(user){
        const userRef = doc(db,"users",user.uid)
        await updateDoc(userRef,{
          name:name,
          bio:bio,
          city:city,
          age:age,
          profileImageURL:profileImage
        })
        console.log("user information updated updated");
        setEditModalVisible(false)
        setName("")
        setAge("")
        setBio("")
        setCity("")
        setProfileImage('')
      }
      // console.log("I think user not exist check this log")
    } catch (error) {
      console.error("Update information failed : ",error);
      
    }
  }


  // change user password 
  const [newPassword , setNewPassword] = useState()
  const [confirmPassword,setConfirmPassword] =useState()
  const handleChangeNewPassword = async()=>{
    if(newPassword!==confirmPassword){
      Alert.alert("Error","Password not matched")
      return
    }
    const user = auth.currentUser
      if(!user){
        Alert.alert("Error","No user found.")
        return
      }
      try {
        const userRef = doc(db,"users",user.uid)
        await updateDoc(userRef,{
          password:newPassword
        })
        console.log("Password Updated");
        setConfirmPassword("")
        setNewPassword("")
        ToastAndroid.show("Password updated successfully!", ToastAndroid.SHORT);
        
      } catch (error) {
        console.error("Something goes wrong ! Password not update ",error);
      }
  }

  return (
    <>
      {userData ? (
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
          <Animatable.View
            animation="zoomIn"
            duration={1400}
            style={styles.profileSection}
          >
            <Image
              style={styles.profileImage}
              source={{
                uri:userData.profileImageURL,
              }}
            />
            <Text style={styles.FullNameStyle}>{userData.name}</Text>
            <Text style={styles.UserNameStyle}>{userData.username}</Text>
            <Text style={styles.bioText}>
              {userData.bio}
            </Text>
          </Animatable.View>

          <Animatable.View
            animation="fadeInDown"
            direction="alternate"
            duration={1200}
          >
            <View style={styles.locationRow}>
              <EvilIcons name="location" size={24} color="#973838" />
              <Text style={styles.UserLocation}>{userData.city}</Text>
            </View>
            {/* <View style={styles.joinDateRow}>
              <EvilIcons name="calendar" size={24} color="#973838" />
              <Text style={styles.joinDate}>Joined: 23/02/2002</Text>
            </View> */}
          </Animatable.View>

          {/* Stats */}
          <Animatable.View
            animation="fadeInDown"
            direction="alternate"
            duration={1200}
            style={styles.statsContainer}
          >
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
            <FlatList
              data={Profile_Option}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Animatable.View
                  animation="fadeInDown"
                  direction="alternate"
                  duration={1200}
                >
                  <Pressable style={styles.optionButton}>
                    <Text style={styles.optionText}>{item.option}</Text>
                  </Pressable>
                </Animatable.View>
              )}
            />
          </View>

          {/* <Modal
            animationType="fade"
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={{width:"auto",height:300,backgroundColor:'red',top:430,left:10,right:200}}>
              <Pressable onPress={()=>setModalVisible(false)}>
              <Entypo name="cross" size={34} color="black" />
              </Pressable>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{optionDataShow.option}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal> */}

          <Modal
            animationType="fade"
            transparent={true}
            visible={MenuModal}
            onRequestClose={() => setMenuModal(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Pressable
                  onPress={() => setMenuModal(false)}
                  style={{ flexDirection: "row-reverse" }}
                >
                  <Entypo name="cross" size={24} color="black" />
                </Pressable>

                <Pressable
                  onPress={() => setEditModalVisible(true)}
                  style={{ flexDirection: "row", gap: 10 }}
                >
                  <AntDesign name="edit" size={20} color="black" />
                  <Text style={{ fontSize: 16 }}>Edit profile</Text>
                </Pressable>

                <Pressable
                onPress={()=>setChangePasswordModal(true)}
                style={{ flexDirection: "row", gap: 10 }}>
                  <MaterialIcons name="password" size={20} color="black" />
                  <Text style={{ fontSize: 16 }}>change password</Text>
                </Pressable>

                <Pressable
                  onPress={handleLogout}
                  style={{ flexDirection: "row", gap: 10 }}
                >
                  <MaterialIcons name="logout" size={20} color="black" />
                  <Text style={{ fontSize: 16 }}>logout</Text>
                </Pressable>

                <Pressable style={{ flexDirection: "row", gap: 10 }}>
                  <AntDesign name="deleteuser" size={20} color="black" />
                  <Text style={{ fontSize: 16 }}>delete account</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

{/* edit profile  */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={editModalVisible}
            onRequestClose={() => setEditModalVisible(!editModalVisible)}
          >
              <View style={styles.editmodalOvarlay}>
                <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.editmodalContainer}>
                  <Pressable
                    style={styles.editcloseButton}
                    onPress={() => {
                      setEditModalVisible(false);
                    }}
                  >
                    <Ionicons name="close" size={35} color="black" />
                  </Pressable>

                  <ScrollView>
                    <Text style={styles.editmodalTitle}>Update Profile</Text>
                    <View>
                      <Pressable
                      style={styles.imageContainer}
                      onPress={handleImagePicker}>
                        <Text>Add Profile Image</Text>
                      
                      <Image
                        source={{ uri:profileImage }}
                        style={styles.editprofileImage}
                      /></Pressable>
                    </View>
                    <View>
                      <Text>Name</Text>
                      <TextInput 
                      style={styles.input}
                      value={name}
                      onChangeText={(text)=>setName(text)}
                      placeholder="update name" />
                    </View>

                    <View>
                      <Text>Bio</Text>
                      <TextInput 
                      value={bio}
                      onChangeText={(text)=>setBio(text)}
                      style={styles.input}
                      placeholder="bio" />
                    </View>

                    <View>
                      <Text>City</Text>
                      <TextInput 
                      value={city}
                      onChangeText={(text)=>setCity(text)}
                      style={styles.input}
                      placeholder="city" />
                    </View>

                    <View>
                      <Text>Age</Text>
                      <TextInput
                      value={age}
                      onChangeText={(text)=>setAge(text)}
                      style={styles.input}
                      placeholder="Age" />
                    </View>

                    <TouchableOpacity
                    onPress={handleSaveChanges}
                    style={styles.saveButton}>
                      <Text 
                      style={styles.saveButtonText}
                      >Save changess</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </KeyboardAvoidingView>
            </View>
          </Modal>

          {/* change password  */}

          <Modal
            animationType="slide"
            transparent={true}
            visible={changePassword}
            onRequestClose={() => setChangePasswordModal(false)}
          >
              <View style={styles.passwordChangemodalOvarlay}>
                <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.editmodalContainer}>
                  <Pressable
                    style={styles.passwordChangecloseButton}
                    onPress={() => setChangePasswordModal(false)}
                  >
                    <Ionicons name="close" size={35} color="black" />
                  </Pressable>

                  <ScrollView>
                    <Text style={styles.passwordChangemodalTitle}>Change password</Text>
                    <View>
                      <Text style={{padding:7,fontSize:18,fontWeight:'bold'}}>New Password</Text>
                      <TextInput 
                      value={newPassword}
                      onChangeText={(text)=>setNewPassword(text)}
                      style={styles.passwordChangeinput}
                      placeholder="new password" />
                    </View>

                    <View>
                      <Text style={{padding:7,fontSize:18,fontWeight:'bold'}}>Confirm Password</Text>
                      <TextInput 
                      value={confirmPassword}
                      onChangeText={(text)=>setConfirmPassword(text)}
                      style={styles.passwordChangeinput}
                      placeholder="confirm password" />
                    </View>

                    <TouchableOpacity
                    onPress={handleChangeNewPassword}
                    style={styles.saveButton}>
                      <Text 
                      style={styles.saveButtonText}
                      >Save changes</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </KeyboardAvoidingView>
            </View>
          </Modal>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "#fff",
          }}
        >
          <ActivityIndicator size="large" color="blue" />;
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10, // Adjusted padding for better spacing
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFF",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#973838",
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#FFF",
    marginBottom: 10,
    borderRadius: 40,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  FullNameStyle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  UserNameStyle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  bioText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  UserLocation: {
    fontSize: 14,
    color: "#555",
    marginLeft: 5,
  },
  joinDateRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  joinDate: {
    fontSize: 14,
    color: "#555",
    marginLeft: 5,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 30,
    backgroundColor: "#FFF",
    paddingVertical: 10,
    marginBottom: 10,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "centers",
    gap: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  optionsContainer: {
    backgroundColor: "#FFF",
    shadowRadius: 4,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#973838",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionText: {
    fontSize: 14,
    color: "#FFF",
    fontWeight: "600",
  },

  modalContainer: {
    flex: 1,
    left: 80,
    top: 0,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)",
    gap: 10,
  },
  modalContent: {
    width: "auto",
    height: "auto",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation: 4,
    gap: 20,
  },

  // edit modal
  editmodalOvarlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  editmodalContainer: {
    width: "100%",
    height: "70%",
    backgroundColor: "#f7efef",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    alignContent: "center",
    // alignItems: "center",
  },
  editcloseButton: {
    // position: "absolute",
    top: 10,
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  editmodalTitle:{
    fontSize:18,
    fontWeight:"800",
    textAlign:'center',
    marginBottom:10
  },

  imageContainer:{
    alignItems:'center',
    marginBottom:15
  },

  editprofileImage:{
    width:100,
    height:100,
    borderRadius:50,
    
  },

  input:{
    borderBottomWidth:1,
    marginBottom:10,
    paddingVertical:5
  },

  saveButton:{
    backgroundColor:'blue',
    padding:10,
    borderRadius:5,
    alignItems:'center',
    marginTop:10
  },
  saveButtonText:{
    color:'white',
    fontSize:16
  },


//  change password modal 

passwordChangemodalOvarlay: {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  justifyContent: "flex-end",
},

passwordChangemodalContainer: {
  width: "100%",
  height: 400,
  backgroundColor: "#f7efef",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 15,
  alignContent: "center",
  // alignItems: "center",
},
passwordChangecloseButton: {
  // position: "absolute",
  top: 10,
  justifyContent: "flex-end",
  paddingBottom: 10,
},
passwordChangemodalTitle:{
  fontSize:18,
  fontWeight:"800",
  textAlign:'center',
  marginBottom:10
},


passwordChangeinput:{
  borderBottomWidth:1,
  marginBottom:20,
  paddingVertical:5
},

saveButton:{
  backgroundColor:'blue',
  padding:10,
  borderRadius:5,
  alignItems:'center',
  marginTop:10
},
saveButtonText:{
  color:'white',
  fontSize:16
},
});

export default ProfileScreen;
