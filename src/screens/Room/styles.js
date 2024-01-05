import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f8fafb",
  },
  flatContainer:{
    width:"100%",
  },
  roomItem: {
    padding: 20,
    margin:20,
    backgroundColor: "#ebf3f2",
    borderRadius: 15,
    elevation:5,
  },
  roomDescription: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    //color: "#fff",
  },
  roomPrice: {
    fontSize: 16,
    //color: "#fff",
  },
  bookNowButton: {
    fontSize: 16,
    color: "#4285F4",
    marginTop: 8,
  },
  bookingModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bookingModalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF",
  },
  bookingInput: {
    width: "80%",
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  datePickerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 16,
    marginBottom: 16,
  },
  datePicker: {
    width: "100%",
    height: 40,
  },
  modalDatePickerButton: {
    backgroundColor: "#4285F4",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalDatePickerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  bookingButton: {
    backgroundColor: "#0F9D58",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  bookingButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  roomImage: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
  },
});

export default styles;