export default function(handles, image = {}) {
  // // Calculate the long axis length
  // const dx =
  //   (handles.start.x - handles.end.x) * (image.columnPixelSpacing || 1);
  // const dy = (handles.start.y - handles.end.y) * (image.rowPixelSpacing || 1);
  // const length = Math.sqrt(dx * dx + dy * dy) || 0;

  // Calculate the short axis length
  const wx =
    (handles.perpendicularStart.x - handles.perpendicularEnd.x) *
    (image.columnPixelSpacing || 1);
  const wy =
    (handles.perpendicularStart.y - handles.perpendicularEnd.y) *
    (image.rowPixelSpacing || 1);
  const width = Math.sqrt(wx * wx + wy * wy) || 0;

  const swx =
    (handles.secondPerpendicularStart.x - handles.secondPerpendicularEnd.x) *
    (image.columnPixelSpacing || 1);
  const swy =
    (handles.secondPerpendicularStart.y - handles.secondPerpendicularEnd.y) *
    (image.rowPixelSpacing || 1);
  const swidth = Math.sqrt(swx * swx + swy * swy) || 0;

  return {
    firstPerpendicularLength: width.toFixed(1),
    secondPerpendicularLength: swidth.toFixed(1),
  };
}
