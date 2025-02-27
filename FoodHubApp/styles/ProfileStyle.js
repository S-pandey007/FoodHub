import { StyleSheet } from 'react-native';

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
      flex: 1,
    },
    optionInsideContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
  
    postsOption: {
      backgroundColor: "#973838",
      borderRadius: 10,
    },
    postsOptionText: {
      color: "white",
      paddingHorizontal: 20,
      paddingVertical: 7,
      fontSize: 17,
      fontWeight: "bold",
    },
  
    likesOption: {
      backgroundColor: "#973838",
      borderRadius: 10,
    },
    likesOptionText: {
      color: "white",
      paddingHorizontal: 20,
      paddingVertical: 7,
      fontSize: 17,
      fontWeight: "bold",
    },
  
    savedOption: {
      backgroundColor: "#973838",
      borderRadius: 10,
    },
    savedOptionText: {
      color: "white",
      paddingHorizontal: 20,
      paddingVertical: 7,
      fontSize: 17,
      fontWeight: "bold",
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
    editmodalTitle: {
      fontSize: 18,
      fontWeight: "800",
      textAlign: "center",
      marginBottom: 10,
    },
  
    imageContainer: {
      alignItems: "center",
      marginBottom: 15,
    },
  
    editprofileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
  
    input: {
      borderBottomWidth: 1,
      marginBottom: 10,
      paddingVertical: 5,
    },
  
    saveButton: {
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      marginTop: 10,
    },
    saveButtonText: {
      color: "white",
      fontSize: 16,
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
    passwordChangemodalTitle: {
      fontSize: 18,
      fontWeight: "800",
      textAlign: "center",
      marginBottom: 10,
    },
  
    passwordChangeinput: {
      borderBottomWidth: 1,
      marginBottom: 20,
      paddingVertical: 5,
    },
  
    saveButton: {
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      marginTop: 10,
    },
    saveButtonText: {
      color: "white",
      fontSize: 16,
    },
  
    // liked image show
    //  likesOptionmodalOverlay: {
    //   flex: 1,
    //   justifyContent: 'flex-end', // Aligns modal to the bottom
    //   backgroundColor: 'rgba(0, 0, 0, 0)', // Dim background
    // },
    // likesOptionmodalContent: {
    //    height: 320,// Modal covers 50% of screen height
    //   backgroundColor: '#fff',
    //   borderTopLeftRadius: 20,
    //   borderTopRightRadius: 20,
    //   padding: 10,
    // },
    // likesOptionimageContainer: {
    //   flex: 1,
    //   aspectRatio: 1, // Keeps images square
    //   margin: 2,
    // },
    // likesOptionimage: {
    //   width: '100%',
    //   height: '100%',
    //   borderRadius: 5, // Optional rounded corners
    // },
  
    likesOptionmodalOverlay: {
      flex: 1,
      justifyContent: "flex-end", // Aligns modal to the bottom
      backgroundColor: "rgba(0,0,0,0.5)", // Dim background
    },
    likesOptionmodalContent: {
      height: 320, // Modal covers 50% of screen height
      backgroundColor: "#fff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 10,
      paddingBottom:55
    },
    imageGrid: {
      flexDirection: "row",
      flexWrap: "wrap", // Enables grid-like layout
      justifyContent: "space-between", // Distributes images evenly
    },
    likesOptionimageContainer: {
      width: "32%", // 3 images per row with small margin
      aspectRatio: 1, // Keeps images square
      marginBottom: 4, // Space between rows
    },
    likesOptionimage: {
      width: "100%",
      height: "100%",
      borderRadius: 5, // Optional rounded corners
    },
  });

  export default styles;