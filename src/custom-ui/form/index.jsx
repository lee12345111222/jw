import { Flex, Icon, Text } from '../index';

import styles from './index.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const Form = ({ children, ...props }) => (
  <Flex fd="column" gap="32px" {...props}>
    {children}
  </Flex>
);

/**
 *
 * @param {object} props
 * @param {string} props.icon
 * @param {string} props.label
 * @param {string} props.subLabel
 * @param {boolean} props.topLabel
 * @returns
 */
export const FormItem = ({
  icon,
  topLabel,
  label,
  subLabel,
  children,
  required
}) => (
  <Flex ai="flex-start" gap="16px">
    {icon && (
      <div className={cx('icon')}>
        <Icon icon={icon} w="16px" />
      </div>
    )}
    <Flex gap="12px" fd={topLabel && 'column'} grow="1">
      <Flex fd="column" gap="8px" w={topLabel && '100'} shrink="0">
        {label && (
          <Text opacity="084">
            {label}
            {required && <span className={cx('required')}> *</span>}
          </Text>
        )}
        {subLabel && (
          <Text size="small" opacity="04">
            {subLabel}
          </Text>
        )}
      </Flex>
      {children}
    </Flex>
  </Flex>
);
