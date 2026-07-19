import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react-native";
import { useState } from "react";
import {
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { firebaseAuth } from "@/client/firebase";
import { supabase } from "@/client/supabase";
import { useSettingsStore } from "@/store/useSettingsStore";

function GoogleIcon() {
	return (
		<Svg width={20} height={20} viewBox="0 0 24 24">
			<Path
				d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
				fill="#4285F4"
			/>
			<Path
				d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
				fill="#34A853"
			/>
			<Path
				d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
				fill="#FBBC05"
			/>
			<Path
				d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
				fill="#EA4335"
			/>
		</Svg>
	);
}

function GitHubIcon() {
	return (
		<Svg width={20} height={20} viewBox="0 0 24 24" fill="white">
			<Path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
		</Svg>
	);
}

export default function SignInScreen() {
	const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const backend = useSettingsStore((s) => s.backend);
	const insets = useSafeAreaInsets();

	const handleLogin = async () => {
		if (!email || !password) {
			setError("Please enter your email and password.");
			return;
		}
		setLoading(true);
		setError("");
		try {
			if (backend === "firebase") {
				await signInWithEmailAndPassword(firebaseAuth, email, password);
			} else {
				const { error: err } = await supabase.auth.signInWithPassword({
					email,
					password,
				});
				if (err) throw new Error(err.message);
			}
			router.replace("/home");
		} catch (e: unknown) {
			setError(
				e instanceof Error ? e.message : "Login failed. Please try again.",
			);
		} finally {
			setLoading(false);
		}
	};

	const handleGuestContinue = () => {
		router.replace("/home");
	};

	return (
		<KeyboardAvoidingView
			behavior={process.env.EXPO_OS === "ios" ? "padding" : "height"}
			style={{ flex: 1, backgroundColor: "#0A1628" }}
		>
			<StatusBar style="light" />
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					paddingHorizontal: 24,
					paddingTop: insets.top + 16,
					paddingBottom: insets.bottom + 32,
				}}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				{/* PACKETFLOW badge */}
				<View style={{ alignItems: "center", marginBottom: 28 }}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 8,
							paddingHorizontal: 16,
							paddingVertical: 8,
							borderRadius: 999,
							borderWidth: 1,
							borderColor: "#1E3A5F",
							backgroundColor: "#0D2040",
						}}
					>
						<View
							style={{
								width: 8,
								height: 8,
								borderRadius: 4,
								backgroundColor: "#00B4FF",
							}}
						/>
						<Text
							style={{
								color: "#E0F0FF",
								fontSize: 12,
								fontWeight: "700",
								letterSpacing: 2,
							}}
						>
							PACKETFLOW
						</Text>
					</View>
				</View>

				{/* Title */}
				<View style={{ alignItems: "center", marginBottom: 32, gap: 8 }}>
					<Text
						style={{
							color: "#FFFFFF",
							fontSize: 30,
							fontWeight: "800",
							letterSpacing: -0.5,
						}}
					>
						Welcome Back
					</Text>
					<Text style={{ color: "#64748B", fontSize: 14 }}>
						Sign in to continue your cosmic journey
					</Text>
				</View>

				{/* Sign In / Sign Up tabs */}
				<View
					style={{
						flexDirection: "row",
						backgroundColor: "#0F1E33",
						borderRadius: 16,
						padding: 4,
						marginBottom: 24,
					}}
				>
					<Pressable
						onPress={() => setActiveTab("signin")}
						style={{
							flex: 1,
							paddingVertical: 12,
							borderRadius: 13,
							alignItems: "center",
							backgroundColor:
								activeTab === "signin" ? "#00B4FF" : "transparent",
						}}
					>
						<Text
							style={{
								color: activeTab === "signin" ? "#fff" : "#64748B",
								fontWeight: "700",
								fontSize: 15,
							}}
						>
							Sign In
						</Text>
					</Pressable>
					<Pressable
						onPress={() => {
							setActiveTab("signup");
							router.push("/(auth)/register");
						}}
						style={{
							flex: 1,
							paddingVertical: 12,
							borderRadius: 13,
							alignItems: "center",
							backgroundColor:
								activeTab === "signup" ? "#00B4FF" : "transparent",
						}}
					>
						<Text
							style={{
								color: activeTab === "signup" ? "#fff" : "#64748B",
								fontWeight: "700",
								fontSize: 15,
							}}
						>
							Sign Up
						</Text>
					</Pressable>
				</View>

				{/* Social buttons */}
				<View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
					<Pressable
						style={{
							flex: 1,
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							gap: 10,
							paddingVertical: 14,
							borderRadius: 14,
							backgroundColor: "#0F1E33",
							borderWidth: 1,
							borderColor: "#1E3A5F",
						}}
					>
						<GoogleIcon />
						<Text style={{ color: "#CBD5E1", fontWeight: "600", fontSize: 14 }}>
							Google
						</Text>
					</Pressable>
					<Pressable
						style={{
							flex: 1,
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							gap: 10,
							paddingVertical: 14,
							borderRadius: 14,
							backgroundColor: "#0F1E33",
							borderWidth: 1,
							borderColor: "#1E3A5F",
						}}
					>
						<GitHubIcon />
						<Text style={{ color: "#CBD5E1", fontWeight: "600", fontSize: 14 }}>
							GitHub
						</Text>
					</Pressable>
				</View>

				{/* Divider */}
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 12,
						marginBottom: 20,
					}}
				>
					<View style={{ flex: 1, height: 1, backgroundColor: "#1E293B" }} />
					<Text style={{ color: "#475569", fontSize: 13 }}>
						or continue with email
					</Text>
					<View style={{ flex: 1, height: 1, backgroundColor: "#1E293B" }} />
				</View>

				{/* Error */}
				{error ? (
					<Text
						style={{
							color: "#F87171",
							fontSize: 13,
							marginBottom: 12,
							textAlign: "center",
						}}
					>
						{error}
					</Text>
				) : null}

				{/* Email field */}
				<View style={{ gap: 6, marginBottom: 14 }}>
					<Text style={{ color: "#F1F5F9", fontSize: 14, fontWeight: "600" }}>
						Email Address
					</Text>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 12,
							backgroundColor: "#0D1829",
							borderRadius: 14,
							borderWidth: 1,
							borderColor: "#1E3A5F",
							paddingHorizontal: 14,
							paddingVertical: 14,
						}}
					>
						<Mail size={18} color="#475569" />
						<TextInput
							value={email}
							onChangeText={setEmail}
							placeholder="Enter Email Address"
							placeholderTextColor="#334155"
							keyboardType="email-address"
							autoCapitalize="none"
							autoCorrect={false}
							style={{ flex: 1, color: "#F8FAFC", fontSize: 14 }}
						/>
					</View>
				</View>

				{/* Password field */}
				<View style={{ gap: 6, marginBottom: 8 }}>
					<Text style={{ color: "#F1F5F9", fontSize: 14, fontWeight: "600" }}>
						Password
					</Text>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 12,
							backgroundColor: "#0D1829",
							borderRadius: 14,
							borderWidth: 1,
							borderColor: "#1E3A5F",
							paddingHorizontal: 14,
							paddingVertical: 14,
						}}
					>
						<Lock size={18} color="#475569" />
						<TextInput
							value={password}
							onChangeText={setPassword}
							placeholder="••••••••"
							placeholderTextColor="#475569"
							secureTextEntry={!showPassword}
							style={{
								flex: 1,
								color: "#F8FAFC",
								fontSize: 15,
								letterSpacing: showPassword ? 0 : 2,
							}}
						/>
						<Pressable onPress={() => setShowPassword((v) => !v)}>
							{showPassword ? (
								<EyeOff size={18} color="#475569" />
							) : (
								<Eye size={18} color="#475569" />
							)}
						</Pressable>
					</View>
				</View>

				{/* Forgot password */}
				<View style={{ alignItems: "flex-end", marginBottom: 24 }}>
					<Link href="/(auth)/forgot-password" asChild>
						<Pressable>
							<Text
								style={{ color: "#00B4FF", fontSize: 13, fontWeight: "600" }}
							>
								Forgot password?
							</Text>
						</Pressable>
					</Link>
				</View>

				{/* Sign In button */}
				<Pressable
					onPress={handleLogin}
					disabled={loading}
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						gap: 10,
						backgroundColor: "#00B4FF",
						borderRadius: 16,
						paddingVertical: 16,
						marginBottom: 12,
						opacity: loading ? 0.7 : 1,
						shadowColor: "#00B4FF",
						shadowOpacity: 0.35,
						shadowRadius: 12,
						shadowOffset: { width: 0, height: 4 },
					}}
				>
					<Text
						style={{
							color: "#fff",
							fontWeight: "800",
							fontSize: 16,
							letterSpacing: 0.3,
						}}
					>
						{loading ? "Signing in..." : "Sign In"}
					</Text>
					{!loading && <ArrowRight size={18} color="#fff" />}
				</Pressable>

				{/* Continue as Guest */}
				<Pressable
					onPress={handleGuestContinue}
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						gap: 10,
						borderRadius: 16,
						paddingVertical: 15,
						marginBottom: 24,
						borderWidth: 1.5,
						borderColor: "#1E3A5F",
						borderStyle: "dashed",
					}}
				>
					<User size={16} color="#64748B" />
					<Text style={{ color: "#94A3B8", fontWeight: "600", fontSize: 15 }}>
						Continue as Guest
					</Text>
				</Pressable>

				{/* Sign Up link */}
				<View
					style={{ flexDirection: "row", justifyContent: "center", gap: 4 }}
				>
					<Text style={{ color: "#64748B", fontSize: 14 }}>
						Don't have an account?
					</Text>
					<Link href="/(auth)/register" asChild>
						<Pressable>
							<Text
								style={{
									color: "#00B4FF",
									fontSize: 14,
									fontWeight: "700",
								}}
							>
								Sign Up
							</Text>
						</Pressable>
					</Link>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
