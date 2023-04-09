import {
  useCallback,
  useState,
  createContext,
  useContext,
  useMemo
} from 'react';
import classes from './index.module.css';

const countContext = createContext();
const { Provider } = countContext;

export const SwiperProvider = ({ children }) => {
  const state = useState(0);
  return <Provider value={state}>{children}</Provider>;
};

export default function Swiper({
  children,
  onEnd,
  duration = 0.24,
  width,
  height,
  background,
  itemWidth = '100%'
}) {
  const [count] = useContext(countContext);
  const { length } = children;

  const childs = useMemo(
    () =>
      children.map((child, index) => (
        <div
          key={index}
          className={classes['swiper-item']}
          style={{ width: itemWidth }}
        >
          {child}
        </div>
      )),
    [children, itemWidth]
  );

  return (
    <div className={classes.swiper} style={{ width, height, background }}>
      <div
        style={{
          marginLeft: `calc(${count - length} * ${itemWidth})`,
          marginRight: `calc(${
            (((-count + 1) / length) >> 0) * length
          } * ${itemWidth})`,
          transition: `margin-left ${duration}s ease-out`
        }}
        onTransitionEnd={onEnd}
      ></div>
      {childs}
      {childs}
    </div>
  );
}

export const Director = ({ children, type }) => {
  const [, setCount] = useContext(countContext);

  const handleChange = useCallback(() => {
    setCount((v) => (type === 'next' ? v - 1 : type === 'prev' ? v + 1 : v));
  }, [setCount, type]);

  return <div onClick={handleChange}>{children}</div>;
};
