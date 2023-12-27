import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  roomItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  roomDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  roomPrice: {
    fontSize: 16,
    color: '#fff',
  },
  bookNowButton: {
    fontSize: 16,
    color: '#4285F4',
    marginTop: 8,
  },
  bookingModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bookingModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  bookingInput: {
    width: '80%',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  datePickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 16,
    marginBottom: 16,
  },
  datePicker: {
    width: '100%',
    height: 40,
  },
  modalDatePickerButton: {
    backgroundColor: '#4285F4',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalDatePickerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  bookingButton: {
    backgroundColor: '#0F9D58',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  bookingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;
