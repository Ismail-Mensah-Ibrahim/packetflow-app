import React, { useEffect } from "react";
import { View } from "react-native";
import { Svg, Path, Circle, Text as SvgText, Rect } from "react-native-svg";
import Animated, {
	useSharedValue,
	useAnimatedProps,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import { NetworkNode, NetworkEdge, PacketType } from "@/types";
import { CABLE_COLORS, CANVAS_SIZE, NODE_SIZE } from "@/lib/constants";

// Packet-type accent colours
const PACKET_COLORS: Record<string, string> = {
	icmp: "#34D399", // green
	tcp: "#60A5FA", // blue
	udp: "#F472B6", // pink
};

// ─── Animated flow dot along a quadratic bezier ──────────────────────────────
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function FlowDot({
	x1,
	y1,
	cpx,
	cpy,
	x2,
	y2,
	color,
	offset,
	duration,
	large,
}: {
	x1: number;
	y1: number;
	cpx: number;
	cpy: number;
	x2: number;
	y2: number;
	color: string;
	offset: number;
	duration: number;
	large?: boolean;
}) {
	const t = useSharedValue(offset);

	useEffect(() => {
		t.value = offset;
		t.value = withRepeat(withTiming(offset + 1, { duration }), -1, false);
	}, [duration, offset, t]);

	const animatedProps = useAnimatedProps(() => {
		const tv = t.value % 1;
		const inv = 1 - tv;
		const cx = inv * inv * x1 + 2 * inv * tv * cpx + tv * tv * x2;
		const cy = inv * inv * y1 + 2 * inv * tv * cpy + tv * tv * y2;
		return { cx, cy };
	});

	return (
		<AnimatedCircle
			animatedProps={animatedProps}
			r={large ? 5.5 : 3.5}
			fill={color}
			opacity={large ? 0.95 : 0.9}
		/>
	);
}

// ─── Edge (Bezier) ────────────────────────────────────────────────────────────
export function EdgeLine({
	edge,
	nodes,
	showLabels,
	selected,
	onPress,
	onLongPress,
	simulationMode,
	packetType,
	isTracePath,
}: {
	edge: NetworkEdge;
	nodes: NetworkNode[];
	showLabels: boolean;
	selected: boolean;
	onPress: () => void;
	onLongPress: () => void;
	simulationMode: boolean;
	packetType: PacketType;
	isTracePath?: boolean;
}) {
	const src = nodes.find((n) => n.id === edge.source);
	const tgt = nodes.find((n) => n.id === edge.target);
	if (!src || !tgt) return null;

	const half = NODE_SIZE / 2;
	const x1 = src.x + half;
	const y1 = src.y + half;
	const x2 = tgt.x + half;
	const y2 = tgt.y + half;
	const midX = (x1 + x2) / 2;
	const midY = (y1 + y2) / 2;
	const ctrlOffset = Math.min(Math.abs(x2 - x1), Math.abs(y2 - y1)) * 0.4;
	const cpx = midX;
	const cpy = midY - ctrlOffset;
	const d = `M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`;

	const color = isTracePath
		? "#FBBF24"
		: selected
			? "#22D3EE"
			: (CABLE_COLORS[edge.cable_type] ?? "#3B82F6");
	const isActive = edge.status === "active";
	const dist = Math.hypot(x2 - x1, y2 - y1);
	const dotDuration = Math.max(900, dist * 3.5);

	return (
		<Svg
			style={{ position: "absolute", top: 0, left: 0 }}
			width={CANVAS_SIZE}
			height={CANVAS_SIZE}
		>
			{/* Hit target: 30px transparent stroke for easier tapping (Phase 2 requirement) */}
			<Path
				d={d}
				stroke="transparent"
				strokeWidth={30}
				fill="none"
				onPress={onPress}
				onLongPress={onLongPress}
			/>
			{/* Glow: trace path (amber) or selected (cyan) */}
			{(isTracePath || selected) && (
				<Path
					d={d}
					stroke={color}
					strokeWidth={isTracePath ? 10 : 6}
					fill="none"
					opacity={isTracePath ? 0.35 : 0.18}
				/>
			)}
			<Path
				d={d}
				stroke={color}
				strokeWidth={isTracePath ? 3 : selected ? 2.5 : 1.8}
				fill="none"
				strokeDasharray={!isActive ? "6,4" : undefined}
				opacity={!isActive ? 0.45 : 1}
			/>
			{/* Animated data-flow dots — active edges always, ALL edges in sim mode */}
			{(isActive || simulationMode) &&
				(() => {
					const dotColor = simulationMode
						? (PACKET_COLORS[packetType] ?? color)
						: color;
					const speed = simulationMode ? Math.max(500, dist * 2) : dotDuration;
					const count = simulationMode ? 5 : 3;
					return Array.from({ length: count }, (_, i) => (
						<FlowDot
							key={i}
							x1={x1}
							y1={y1}
							cpx={cpx}
							cpy={cpy}
							x2={x2}
							y2={y2}
							color={dotColor}
							offset={i / count}
							duration={speed}
							large={simulationMode}
						/>
					));
				})()}
			{showLabels && (
				<SvgText
					x={midX}
					y={cpy - 6}
					fill={color}
					fontSize={11}
					fontWeight="600"
					textAnchor="middle"
				>
					{edge.cable_type}
				</SvgText>
			)}
			{/* VLAN badge — shown whenever vlan_id is set, regardless of showLabels */}
			{edge.vlan_id !== undefined && (
				<>
					<Rect
						x={midX - 18}
						y={midY - 10}
						width={36}
						height={16}
						rx={4}
						ry={4}
						fill="#1E293B"
						stroke="#6366F1"
						strokeWidth={1}
					/>
					<SvgText
						x={midX}
						y={midY + 3}
						fill="#A5B4FC"
						fontSize={9}
						fontWeight="700"
						textAnchor="middle"
					>
						{`V${edge.vlan_id}`}
					</SvgText>
				</>
			)}
		</Svg>
	);
}

export const MemoEdgeLine = React.memo(EdgeLine, (prev, next) => {
	return (
		prev.edge === next.edge &&
		prev.selected === next.selected &&
		prev.showLabels === next.showLabels &&
		prev.simulationMode === next.simulationMode &&
		prev.isTracePath === next.isTracePath
	);
});
