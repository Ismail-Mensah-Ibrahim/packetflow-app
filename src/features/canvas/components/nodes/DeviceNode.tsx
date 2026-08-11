import React, { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import { DeviceIcon, getDeviceColor } from "@/components/DeviceIcon";
import { NODE_SIZE } from "@/lib/constants";
import type { NetworkNode } from "@/types";

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
	onDragEnd: (
		id: string,
		newX: number,
		newY: number,
		deltaX: number,
		deltaY: number,
	) => void;
}) {
	const tx = useSharedValue(node.x);
	const ty = useSharedValue(node.y);
	const startX = useSharedValue(0);
	const startY = useSharedValue(0);
	// Stable refs for callbacks — prevents stale closures inside gesture handlers
	// while keeping gesture objects stable across renders.
	const onDragEndRef = useRef(onDragEnd);
	const onTapRef = useRef(onTap);
	const nodeRef = useRef(node);

	// Keep refs up to date on every render (no re-creation of gestures needed).
	useEffect(() => {
		onDragEndRef.current = onDragEnd;
	}, [onDragEnd]);

	useEffect(() => {
		onTapRef.current = onTap;
	}, [onTap]);

	useEffect(() => {
		nodeRef.current = node;
	}, [node]);

	// Sync shared values when node position changes externally (e.g., undo/redo).
	useEffect(() => {
		tx.value = node.x;
		ty.value = node.y;
	}, [node.x, node.y, tx, ty]);

	// Stable bridge functions — these are the JS-thread callbacks called via
	// runOnJS. They read from refs so they always see the latest values without
	// needing the gesture objects to be recreated.
	const stableDragEnd = useRef((newX: number, newY: number) => {
		const n = nodeRef.current;
		onDragEndRef.current(n.id, newX, newY, newX - n.x, newY - n.y);
	});

	const stableTap = useRef(() => {
		onTapRef.current();
	});

	// Gestures are created ONCE per component lifetime (empty dep array equivalent).
	// They reference only shared values (UI thread) and stable ref-backed functions.
	const dragGesture = useRef(
		Gesture.Pan()
			.onStart(() => {
				startX.value = tx.value;
				startY.value = ty.value;
			})
			.onUpdate((e) => {
				tx.value = startX.value + e.translationX;
				ty.value = startY.value + e.translationY;
			})
			.onEnd(() => {
				runOnJS(stableDragEnd.current)(tx.value, ty.value);
			})
			.minDistance(5),
	).current;

	const tapGesture = useRef(
		Gesture.Tap().onEnd(() => {
			runOnJS(stableTap.current)();
		}),
	).current;

	const gesture = useRef(Gesture.Simultaneous(tapGesture, dragGesture)).current;

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
