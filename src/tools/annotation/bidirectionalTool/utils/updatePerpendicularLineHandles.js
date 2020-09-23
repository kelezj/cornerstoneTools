import getLineVector from './getLineVector';

/**
 * Update the perpendicular line handles when the measurement is being created.
 * This method will make the perpendicular line intersect in the middle of the
 * long line and assume half the size of the long line.
 *
 * @param {*} eventData Data object associated with the event
 * @param {*} measurementData Data from current bidirectional tool measurement
 *
 * @returns {boolean} False in case the handle is not locked or true when moved
 */
export default function updatePerpendicularLineHandles(
  eventData,
  measurementData
) {
  if (!measurementData.handles.perpendicularStart.locked) {
    return false;
  }

  let startX,
    startY,
    endX,
    endY,
    secondStartX,
    secondStartY,
    secondEndX,
    secondEndY;

  const { start, end } = measurementData.handles;
  const { columnPixelSpacing = 1, rowPixelSpacing = 1 } = eventData.image;

  if (start.x === end.x && start.y === end.y) {
    // 刚开始启点
    startX = start.x;
    startY = start.y;
    endX = end.x;
    endY = end.y;

    secondStartX = start.x;
    secondStartY = start.y;
    secondEndX = end.x;
    secondEndY = end.y;
  } else {
    // Mid point of long-axis line
    // const mid = {
    //   x: (start.x + end.x) / 2,
    //   y: (start.y + end.y) / 2,
    // };

    const distance = {
      x: (end.x - start.x) / 3,
      y: (end.y - start.y) / 3,
    };

    // Inclination of the perpendicular line
    const vector = getLineVector(
      columnPixelSpacing,
      rowPixelSpacing,
      start,
      end
    );

    const perpendicularLineLength = vector.length / 2;
    const rowMultiplier = perpendicularLineLength / (2 * rowPixelSpacing);
    const columnMultiplier = perpendicularLineLength / (2 * columnPixelSpacing);

    startX = start.x + distance.x + columnMultiplier * vector.y;
    startY = start.y + distance.y - rowMultiplier * vector.x;
    endX = start.x + distance.x - columnMultiplier * vector.y;
    endY = start.y + distance.y + rowMultiplier * vector.x;

    secondStartX = start.x + distance.x * 2 + columnMultiplier * vector.y;
    secondStartY = start.y + distance.y * 2 - rowMultiplier * vector.x;
    secondEndX = start.x + distance.x * 2 - columnMultiplier * vector.y;
    secondEndY = start.y + distance.y * 2 + rowMultiplier * vector.x;
  }

  measurementData.handles.perpendicularStart.x = startX;
  measurementData.handles.perpendicularStart.y = startY;
  measurementData.handles.perpendicularEnd.x = endX;
  measurementData.handles.perpendicularEnd.y = endY;

  measurementData.handles.secondPerpendicularStart.x = secondStartX;
  measurementData.handles.secondPerpendicularStart.y = secondStartY;
  measurementData.handles.secondPerpendicularEnd.x = secondEndX;
  measurementData.handles.secondPerpendicularEnd.y = secondEndY;

  return true;
}
