import { View, Text, Image, Pressable, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native'
const UserPost = () => {
  const posts = [
    {
      id:1,
      username: "Shubham Pandey",
      userHandle: "@shubham122",
      userImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postText: "Hey, I am Shubham Pandey. Currently, I am pursuing MCA in Pune. I am a mobile application developer.",
      postImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postDateTime: "12:00 PM Oct 14, 2025",
      likes: 23,
      comments: 23,
      saves: 23
    },
    {
      id:2,
      username: "Amit Kumar",
      userHandle: "@amit_kumar",
      userImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postText: "Excited to share my new mobile app with you all!",
      postImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postDateTime: "1:30 PM Oct 14, 2025",
      likes: 50,
      comments: 12,
      saves: 10
    },
    {
      id:3,
      username: "Sneha Sharma",
      userHandle: "@sneha_sharma",
      userImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postText: "Learning React Native is so much fun!",
      postImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postDateTime: "3:45 PM Oct 14, 2025",
      likes: 35,
      comments: 18,
      saves: 15
    },
    {
      id:4,
      username: "Rahul Verma",
      userHandle: "@rahul_v10",
      userImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postText: "Just finished my latest coding project!",
      postImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postDateTime: "5:00 PM Oct 14, 2025",
      likes: 40,
      comments: 20,
      saves: 22
    },
    {
      id:5,
      username: "Priya Singh",
      userHandle: "@priya_singh",
      userImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postText: "Loving the new features in JavaScript ES2025!",
      postImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postDateTime: "6:15 PM Oct 14, 2025",
      likes: 55,
      comments: 30,
      saves: 25
    },
    {
      id:6,
      username: "Aniket Tiwari",
      userHandle: "@aniket_t",
      userImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postText: "Started learning AI development! Wish me luck!",
      postImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postDateTime: "7:45 PM Oct 14, 2025",
      likes: 48,
      comments: 22,
      saves: 18
    },
    {
      id:7,
      username: "Neha Patil",
      userHandle: "@neha_patil",
      userImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postText: "Trying out the latest Android Studio update!",
      postImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postDateTime: "8:30 PM Oct 14, 2025",
      likes: 60,
      comments: 28,
      saves: 30
    },
    {
      id:8,
      username: "Vikas Jha",
      userHandle: "@vikas_jha",
      userImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postText: "Reading about AI ethics today. It's a deep topic!",
      postImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postDateTime: "9:15 PM Oct 14, 2025",
      likes: 33,
      comments: 15,
      saves: 12
    },
    {
      id:9,
      username: "Meera Kapoor",
      userHandle: "@meera_kapoor",
      userImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postText: "Does anyone know a good tutorial on GraphQL?",
      postImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postDateTime: "10:00 PM Oct 14, 2025",
      likes: 29,
      comments: 10,
      saves: 8
    },
    {
      id:10,
      username: "Rohan Mehta",
      userHandle: "@rohan_mehta",
      userImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postText: "Coding late at night is the best time to be productive!",
      postImage: "https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b",
      postDateTime: "11:45 PM Oct 14, 2025",
      likes: 41,
      comments: 19,
      saves: 14
    }
  ];
    const navigation = useNavigation()
  const [ForYouScr , SetForYou] = useState(true)
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.headerTitle}>FoodHub</Text>
      </View>

      {/* Tabs */}
      {
        ForYouScr ? (
          <View style={styles.tabs}>
        <Pressable onPress={()=>{
          SetForYou(true)
          // SetFollowing(false)
        }}><Text style={styles.activeTab}>For You</Text></Pressable>
        <Pressable onPress={()=>{
          SetForYou(false)
          // SetFollowing(true)
        }}><Text style={styles.inactiveTab}>Following</Text></Pressable>
      </View>
        ):(
          <View style={styles.tabs}>
        <Pressable onPress={()=>{
          SetForYou(true)
          // SetFollowing(false)
        }}><Text style={styles.inactiveTab}>For You</Text></Pressable>
        <Pressable onPress={()=>{
          SetForYou(false)
          // SetFollowing(true)
        }}><Text style={styles.activeTab}>Following</Text></Pressable>
      </View>
        )
      }

      {
        ForYouScr ? (
          <FlatList
        data={posts} // Replace with actual data
        keyExtractor={(item)=>item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            {/* Post Header */}
            <View style={styles.postHeader}>
              <View style={styles.userInfo}>
                <Image
                  source={{ uri:item.userImage}}
                  style={styles.userImage}
                />
                <View>
                  <Text style={styles.username}>{item.username}</Text>
                  <Text style={styles.userHandle}>{item.userHandle}</Text>
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
            <Pressable onPress={()=> navigation.navigate("PostDetail")} style={styles.postContent}>
              <Text style={styles.postText}>
                {/* Hey, I am Shubham Pandey. Currently, I am pursuing MCA in Pune. I am a mobile application developer. */}
              {item.postText}
              </Text>
              <Image
                source={{ uri:item.postImage}}
                style={styles.postImage}
              />
            </Pressable>

            {/* Post Time */}
            <Text style={styles.postTime}>{item.postDateTime}</Text>

            {/* Like, Comment, Save */}
            <View style={styles.postActionsContainer}>
              <View style={styles.actionButton}>
                <FontAwesome name="comment-o" size={20} color="black" />
                <Text style={styles.actionText}>{item.comments}</Text>
              </View>
              <View style={styles.actionButton}>
                <AntDesign name="hearto" size={20} color="black" />
                <Text style={styles.actionText}>{item.likes}</Text>
              </View>
              <View style={styles.actionButton}>
                <MaterialCommunityIcons name="content-save-all-outline" size={20} color="black" />
                <Text style={styles.actionText}>{item.saves}</Text>
              </View>
            </View>
          </View>
        )}
      />
        ):(<FlatList
          data={posts} // Replace with actual data
          keyExtractor={(item)=>item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              {/* Post Header */}
              <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                  <Image
                    source={{ uri:item.userImage}}
                    style={styles.userImage}
                  />
                  <View>
                    <Text style={styles.username}>{item.username}</Text>
                    <Text style={styles.userHandle}>{item.userHandle}</Text>
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
                <Text style={styles.postText}>
                  {/* Hey, I am Shubham Pandey. Currently, I am pursuing MCA in Pune. I am a mobile application developer. */}
                {item.postText}
                </Text>
                <Image
                  source={{ uri:item.postImage}}
                  style={styles.postImage}
                />
              </View>
  
              {/* Post Time */}
              <Text style={styles.postTime}>{item.postDateTime}</Text>
  
              {/* Like, Comment, Save */}
              <View style={styles.postActionsContainer}>
                <View style={styles.actionButton}>
                  <FontAwesome name="comment-o" size={20} color="black" />
                  <Text style={styles.actionText}>{item.comments}</Text>
                </View>
                <View style={styles.actionButton}>
                  <AntDesign name="hearto" size={20} color="black" />
                  <Text style={styles.actionText}>{item.likes}</Text>
                </View>
                <View style={styles.actionButton}>
                  <MaterialCommunityIcons name="content-save-all-outline" size={20} color="black" />
                  <Text style={styles.actionText}>{item.saves}</Text>
                </View>
              </View>
            </View>
          )}
        />)
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    padding:16,
  },

  header:{
    marginTop:10,
    flexDirection:'row',
    alignItems:'center',
    gap:20,
    marginBottom:10
  },

  headerTitle:{
    fontSize:20,
    fontWeight:'bold',
  },

  tabs:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginBottom:15
  },
  activeTab:{
    fontSize:16,
    fontWeight:'bold',
    color:'black',
    borderBottomColor:'black',
    borderBottomWidth:2,
    paddingBottom:5
  },
  inactiveTab:{
    fontSize:16,
    color:'gray'
  },

  postContainer:{
    backgroundColor:'#f9f9f9',
    borderRadius:10,
    padding:15,
    marginBottom:10
  },
  
  postHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },

  userInfo:{
    flexDirection:'row',
    alignItems:'center',
    gap:10
  },
  userImage:{
    width:40,
    height:40,
    borderRadius:20
  },
  username:{
    fontSize:16,
    fontWeight:'bold',
  },
  userHandle:{
    fontSize:14,
    color:'gray'
  },

  postActions:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
  },

  subscribeButton:{
    backgroundColor:'#1DA1F2',
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:5
  },

  subscribeText:{
    color:'white',
    fontSize:14
  },
  postContent:{
    marginTop:10
  },
  postText:{
    fontSize:14,
    color:'black',
    marginTop:10
  },
  postImage:{
    width:'100%',
    height:200,
    borderRadius:10,
    resizeMode:'cover'
  },
  postTime:{
    fontSize:12,
    color:'gray',
    margin:5
  },
  postActionsContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:10
  },
  actionButton:{
    flexDirection:'row',
    alignItems:'center',
    gap:5
  },
  actionText:{
    fontSize:14,
    color:'black'
  }
});

export default UserPost;
