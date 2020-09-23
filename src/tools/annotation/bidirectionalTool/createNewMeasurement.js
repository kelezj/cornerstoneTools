const getHandle = (x, y, index, extraAttributes = {}) =>
  Object.assign(
    {
      x,
      y,
      index,
      drawnIndependently: false,
      allowedOutsideImage: false,
      highlight: true,
      active: false,
    },
    extraAttributes
  );

export default function(mouseEventData) {
  const { x, y } = mouseEventData.currentPoints.image;
  // Create the measurement data for this tool with the end handle activated
  const measurementData = {
    toolType: this.name,
    isCreating: true,
    visible: true,
    active: true,
    invalidated: true,
    handles: {
      start: getHandle(x, y, 0),
      end: getHandle(x, y, 1, { active: true }),
      perpendicularStart: getHandle(x, y, 2, { locked: true }),
      perpendicularEnd: getHandle(x, y, 3, { locked: true }),
      textBox: getHandle(x - 50, y - 70, null, {
        highlight: false,
        hasMoved: true,
        active: false,
        movesIndependently: false,
        drawnIndependently: true,
        allowedOutsideImage: true,
        hasBoundingBox: true,
      }),
      secondPerpendicularStart: getHandle(x, y, 4, { locked: true }),
      secondPerpendicularEnd: getHandle(x, y, 5, { locked: true }),
      secondTextBox: getHandle(x - 50, y + 70, null, {
        highlight: false,
        hasMoved: true,
        active: false,
        movesIndependently: false,
        drawnIndependently: true,
        allowedOutsideImage: true,
        hasBoundingBox: true,
      }),
    },
    longestDiameter: 0,
    shortestDiameter: 0,
    firstPerpendicularLength: 0,
    secondPerpendicularLength: 0,
  };

  return measurementData;
}
