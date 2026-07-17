import {
	ChevronDown,
	ChevronRight,
	Layers,
	MonitorSmartphone,
	Plug2,
	Search,
	X,
} from "lucide-react-native";
import { useState } from "react";
import {
	FlatList,
	Pressable,
	Text,
	TextInput,
	useWindowDimensions,
	View,
} from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { DeviceIcon, getDeviceColor } from "@/components/DeviceIcon";
import {
	CABLE_COLORS,
	CABLE_LABELS,
	DEVICE_CATALOG,
	DEVICE_CATEGORIES,
} from "@/lib/constants";
import { useCanvasStore } from "@/store/useCanvasStore";
import type { CableType, DeviceType } from "@/types";

interface DeviceDrawerProps {
	onClose: () => void;
	onAddDevice: (type: DeviceType) => void;
	onStartConnect: () => void;
}

type Tab = "devices" | "cables";

export function DeviceDrawer({
	onClose,
	onAddDevice,
	onStartConnect,
}: DeviceDrawerProps) {
	const [activeTab, setActiveTab] = useState<Tab>("devices");
	const [search, setSearch] = useState("");
	const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
		new Set(["End Devices", "Routers", "Switches / L1"]),
	);

	const { width } = useWindowDimensions();
	const isMobile = width < 768;

	const toggleCategory = (cat: string) => {
		setExpandedCategories((prev) => {
			const next = new Set(prev);
			if (next.has(cat)) {
				next.delete(cat);
			} else {
				next.add(cat);
			}
			return next;
		});
	};

	const filteredDevices = search.trim()
		? DEVICE_CATALOG.filter(
				(d) =>
					d.label.toLowerCase().includes(search.toLowerCase()) ||
					d.description.toLowerCase().includes(search.toLowerCase()),
			)
		: null;

	const renderDeviceItem = (device: (typeof DEVICE_CATALOG)[0]) => {
		const color = getDeviceColor(device.type);
		return (
			<Pressable
				key={device.type}
				onPress={() => onAddDevice(device.type)}
				className="active:opacity-60"
				style={{
					flex: 1,
					minWidth: "45%",
					flexDirection: "row",
					alignItems: "center",
					gap: 12,
					padding: 12,
					margin: 4,
					backgroundColor: "#1E293B",
					borderRadius: 16,
					borderWidth: 1,
					borderColor: "#334155",
				}}
			>
				<View
					style={{
						width: 44,
						height: 44,
						borderRadius: 12,
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: `${color}18`,
						borderWidth: 1.5,
						borderColor: `${color}30`,
					}}
				>
					<DeviceIcon
						type={device.type}
						size={28}
						bgColor="transparent"
						color={color}
					/>
				</View>
				<View style={{ flex: 1 }}>
					<Text
						style={{
							color: "#F8FAFC",
							fontSize: 14,
							fontWeight: "700",
						}}
						numberOfLines={1}
					>
						{device.label}
					</Text>
					<Text style={{ color: "#94A3B8", fontSize: 11 }} numberOfLines={1}>
						{device.description}
					</Text>
				</View>
				<View
					style={{
						width: 28,
						height: 28,
						borderRadius: 14,
						backgroundColor: "#0F172A",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Text
						style={{
							color: "#38BDF8",
							fontSize: 18,
							fontWeight: "400",
							lineHeight: 20,
						}}
					>
						+
					</Text>
				</View>
			</Pressable>
		);
	};

	const renderCableItem = (cableType: string) => {
		const color = CABLE_COLORS[cableType] || "#3B82F6";
		return (
			<Pressable
				key={cableType}
				onPress={() => {
					// When a cable is selected, start connect mode.
					onStartConnect();
					onClose();
				}}
				className="active:opacity-60"
				style={{
					flex: 1,
					minWidth: "45%",
					flexDirection: "row",
					alignItems: "center",
					gap: 12,
					padding: 12,
					margin: 4,
					backgroundColor: "#1E293B",
					borderRadius: 16,
					borderWidth: 1,
					borderColor: "#334155",
				}}
			>
				<View
					style={{
						width: 44,
						height: 44,
						borderRadius: 12,
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: `${color}18`,
						borderWidth: 1.5,
						borderColor: `${color}30`,
					}}
				>
					<Plug2 size={24} color={color} />
				</View>
				<View style={{ flex: 1 }}>
					<Text
						style={{
							color: "#F8FAFC",
							fontSize: 14,
							fontWeight: "700",
						}}
					>
						{CABLE_LABELS[cableType] || cableType}
					</Text>
				</View>
				<View
					style={{
						width: 28,
						height: 28,
						borderRadius: 14,
						backgroundColor: "#0F172A",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Text
						style={{
							color: "#38BDF8",
							fontSize: 18,
							fontWeight: "400",
							lineHeight: 20,
						}}
					>
						+
					</Text>
				</View>
			</Pressable>
		);
	};

	return (
		<Animated.View
			entering={SlideInDown.springify().damping(20).stiffness(150)}
			style={{
				position: "absolute",
				bottom: isMobile ? 0 : 20,
				left: isMobile ? 0 : 20,
				right: isMobile ? 0 : undefined,
				width: isMobile ? "100%" : 420,
				height: isMobile ? "85%" : 650,
				backgroundColor: "#0B1220",
				borderRadius: isMobile ? 0 : 24,
				borderTopLeftRadius: 24,
				borderTopRightRadius: 24,
				shadowColor: "#000",
				shadowOpacity: 0.6,
				shadowRadius: 30,
				shadowOffset: { width: 0, height: 10 },
				elevation: 20,
				borderWidth: 1,
				borderColor: "#1E293B",
				overflow: "hidden",
			}}
		>
			{/* Header */}
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					padding: 20,
					borderBottomWidth: 1,
					borderBottomColor: "#1E293B",
					backgroundColor: "#0F172A",
				}}
			>
				<View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
					<View
						style={{
							width: 40,
							height: 40,
							borderRadius: 12,
							backgroundColor: "#1E293B",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Layers size={22} color="#38BDF8" />
					</View>
					<View>
						<Text style={{ color: "#F8FAFC", fontSize: 18, fontWeight: "700" }}>
							Network Tools
						</Text>
						<Text style={{ color: "#94A3B8", fontSize: 13, marginTop: 2 }}>
							Tap to add to canvas
						</Text>
					</View>
				</View>
				<Pressable
					onPress={onClose}
					className="active:opacity-50"
					style={{
						width: 36,
						height: 36,
						borderRadius: 18,
						backgroundColor: "#1E293B",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<X size={20} color="#94A3B8" />
				</Pressable>
			</View>

			{/* Tabs */}
			<View style={{ flexDirection: "row", padding: 16, gap: 12 }}>
				<Pressable
					onPress={() => setActiveTab("devices")}
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						gap: 8,
						paddingVertical: 12,
						backgroundColor: activeTab === "devices" ? "#38BDF8" : "#1E293B",
						borderRadius: 12,
					}}
				>
					<MonitorSmartphone
						size={18}
						color={activeTab === "devices" ? "#0F172A" : "#94A3B8"}
					/>
					<Text
						style={{
							color: activeTab === "devices" ? "#0F172A" : "#94A3B8",
							fontWeight: "700",
							fontSize: 14,
						}}
					>
						Devices ({DEVICE_CATALOG.length})
					</Text>
				</Pressable>
				<Pressable
					onPress={() => setActiveTab("cables")}
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						gap: 8,
						paddingVertical: 12,
						backgroundColor: activeTab === "cables" ? "#38BDF8" : "#1E293B",
						borderRadius: 12,
					}}
				>
					<Plug2
						size={18}
						color={activeTab === "cables" ? "#0F172A" : "#94A3B8"}
					/>
					<Text
						style={{
							color: activeTab === "cables" ? "#0F172A" : "#94A3B8",
							fontWeight: "700",
							fontSize: 14,
						}}
					>
						Cables ({Object.keys(CABLE_LABELS).length})
					</Text>
				</Pressable>
			</View>

			{/* Search */}
			<View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						backgroundColor: "#1E293B",
						borderRadius: 12,
						paddingHorizontal: 16,
						height: 48,
						borderWidth: 1,
						borderColor: "#334155",
					}}
				>
					<Search size={20} color="#64748B" />
					<TextInput
						placeholder="Search tools..."
						placeholderTextColor="#64748B"
						value={search}
						onChangeText={setSearch}
						style={{
							flex: 1,
							marginLeft: 12,
							color: "#F8FAFC",
							fontSize: 15,
							outlineStyle: "none" as any,
						}}
					/>
					{search ? (
						<Pressable onPress={() => setSearch("")}>
							<X size={18} color="#64748B" />
						</Pressable>
					) : null}
				</View>
			</View>

			{/* Content */}
			<FlatList
				data={
					activeTab === "devices"
						? filteredDevices
							? [
									{
										label: "Search Results",
										types: filteredDevices.map((d) => d.type),
									},
								]
							: DEVICE_CATEGORIES
						: [{ label: "All Cables", types: Object.keys(CABLE_LABELS) }]
				}
				keyExtractor={(item) => item.label}
				contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 100 }}
				renderItem={({ item }) => {
					// We only show matching devices for this category
					const categoryDevices = item.types
						.map((type) => {
							if (activeTab === "devices") {
								return DEVICE_CATALOG.find((d) => d.type === type);
							}
							return type; // It's a string for cables
						})
						.filter(Boolean);

					if (categoryDevices.length === 0) return null;

					const isExpanded = expandedCategories.has(item.label) || !!search;

					return (
						<View style={{ marginBottom: 12 }}>
							<Pressable
								onPress={() => toggleCategory(item.label)}
								style={{
									flexDirection: "row",
									alignItems: "center",
									padding: 12,
									backgroundColor: "#1E293B",
									borderRadius: 12,
									marginBottom: isExpanded ? 8 : 0,
								}}
							>
								<Text
									style={{
										flex: 1,
										color: "#F8FAFC",
										fontSize: 13,
										fontWeight: "700",
										letterSpacing: 0.5,
										textTransform: "uppercase",
									}}
								>
									{item.label} ({categoryDevices.length})
								</Text>
								{isExpanded ? (
									<ChevronDown size={18} color="#94A3B8" />
								) : (
									<ChevronRight size={18} color="#94A3B8" />
								)}
							</Pressable>

							{isExpanded && (
								<View
									style={{
										flexDirection: "row",
										flexWrap: "wrap",
										justifyContent: "space-between",
									}}
								>
									{categoryDevices.map((d: any) =>
										activeTab === "devices"
											? renderDeviceItem(d)
											: renderCableItem(d),
									)}
								</View>
							)}
						</View>
					);
				}}
			/>
		</Animated.View>
	);
}
