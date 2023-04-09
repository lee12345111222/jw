import './style.css';

export default function BorderedBox({
  children,
  className,
  borderWidth: width,
  style: {
    border,
    borderStyle,
    borderColor,
    borderWidth,
    borderTop,
    borderTopStyle,
    borderTopColor,
    borderTopWidth,
    borderRight,
    borderRightStyle,
    borderRightColor,
    borderRightWidth,
    borderBottom,
    borderBottomStyle,
    borderBottomColor,
    borderBottomWidth,
    borderLeft,
    borderLeftStyle,
    borderLeftColor,
    borderLeftWidth,
    borderRadius,
    ...styles
  }
}) {
  return (
    <div className={className} style={{ ...styles, position: 'relative' }}>
      <div
        style={{
          border,
          borderWidth: width,
          height: width || '2px',
          width: width ? `calc(100% - 2 * ${width})` : 'calc(100% - 4px)',
          borderBottom: 'none',
          top: width ? `calc(-1 * ${width})` : '-2px'
        }}
        className="bordered-box-border"
      ></div>
      <div
        style={{
          border,
          borderWidth: width,
          height: width ? `calc(100% - 2 * ${width})` : 'calc(100% - 4px)',
          width: width || '2px',
          borderLeft: 'none',
          right: width ? `calc(-1 * ${width})` : '-2px'
        }}
        className="bordered-box-border"
      ></div>
      <div
        style={{
          border,
          borderWidth: width,
          height: width || '2px',
          width: width ? `calc(100% - 2 * ${width})` : 'calc(100% - 4px)',
          borderTop: 'none',
          bottom: width ? `calc(-1 * ${width})` : '-2px'
        }}
        className="bordered-box-border"
      ></div>
      <div
        style={{
          border,
          borderWidth: width,
          height: width ? `calc(100% - 2 * ${width})` : 'calc(100% - 4px)',
          width: width || '2px',
          borderRight: 'none',
          left: width ? `calc(-1 * ${width})` : '-2px'
        }}
        className="bordered-box-border"
      ></div>
      {children}
    </div>
  );
}
