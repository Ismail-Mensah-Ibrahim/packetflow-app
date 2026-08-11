import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	runOnJS,
} from "react-native-reanimated";
import { NetworkNode } from "@/types";
import { NODE_SIZE } from "@/lib/constants";
import { getDeviceColor } from "@/lib/tracePacket";
import { DeviceIcon } from "@/components/DeviceIcon";

export function DeviceNode({
	node,
	selected,
	isConnecting,
	connectingFrom,
	onTap,
	onDragEnd,
}: {
	node: NetworkNode;
	selected: boolean;
	isConnecting: boolean;
	connectingFrom: string | null;
	onTap: () => void;
	onDragEnd: (id: string, newX: number, newY: number, deltaX: number, deltaY: number) => void;
}) {
	const tx = useSharedValue(node.x);
	const ty = useSharedValue(node.y);
	const startX = useSharedValue(0);
	const startY = useSharedValue(0);

	useEffect(() => {
		tx.value = node.x;
		ty.value = node.y;
	}, [node.x, node.y, tx, ty]);

	const dragGesture = Gesture.Pan()
		.onStart(() => {
			startX.value = tx.value;
			startY.value = ty.value;
		})
		.onUpdate((e) => {
			tx.value = startX.value + e.translationX;
			ty.value = startY.value + e.translationY;
		})
		.onEnd(() => {
			const deltaX = tx.value - node.x;
			const deltaY = ty.value - node.y;
			runOnJS(onDragEnd)(node.id, tx.value, ty.value, deltaX, deltaY);
		})
		.minDistance(5);

	const tapGesture = Gesture.Tap().onEnd(() => {
		runOnJS(onTap)();
	});

	const gesture = Gesture.Simultaneous(tapGesture, dragGesture);

	const animStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: tx.value }, { translateY: ty.value }] as any,
	}));

	const color = getDeviceColor(node.type);
	const isConnectingSource = connectingFrom === node.id;
	const isConnectingTarget =
		isConnecting && connectingFrom && connectingFrom !== node.id;

	return (
		<GestureDetector gesture={gesture}>
			<Animated.View
				style={[
					{ position: "absolute", width: NODE_SIZE, height: NODE_SIZE },
					animStyle,
				]}
			>
				<View
					style={{
						width: NODE_SIZE,
						height: NODE_SIZE,
						borderRadius: 14,
						borderWidth:
							selected || isConnectingSource ? 2 : isConnectingTarget ? 1.5 : 0,
						borderColor: isConnectingSource
							? "#22D3EE"
							: isConnectingTarget
								? "#F59E0B"
								: "#3B82F6",
						backgroundColor: "#1E293B",
						alignItems: "center",
						justifyContent: "center",
						shadowColor: color,
						shadowOpacity: selected ? 0.6 : 0.2,
						shadowRadius: selected ? 10 : 4,
						shadowOffset: { width: 0, height: 2 },
					}}
				>
					<DeviceIcon type={node.type} size={36} bgColor="transparent" />
				</View>
				<View
					style={{
						position: "absolute",
						top: NODE_SIZE + 4,
						left: "50%",
						transform: [{ translateX: -36 }],
						width: 72,
						alignItems: "center",
						gap: 2,
					}}
				>
					<View
						style={{
							backgroundColor: "rgba(11,18,32,0.82)",
							borderRadius: 6,
							paddingHorizontal: 5,
							paddingVertical: 2,
						}}
					>
						<Text
							style={{
								fontSize: 10,
								textAlign: "center",
								color: "#F1F5F9",
								fontWeight: "600",
								letterSpacing: 0.1,
							}}
							numberOfLines={1}
						>
							{node.hostname || node.label}
						</Text>
					</View>
					{!!node.ip_address && (
						<View
							style={{
								backgroundColor: "rgba(6,182,212,0.18)",
								borderRadius: 5,
								paddingHorizontal: 4,
								paddingVertical: 1,
								borderWidth: 0.5,
								borderColor: "rgba(6,182,212,0.4)",
							}}
						>
							<Text
								style={{
									fontSize: 8.5,
									textAlign: "center",
									color: "#67E8F9",
									fontFamily: "monospace",
								}}
								numberOfLines={1}
							>
								{node.ip_address}
							</Text>
						</View>
					)}
				</View>
			</Animated.View>
		</GestureDetector>
	);
}

export const MemoDeviceNode = React.memo(DeviceNode, (prev, next) => {
	return (
		prev.node === next.node &&
		prev.selected === next.selected &&
		prev.isConnecting === next.isConnecting &&
		prev.connectingFrom === next.connectingFrom
	);
});
