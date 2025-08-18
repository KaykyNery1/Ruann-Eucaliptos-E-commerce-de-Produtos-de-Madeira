import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Trees } from "lucide-react";
import { auth, googleProvider } from "../firebase"; // ← IMPORTA CORRETAMENTE
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";

    if (!formData.password) newErrors.password = "Senha é obrigatória";
    else if (formData.password.length < 6) newErrors.password = "Senha deve ter pelo menos 6 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("Usuário logado:", userCredential.user);
      alert("Login realizado com sucesso!");
    } catch (error: any) {
      console.error("Erro no login:", error.message);
      alert("Falha no login: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    if (provider === "Google") {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Usuário logado com Google:", result.user);
        alert("Login com Google realizado com sucesso!");
      } catch (error: any) {
        console.error("Erro login Google:", error.message);
        alert("Falha no login com Google: " + error.message);
      }
    }
  };

  // ======================
  // O resto do código é layout/HTML do login
  // ======================
  // Cole todo o layout que eu te enviei anteriormente aqui
};

export default Login;
