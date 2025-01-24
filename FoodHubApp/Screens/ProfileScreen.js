import React, { use } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useState } from "react";
import  {useNavigation} from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const ProfileScreen = () => {
  const Profile_Option = [
    { id: "1", option: "Post" },
    { id: "2", option: "Media" },
    { id: "3", option: "Likes" },
    { id: "4", option: "WatchList" },
  ];
  // const [optionDataShow,setOptionDataShow] = useState({})
  const navigation = useNavigation()
  const [MenuModal , setMenuModal] = useState(false)  
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={()=>navigation.navigate("Home")}>

        <AntDesign name="arrowleft" size={24} color="#973838" />
        </Pressable>
        <Text style={styles.headerText}>Profile</Text>
        <Pressable onPress={()=>setMenuModal(true)}>
        <Entypo name="dots-three-vertical" size={24} color="#973838" />
        </Pressable>
      </View>

      {/* Profile Info */}
      <Animatable.View 
      animation="zoomIn"  duration={1400}
      style={styles.profileSection}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://yt3.ggpht.com/yti/ANjgQV9v56tO5WccYmiXtKsAVQxg7KhnxfANPiyr56F1uDPSv68=s88-c-k-c0x00ffffff-no-rj",
          }}
        />
        <Text style={styles.FullNameStyle}>Shubham Pandey</Text>
        <Text style={styles.UserNameStyle}>@shubham007</Text>
        <Text style={styles.bioText}>
          Passionate developer | Love coding and coffee ☕
        </Text>
      </Animatable.View>

      <Animatable.View
            animation="fadeInDown" direction="alternate" duration={1200}
      
      >
        <View style={styles.locationRow}>
          <EvilIcons name="location" size={24} color="#973838" />
          <Text style={styles.UserLocation}>Pune</Text>
        </View>
        <View style={styles.joinDateRow}>
          <EvilIcons name="calendar" size={24} color="#973838" />
          <Text style={styles.joinDate}>Joined: 23/02/2002</Text>
        </View>
      </Animatable.View>

      {/* Stats */}
      <Animatable.View 
            animation="fadeInDown" direction="alternate" duration={1200}
      
      style={styles.statsContainer}>
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
            animation="fadeInDown" direction="alternate" duration={1200}
            
            >
            <Pressable
              style={styles.optionButton}>
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
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
        
          <View style={styles.modalContent}>
          <Pressable onPress={()=>setMenuModal(false)} style={{flexDirection:'row-reverse'}}>
            <Entypo name="cross" size={24} color="black" />
          </Pressable>
            <Pressable style={{flexDirection:'row',gap:10}}>
            <AntDesign name="edit" size={20} color="black" />
              <Text style={{fontSize:16}}>Edit profile</Text></Pressable>
            <Pressable style={{flexDirection:'row',gap:10}}>
            <MaterialIcons name="password" size={20} color="black" />
              <Text style={{fontSize:16}}>change password</Text></Pressable>
            <Pressable style={{flexDirection:'row',gap:10}}>
            <MaterialIcons name="logout" size={20} color="black" />
              <Text style={{fontSize:16}}>logout</Text></Pressable>
            <Pressable style={{flexDirection:'row',gap:10}}>
            <AntDesign name="deleteuser" size={20} color="black" />
              <Text style={{fontSize:16}}>delete account</Text></Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    borderRadius:40,
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
    gap:30,
    backgroundColor: "#FFF",
    paddingVertical: 10,
    marginBottom: 10,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    textAlign:'centers',
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
    left:80,
    top:0,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0)",
    gap:10
  },
  modalContent: {
    width: 'auto',
    height: 'auto',
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    elevation:4,
    gap:20
  },
});

export default ProfileScreen;
