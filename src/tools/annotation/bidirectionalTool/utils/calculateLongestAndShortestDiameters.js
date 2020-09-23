/**
 * Calculates longest and shortest diameters using measurement handles and pixelSpacing
 * @param  {Object} measurementData
 * @param {Object} pixelSpacing pixelSpacing
 *
 *@returns {Object} longestDiameter and shortestDiameter
 */
export default function calculateLongestAndShortestDiameters(
  measurementData,
  pixelSpacing
) {
  const { rowPixelSpacing, colPixelSpacing } = pixelSpacing;
  const {
    perpendicularStart,
    perpendicularEnd,
    secondPerpendicularStart,
    secondPerpendicularEnd,
  } = measurementData.handles;

  // // Calculate the long axis length
  // const dx = (start.x - end.x) * (colPixelSpacing || 1);
  // const dy = (start.y - end.y) * (rowPixelSpacing || 1);
  // const length = Math.sqrt(dx * dx + dy * dy);

  // Calculate the short axis length
  const wx =
    (perpendicularStart.x - perpendicularEnd.x) * (colPixelSpacing || 1);
  const wy =
    (perpendicularStart.y - perpendicularEnd.y) * (rowPixelSpacing || 1);
  let firstLength = Math.sqrt(wx * wx + wy * wy);

  if (!firstLength) {
    firstLength = 0;
  }

  const swx =
    (secondPerpendicularStart.x - secondPerpendicularEnd.x) *
    (colPixelSpacing || 1);
  const swy =
    (secondPerpendicularStart.y - secondPerpendicularEnd.y) *
    (rowPixelSpacing || 1);
  let secondLength = Math.sqrt(swx * swx + swy * swy);

  if (!secondLength) {
    secondLength = 0;
  }

  // // Length is always longer than width
  // if (width > length) {
  //   const tempW = width;
  //   const tempL = length;

  //   length = tempW;
  //   width = tempL;
  // }

  return {
    firstPerpendicularLength: firstLength.toFixed(1),
    secondPerpendicularLength: secondLength.toFixed(1),
  };
}
