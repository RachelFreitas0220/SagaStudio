import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

import CadastroScreen from "./app/(auth)/cadastro.tsx";
import LoginScreen from "./app/(auth)/login.tsx";
import HorariosScreen from "./app/(tabs)/HorarioScreen.tsx";
import HomeScreen from "./app/(tabs)/index";
import ScannerScreen from "./app/(tabs)/Scanner";

import { supabase } from "./app/supabase";

const Stack = createNativeStackNavigator();

export default function App() {
  // eslint-disable-next-line no-undef
  const [session, setSession] = (useState < Session) | (null > null);
  const [loading, setLoading] = useState(true);

  // 🔹 pega sessão atual
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 🔹 escuta mudanças (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setSession]);

  if (loading) return null;
  if (session) {
    console.log(session.user.email);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="cadastro"
          component={CadastroScreen}
          options={{ title: "Criar Conta" }}
        />

        <Stack.Screen
          name="index"
          component={HomeScreen}
          options={{ title: "Início" }}
        />

        <Stack.Screen
          name="Scanner"
          component={ScannerScreen}
          options={{ title: "Scanner" }}
        />

        <Stack.Screen
          name="horarios"
          component={HorariosScreen}
          options={{ title: "Horários" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
