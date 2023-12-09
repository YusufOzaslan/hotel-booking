import {
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import database from "../../data/Database";
import { useAuth } from "../../context/AuthContext";

const LoginScreen = () => {
  const { login, setLogin, user, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    setLogin(false);
    /*
    // SQLite veritabanından kullanıcıyı sorgula
    database.getUsers((users) => {
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Kullanıcı bulundu, giriş başarılı
        console.log("Giriş başarılı:", user);
        // Kullanıcının oturum durumunu güncelle
        login(user);
        // Giriş yaptıktan sonra başka bir sayfaya yönlendirme yap
        navigation.navigate("HomeScreen");
      } else {
        // Kullanıcı bulunamadı, giriş başarısız
        console.log("Giriş başarısız");
      }
    });*/

    setLoading(false);
  };

  const signUp = async () => {
    setLoading(true);
    setLoading(false);
  };
  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail()}
        ></TextInput>
        <TextInput
          secureTextEntry={true}
          value={password}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword()}
        ></TextInput>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Button title="Login" onPress={signIn} />
            <Button title="Create account" onPress={signIn} />
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
