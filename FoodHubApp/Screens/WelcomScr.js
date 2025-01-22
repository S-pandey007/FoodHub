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
const WelcomeScr = () => {
  const navigation = useNavigation()
  // States for registration inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    Alert.alert("Success", "Registration successful!");
    setModalVisible(false); // Close modal on success
  };

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
          animation={'slideInUp'}
    
        />

        {/* Login Form */}
        <Animatable.View
         animation="slideInUp"
         duration={800}
         style={styles.formContainer}>
          <TextInput
            placeholder="Email ID"
            style={styles.input}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
          />
          <Button title="Login" onPress={() => navigation.navigate("Home")} color="#973838" />
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
