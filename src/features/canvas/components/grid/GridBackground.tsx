import React from "react";
import { Svg, Line, G } from "react-native-svg";
import { CANVAS_SIZE, GRID_STEP } from "@/lib/constants";

export function GridBackground({ showGrid }: { showGrid: boolean }) {
	if (!showGrid) return null;
	const lines: React.ReactNode[] = [];
	for (let x = 0; x <= CANVAS_SIZE; x += GRID_STEP) {
		lines.push(
			<Line
				key={`v${x}`}
				x1={x}
				y1={0}
				x2={x}
				y2={CANVAS_SIZE}
				stroke="#334155"
				strokeWidth={0.5}
				opacity={0.4}
			/>,
		);
	}
	for (let y = 0; y <= CANVAS_SIZE; y += GRID_STEP) {
		lines.push(
			<Line
				key={`h${y}`}
				x1={0}
				y1={y}
				x2={CANVAS_SIZE}
				y2={y}
				stroke="#334155"
				strokeWidth={0.5}
				opacity={0.4}
			/>,
		);
	}
	return (
		<Svg
			width={CANVAS_SIZE}
			height={CANVAS_SIZE}
			style={{ position: "absolute" }}
		>
			<G>{lines}</G>
		</Svg>
	);
}
