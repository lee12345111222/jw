import { forwardRef, useCallback, useState, useEffect } from 'react';

import { Flex, Container } from '../index';

import styles from './index.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function CustomUpload({ onChange, error, ...props }, ref) {
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState();

  const handleChange = useCallback(
    (e) => {
      const files = e.target?.files || e?.dataTransfer.files;

      if (files && files[0]) {
        const file = [...files][0];
        setFile(file);
        ref.current.file = file;
        ref.current.value = null;
      }

      onChange?.(e);
    },
    [onChange, ref]
  );

  useEffect(() => {
    if (!file) {
      return setSrc();
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => setSrc(e.target.result);
  }, [file]);

  return (
    <Flex
      ai="center"
      jc="center"
      position="relative"
      className={cx('upload', { error })}
    >
      {src ? (
        <Container
          as="img"
          w="100"
          h="100"
          className={cx('img')}
          src={src}
          alt=""
        />
      ) : (
        <Icon className={cx('icon')} />
      )}
      <Container
        w="100"
        h="100"
        position="absolute"
        top="0"
        left="0"
        as="input"
        type="file"
        accept="image/png, image/jpeg"
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    </Flex>
  );
}

export const Upload = forwardRef(CustomUpload);

const Icon = ({ className }) => (
  <svg
    className={className}
    width="38"
    height="34"
    viewBox="0 0 38 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.4688 22.8863L15.065 12.48C14.9532 12.298 14.7966 12.1477 14.6101 12.0434C14.4237 11.9392 14.2136 11.8844 14 11.8844C13.7864 11.8844 13.5763 11.9392 13.3899 12.0434C13.2034 12.1477 13.0468 12.298 12.935 12.48L5.1725 25.095C5.05596 25.2844 4.99207 25.5015 4.98742 25.7239C4.98278 25.9463 5.03754 26.1658 5.14608 26.36C5.25461 26.5541 5.41297 26.7158 5.60483 26.8283C5.79669 26.9408 6.01509 27.0001 6.2375 27H31.7925C32.0136 26.9998 32.2306 26.941 32.4215 26.8296C32.6125 26.7182 32.7704 26.5581 32.8793 26.3658C32.9882 26.1734 33.0442 25.9556 33.0414 25.7345C33.0387 25.5135 32.9774 25.2971 32.8637 25.1075L27.5712 16.2863C27.4601 16.1014 27.3031 15.9485 27.1154 15.8424C26.9276 15.7362 26.7157 15.6804 26.5 15.6804C26.2843 15.6804 26.0724 15.7362 25.8846 15.8424C25.6969 15.9485 25.5399 16.1014 25.4288 16.2863L21.4688 22.8863ZM2.75 0.75H35.25C35.913 0.75 36.5489 1.01339 37.0178 1.48223C37.4866 1.95107 37.75 2.58696 37.75 3.25V30.75C37.75 31.413 37.4866 32.0489 37.0178 32.5178C36.5489 32.9866 35.913 33.25 35.25 33.25H2.75C2.08696 33.25 1.45107 32.9866 0.982233 32.5178C0.513392 32.0489 0.25 31.413 0.25 30.75V3.25C0.25 2.58696 0.513392 1.95107 0.982233 1.48223C1.45107 1.01339 2.08696 0.75 2.75 0.75ZM27.75 10.75C28.0783 10.7501 28.4035 10.6854 28.7068 10.5598C29.0102 10.4342 29.2858 10.2501 29.518 10.0179C29.7502 9.78575 29.9344 9.51014 30.06 9.2068C30.1857 8.90346 30.2504 8.57834 30.2504 8.25C30.2504 7.92166 30.1857 7.59654 30.06 7.2932C29.9344 6.98987 29.7502 6.71425 29.518 6.4821C29.2858 6.24995 29.0102 6.06581 28.7068 5.94019C28.4035 5.81458 28.0783 5.74995 27.75 5.75C27.087 5.7501 26.4512 6.01354 25.9825 6.48237C25.5137 6.9512 25.2504 7.58703 25.2504 8.25C25.2504 8.91298 25.5137 9.5488 25.9825 10.0176C26.4512 10.4865 27.087 10.7499 27.75 10.75V10.75Z"
      fill="currentcolor"
    />
  </svg>
);
