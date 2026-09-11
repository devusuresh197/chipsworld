/**
 * Spatial Relationship Analysis Utility for Chip Gossip Network
 * Analyzes Grounding DINO detection bounding boxes [x1, y1, x2, y2]
 * to extract spatial relationships, cluster density, edge proximity, and pairwise distances.
 */

export function analyzeChipSpatialData(chips = [], imageSize = { width: 800, height: 600 }) {
  if (!chips || chips.length === 0) {
    return {
      chipsWithSpatial: [],
      edgeChips: [],
      isolatedChips: [],
      clusterChips: [],
      blockingPairs: [],
      largestChip: null,
      smallestChip: null,
      brokenChips: [],
    };
  }

  const imgW = imageSize.width || 800;
  const imgH = imageSize.height || 600;
  const proximityThreshold = Math.min(imgW, imgH) * 0.28;

  // 1. Calculate centers, areas, and edge flags for each chip
  const spatialChips = chips.map((chip, idx) => {
    const [x1, y1, x2, y2] = chip.bbox || [0, 0, 100, 100];
    const w = Math.max(1, x2 - x1);
    const h = Math.max(1, y2 - y1);
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    const area = w * h;
    const aspectDistortion = Math.max(w / h, h / w);

    // Check proximity to image boundary (Edge life)
    const isNearEdge =
      x1 < imgW * 0.08 ||
      x2 > imgW * 0.92 ||
      y1 < imgH * 0.08 ||
      y2 > imgH * 0.92;

    return {
      ...chip,
      originalIndex: idx,
      cx,
      cy,
      w,
      h,
      area,
      aspectDistortion,
      isNearEdge,
      neighbors: [],
    };
  });

  // 2. Compute pairwise distances & neighbor lists
  for (let i = 0; i < spatialChips.length; i++) {
    for (let j = i + 1; j < spatialChips.length; j++) {
      const c1 = spatialChips[i];
      const c2 = spatialChips[j];
      const dist = Math.hypot(c1.cx - c2.cx, c1.cy - c2.cy);

      if (dist <= proximityThreshold) {
        c1.neighbors.push({ targetIndex: j, distance: dist, targetName: c2.name });
        c2.neighbors.push({ targetIndex: i, distance: dist, targetName: c1.name });
      }
    }
  }

  // 3. Size Rankings & Fragment Chips
  const sortedByArea = [...spatialChips].sort((a, b) => b.area - a.area);
  const largestChip = sortedByArea[0] || null;
  const smallestChip = sortedByArea[sortedByArea.length - 1] || null;
  const brokenChips = spatialChips.filter((c) => c.aspectDistortion > 1.65);

  // 4. Categorize Spatial Events
  const edgeChips = spatialChips.filter((c) => c.isNearEdge);
  const isolatedChips = spatialChips.filter((c) => c.neighbors.length === 0);
  const clusterChips = spatialChips.filter((c) => c.neighbors.length >= 2);

  // 5. Detect blocking / overlapping pairs (Chip A above Chip B in vertical stack)
  const blockingPairs = [];
  for (let i = 0; i < spatialChips.length; i++) {
    for (let j = 0; j < spatialChips.length; j++) {
      if (i === j) continue;
      const topChip = spatialChips[i];
      const bottomChip = spatialChips[j];

      // Top chip's bottom edge overlaps bottom chip's top edge
      if (
        topChip.cy < bottomChip.cy &&
        Math.abs(topChip.cx - bottomChip.cx) < (topChip.w + bottomChip.w) * 0.4 &&
        Math.abs(topChip.cy - bottomChip.cy) < (topChip.h + bottomChip.h) * 0.6
      ) {
        blockingPairs.push({ blocker: topChip, blocked: bottomChip });
      }
    }
  }

  return {
    chipsWithSpatial: spatialChips,
    edgeChips,
    isolatedChips,
    clusterChips,
    blockingPairs,
    largestChip,
    smallestChip,
    brokenChips,
  };
}
