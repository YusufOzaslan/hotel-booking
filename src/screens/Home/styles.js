import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f8fafb",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchBarContainer: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
    width: "80%", 
  },
  searchBarInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  hotelItem: {
    // Otellerin listelendiği öğelerin stili
    //backgroundColor: "#e6eaed",
    padding: 20,
    marginVertical: 8,
    //borderRadius: 10,
    width: '100%',
    //alignItems: 'center', justifyContent: 'center',

    //marginVertical: 8,
    //marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
   borderRadius: 15,
    elevation: 3,
  },
  hotelName: {
    marginTop:15,
    fontSize: 22,
    fontWeight: "bold",
  },
  hotelCity: {
    marginTop:5,
    fontSize: 18,
  },
  flatListContainer: {
    width: '80%',
  },
  hotelImage: {
    backgroundColor: "#fff",
    //padding: 15,
    marginVertical: 5,
    borderRadius: 25,
  },
  hotelPhoto:{
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  }
});
export default styles;
