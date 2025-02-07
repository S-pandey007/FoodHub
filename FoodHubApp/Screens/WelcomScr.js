import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Modal,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

// firebase import

import { signInWithEmailAndPassword,onAuthStateChanged,createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";


// email sending import 
// import emailjs from '@emailjs/browser';
// import emailjs from "emailjs-com";

const WelcomeScr = () => {
  const navigation = useNavigation();
  // States for registration inputs
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [loginEmail , setLoginEmail] = useState()
  const [loginPassword , setLoginPassword] = useState()

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      // create user using email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // save data in firbase
      await setDoc(doc(db, "users", user.uid), {
        name,
        username,
        email,
        password,
        mobile,
        uid: user.uid,
      });

      console.log("Sucessfully Register");
      await handleSendEmail(email,name)
      setEmail("")
      setMobile("")
      setName("")
      setPassword("")
      setUsername("")
      setConfirmPassword("")
      setModalVisible(false)
      
    } catch (error) {
      console.error("user registration : ", error);
    }

    setModalVisible(false); // Close modal on success
  };

  // const handleSendEmail = async(useremail,username)=>{
  //   try {
  //     emailjs.send(
  //       'service_ckaj4im', // serive id
  //       'template_1ax68f7', // template id
  //       {
  //         user_name:username,
  //         to_email:useremail
  //       },
  //       'CSIZloc1ogpAYd4Uc'
  //     ).then(
  //       function(response){
  //         console.log("mail sent successfully");
          
  //       },
  //       function(error){
  //         console.error(error);
          
  //       }
  //     )

  //     // console.log("Email Sent successfully!");
      
  //   } catch (error) {
  //     console.error("Email not sent something wrong : ",error);
      
  //   }
  // }

  const handleSendEmail = async (useremail, username) => {
    const serviceID = 'service_ckaj4im'; // Replace with your EmailJS Service ID
    const templateID = 'template_1ax68f7'; // Replace with your EmailJS Template ID
    const publicKey = 'CSIZloc1ogpAYd4Uc'; // Replace with your EmailJS Public Key
  
    const url = 'https://api.emailjs.com/api/v1.0/email/send';
  
    const emailData = {
      service_id: serviceID,
      template_id: templateID,
      user_id: publicKey,
      template_params: {
        user_name: username,
        to_email: useremail,
      },
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
  
      if (response.ok) {
        console.log('📧 Email sent successfully!');
      } else {
        console.error('❌ Failed to send email:', response.statusText);
      }
    } catch (error) {
      console.error('⚠️ Error sending email:', error);
    }
  };

  const handleLogin = async()=>{
    try{
      await signInWithEmailAndPassword(auth,loginEmail,loginPassword)
      navigation.navigate("Home")
      console.log("successFully logged");
      
    }catch(error){
      console.error("Login Error : ",error);
      
    }
  }

  const registration = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.centerContainer}>
        {/* Lottie Animation */}
        <LottieView
          source={require("../AnimationJson/loginAnimation (2).json")}
          autoPlay
          loop
          style={styles.lottieAnimation}
          animation={"slideInUp"}
        />

        {/* Login Form */}
        <Animatable.View
          animation="slideInUp"
          duration={800}
          style={styles.formContainer}
        >
          <TextInput
            placeholder="Email ID"
            style={styles.input}
            keyboardType="email-address"
            value={loginEmail}
            onChangeText={(text)=>setLoginEmail(text)}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={loginPassword}
            onChangeText={(text)=>setLoginPassword(text)}
            secureTextEntry
          />
          <Button
            title="Login"
            onPress={handleLogin}
            color="#973838"
          />
          <Pressable style={styles.newUser} onPress={registration}>
            <Text style={styles.newUserText}>New User?</Text>
          </Pressable>
          <Pressable style={styles.newUser} onPress={registration}>
            <Text style={styles.newUserText}>Forgot Password?</Text>
          </Pressable>
        </Animatable.View>
      </View>

      {/* Registration Modal */}
      <Modal
        animationType="slide"
        duration={3800}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContainer}
          >
            <Text style={styles.registrationTitle}>Registration</Text>
            <TextInput
              placeholder="Enter Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="enter username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
            <TextInput
              placeholder="Enter Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Enter Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              secureTextEntry
            />
            <TextInput
              placeholder="Mobile Number"
              value={mobile}
              onChangeText={setMobile}
              style={styles.input}
              keyboardType="numeric"
            />
            <Pressable onPress={handleRegister} style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Register</Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
  formContainer: {
    width: "80%",
    marginTop: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  newUser: {
    marginTop: 15,
    alignSelf: "center",
  },
  newUserText: {
    color: "#973838",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  registrationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: "#973838",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    color: "#973838",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default WelcomeScr;
