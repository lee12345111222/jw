export default function BorderedBox({
  children,
  width,
  height,
  borderWidth = '2px',
  bgColor,
  borderColor,
  borderWeight = '2px'
}) {
  return (
    <div
      style={{
        boxSizing: 'content-box',
        backgroundColor: bgColor,
        position: 'relative',
        width: width || 'max-content'
      }}
    >
      <div
        style={{
          position: 'absolute',
          backgroundColor: bgColor,
          width: `calc(100% - ${borderWidth} * 2)`,
          height: borderWeight,
          borderTop: `solid ${borderWidth} ${borderColor}`,
          borderLeft: `solid ${borderWidth} ${borderColor}`,
          borderRight: `solid ${borderWidth} ${borderColor}`,
          borderBottom: 'none',
          top: `-${borderWeight}`
        }}
      ></div>

      <div
        style={{
          position: 'absolute',
          backgroundColor: bgColor,
          height: `calc(100% - ${borderWidth} * 2)`,
          width: borderWeight,
          borderTop: `solid ${borderWidth} ${borderColor}`,
          borderLeft: `solid ${borderWidth} ${borderColor}`,
          borderBottom: `solid ${borderWidth} ${borderColor}`,
          borderRight: 'none',
          left: `-${borderWeight}`
        }}
      ></div>

      <div
        style={{
          width: width,
          height: height
        }}
      >
        {children}
      </div>

      <div
        style={{
          position: 'absolute',
          backgroundColor: bgColor,
          height: `calc(100% - ${borderWidth} * 2)`,
          width: borderWeight,
          borderTop: `solid ${borderWidth} ${borderColor}`,
          borderBottom: `solid ${borderWidth} ${borderColor}`,
          borderRight: `solid ${borderWidth} ${borderColor}`,
          borderLeft: 'none',
          top: 0,
          right: `-${borderWeight}`
        }}
      ></div>

      <div
        style={{
          position: 'absolute',
          backgroundColor: bgColor,
          width: `calc(100% - ${borderWidth} * 2)`,
          height: borderWeight,
          borderBottom: `solid ${borderWidth} ${borderColor}`,
          borderRight: `solid ${borderWidth} ${borderColor}`,
          borderLeft: `solid ${borderWidth} ${borderColor}`,
          borderTop: 'none',
          bottom: `-${borderWeight}`
        }}
      ></div>
    </div>
  );
}
