import { View, Text,StyleSheet,Pressable,Image } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const PostDetailScreen = () => {
  return (
    <View>

        <View style={styles.header}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.headerTitle}>Post</Text>
      </View>
      <View style={styles.postContainer}>
              {/* Post Header */}
              <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                  <Image
                    source={{ uri:"https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b"}}
                    style={styles.userImage}
                  />
                  <View>
                    <Text style={styles.username}>ShubhamPandey</Text>
                    <Text style={styles.userHandle}>@shubha</Text>
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
                  Hey, I am Shubham Pandey. Currently, I am pursuing MCA in Pune. I am a mobile application developer.
                {/* {item.postText} */}
                </Text>
                <Image
                  source={{ uri:"https://s3-alpha.figma.com/profile/06cafc63-ee3c-493a-9c3c-0d3d57f55f9b"}}
                  style={styles.postImage}
                />
              </View>
  
              {/* Post Time */}
              <Text style={styles.postTime}>12:00 PM , 12 Apr 2023 </Text>

              <View style={styles.BloggingContent}>
                    
              </View>
  
              {/* Like, Comment, Save */}
              <View style={styles.postActionsContainer}>
                <View style={styles.actionButton}>
                  <FontAwesome name="comment-o" size={20} color="black" />
                  <Text style={styles.actionText}>23</Text>
                </View>
                <View style={styles.actionButton}>
                  <AntDesign name="hearto" size={20} color="black" />
                  <Text style={styles.actionText}>23</Text>
                </View>
                <View style={styles.actionButton}>
                  <MaterialCommunityIcons name="content-save-all-outline" size={20} color="black" />
                  <Text style={styles.actionText}>23</Text>
                </View>
              </View>
            </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        color:'white',
        padding:10
    },
    header:{
        marginTop:25,
        flexDirection:'row',
        alignItems:'center',
        gap:20,
        marginBottom:10
      },
    
      headerTitle:{
        fontSize:20,
        fontWeight:'bold',
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
})
export default PostDetailScreen