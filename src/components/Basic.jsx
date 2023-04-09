import { forwardRef } from 'react';

import styled, { css } from 'styled-components';

/**
 * @typedef {string} width
 * @typedef {string} height
 * @typedef {string} boxSizing
 *
 * @typedef {string} margin
 * @typedef {string} marginTop
 * @typedef {string} marginRight
 * @typedef {string} marginBottom
 * @typedef {string} marginLeft
 *
 * @typedef {string} padding
 * @typedef {string} paddingTop
 * @typedef {string} paddingRight
 * @typedef {string} paddingBottom
 * @typedef {string} paddingLeft
 *
 * @typedef {string} border
 * @typedef {string} borderTop
 * @typedef {string} borderRight
 * @typedef {string} borderBottom
 * @typedef {string} borderLeft
 *
 * @typedef {string} fontSize
 * @typedef {string} fontWeight
 * @typedef {string} lineHeight
 * @typedef {string} textAlign
 * @typedef {string} color
 *
 * @typedef {string} backgroundColor
 * @typedef {string} backgroundImage
 * @typedef {string} background
 * @typedef {string} cursor
 *
 * @typedef {string} flexDirection
 * @typedef {string} flexWrap
 * @typedef {string} alignItems
 * @typedef {string} justifyContent
 * @typedef {string} gap
 *
 * @typedef {string} alignSelf
 * @typedef {string} flex
 * @typedef {string} flexGrow
 * @typedef {string} flexShrink
 *
 * @typedef {string} gridTemplate
 * @typedef {string} gridTemplateColumns
 * @typedef {string} gridTemplateRows
 * @typedef {string} gridTemplateAreas
 * @typedef {string} gridGap
 * @typedef {string} gridAutoFlow
 * @typedef {string} placeItems
 * @typedef {string} placeContent
 *
 * @typedef {string} gridColumn
 * @typedef {string} gridRow
 * @typedef {string} gridArea
 * @typedef {string} placeSelf
 */

const boxStyle = css`
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  box-sizing: ${(props) => props.bs};
`;

const marginStyle = css`
  margin: ${(props) => props.m};
  margin-top: ${(props) => props.mt};
  margin-right: ${(props) => props.mr};
  margin-bottom: ${(props) => props.mb};
  margin-left: ${(props) => props.ml};
`;

const paddingStyle = css`
  padding: ${(props) => props.p};
  padding-top: ${(props) => props.pt};
  padding-right: ${(props) => props.pr};
  padding-bottom: ${(props) => props.pb};
  padding-left: ${(props) => props.pl};
`;

const borderStyle = css`
  border: ${(props) => props.b};
  border-top: ${(props) => props.bt};
  border-right: ${(props) => props.br};
  border-bottom: ${(props) => props.bb};
  border-left: ${(props) => props.bl};
  border-radius: ${(props) => props.radius};
`;

const textStyle = css`
  font-size: ${(props) => props.fs};
  font-weight: ${(props) => props.fw};
  line-height: ${(props) => props.lh};
  text-align: ${(props) => props.ta};
  color: ${(props) => props.c};
`;

const bgStyle = css`
  background-color: ${(props) => props.bgcolor};
  background-image: ${(props) => props.bgimage};
  background: ${(props) => props.bg};
`;

const StyledText = styled.span`
  ${textStyle}
`;

/**
 * @description
 *
 * @param {object} props
 * @param {fontSize} [props.fs]
 * @param {fontWeight} [props.fw]
 * @param {lineHeight} [props.lh]
 * @param {textAlign} [props.ta]
 * @param {color} [props.c]
 *
 * @returns {JSX.Element}
 */
export const Text = (props) => <StyledText {...props} />;

const StyledImage = styled.img`
  width: ${(props) => props.w || '100%'};
  height: ${(props) => props.h};
  box-sizing: ${(props) => props.bs};
  ${marginStyle};
  ${borderStyle};
`;

/**
 * @description basic image component
 *
 * @param {object} props
 * @param {width} [props.w]
 * @param {height} [props.h]
 * @param {boxSizing} [props.bs]
 * @param {margin} [props.m]
 * @param {marginTop} [props.mt]
 * @param {marginRight} [props.mr]
 * @param {marginBottom} [props.mb]
 * @param {marginLeft} [props.ml]
 * @param {border} [props.b]
 * @param {borderTop} [props.bt]
 * @param {borderRight} [props.br]
 * @param {borderBottom} [props.bb]
 * @param {borderLeft} [props.bl]
 *
 * @returns {JSX.Element}
 */
export const Image = (props) => <StyledImage {...props} />;

const StyledIcon = styled(StyledImage)`
  aspect-ratio: 1 / 1;
  cursor: ${(props) => (props.cursor ? props.cur : 'pointer')};
`;

/**
 * @description icon component
 *
 * @param {object} props
 * @param {width} [props.w]
 * @param {height} [props.h]
 * @param {boxSizing} [props.bs]
 * @param {margin} [props.m]
 * @param {marginTop} [props.mt]
 * @param {marginRight} [props.mr]
 * @param {marginBottom} [props.mb]
 * @param {marginLeft} [props.ml]
 * @param {border} [props.b]
 * @param {borderTop} [props.bt]
 * @param {borderRight} [props.br]
 * @param {borderBottom} [props.bb]
 * @param {borderLeft} [props.bl]
 * @param {cursor} [props.cur]
 *
 * @returns {JSX.Element}
 */
export const Icon = (props) => <StyledIcon {...props} />;

const StyledContainer = styled.div`
  ${boxStyle};
  ${marginStyle};
  ${paddingStyle};
  ${borderStyle};
  ${bgStyle};
`;

/**
 * @description basic countainer component
 *
 * @param {object} props
 * @param {width} [props.w]
 * @param {height} [props.h]
 * @param {boxSizing} [props.bs]
 * @param {margin} [props.m]
 * @param {marginTop} [props.mt]
 * @param {marginRight} [props.mr]
 * @param {marginBottom} [props.mb]
 * @param {marginLeft} [props.ml]
 * @param {padding} [props.p]
 * @param {paddingTop} [props.pt]
 * @param {paddingRight} [props.pr]
 * @param {paddingBottom} [props.pb]
 * @param {paddingLeft} [props.pl]
 * @param {border} [props.b]
 * @param {borderTop} [props.bt]
 * @param {borderRight} [props.br]
 * @param {borderBottom} [props.bb]
 * @param {borderLeft} [props.bl]
 * @param {backgroundColor} [props.bgcolor]
 * @param {backgroundImage} [props.bgimage]
 * @param {background} [props.bg]
 *
 * @returns {JSX.Element}
 */
export const Container = (props) => <StyledContainer {...props} />;

const StyledBox = styled.div`
  ${boxStyle};
  ${marginStyle};
  ${paddingStyle};
  ${borderStyle};
  ${textStyle};
  ${bgStyle};
`;

/**
 * @description Box component
 *
 * @param {object} props
 * @param {width} [props.w]
 * @param {height} [props.h]
 * @param {boxSizing} [props.bs]
 * @param {margin} [props.m]
 * @param {marginTop} [props.mt]
 * @param {marginRight} [props.mr]
 * @param {marginBottom} [props.mb]
 * @param {marginLeft} [props.ml]
 * @param {padding} [props.p]
 * @param {paddingTop} [props.pt]
 * @param {paddingRight} [props.pr]
 * @param {paddingBottom} [props.pb]
 * @param {paddingLeft} [props.pl]
 * @param {border} [props.b]
 * @param {borderTop} [props.bt]
 * @param {borderRight} [props.br]
 * @param {borderBottom} [props.bb]
 * @param {borderLeft} [props.bl]
 * @param {fontSize} [props.fs]
 * @param {fontWeight} [props.fw]
 * @param {lineHeight} [props.lh]
 * @param {textAlign} [props.ta]
 * @param {color} [props.c]
 * @param {backgroundColor} [props.bgcolor]
 * @param {backgroundImage} [props.bgimage]
 * @param {background} [props.bg]
 *
 * @returns {JSX.Element}
 */
export const Box = (props) => <StyledBox {...props} />;

const StyledFlex = styled(StyledContainer)`
  display: flex;
  flex-direction: ${(props) => props.fd};
  flex-wrap: ${(props) => props.fw};
  align-items: ${(props) => props.ai};
  justify-content: ${(props) => props.jc};
  gap: ${(props) => props.gap};
  align-self: ${(props) => props.self};
  flex: ${(props) => props.flex};
  flex-grow: ${(props) => props.grow};
  flex-shrink: ${(props) => props.shrink};
`;

export const Flex = forwardRef((props, ref) => (
  <StyledFlex ref={ref} {...props} />
));

const StyledGrid = styled(StyledContainer)`
  display: grid;
  grid-template: ${(props) => props.gt};
  grid-template-columns: ${(props) => props.gc};
  grid-template-rows: ${(props) => props.gr};
  grid-template-areas: ${(props) => props.ga};
  grid-gap: ${(props) => props.gg};
  grid-auto-flow: ${(props) => props.gf};
  place-items: ${(props) => props.pi};
  place-content: ${(props) => props.pc};
`;

export const Grid = forwardRef(
  /**
   * @description Grid component
   *
   * @param {object} props
   * @param {gridTemplate} [props.gt]
   * @param {gridTemplateColumns} [props.gc]
   * @param {gridTemplateRows} [props.gr]
   * @param {gridTemplateAreas} [props.ga]
   * @param {gridGap} [props.gg]
   * @param {gridAutoFlow} [props.gf]
   * @param {placeItems} [props.pi]
   * @param {placeContent} [props.pc]
   * @param {width} [props.w]
   * @param {height} [props.h]
   * @param {boxSizing} [props.bs]
   * @param {margin} [props.m]
   * @param {marginTop} [props.mt]
   * @param {marginRight} [props.mr]
   * @param {marginBottom} [props.mb]
   * @param {marginLeft} [props.ml]
   * @param {padding} [props.p]
   * @param {paddingTop} [props.pt]
   * @param {paddingRight} [props.pr]
   * @param {paddingBottom} [props.pb]
   * @param {paddingLeft} [props.pl]
   * @param {border} [props.b]
   * @param {borderTop} [props.bt]
   * @param {borderRight} [props.br]
   * @param {borderBottom} [props.bb]
   * @param {borderLeft} [props.bl]
   * @param {backgroundColor} [props.bgcolor]
   * @param {backgroundImage} [props.bgimage]
   * @param {background} [props.bg]
   *
   * @returns {JSX.Element}
   */
  (props, ref) => <StyledGrid ref={ref} {...props} />
);

const StyledFlexItem = styled.div`
  align-self: ${(props) => props.self};
  flex: ${(props) => props.flex};
  flex-grow: ${(props) => props.grow};
  flex-shrink: ${(props) => props.shrink};
`;

/**
 * @description Flex component
 *
 * @param {object} props
 * @param {alignSelf} [props.self]
 * @param {flex} [props.flex]
 * @param {flexGrow} [props.grow]
 * @param {flexShrink} [props.shrink]
 *
 * @returns {JSX.Element}
 */
export const FlexItem = (props) => <StyledFlexItem {...props} />;

const StyledGridItem = styled(StyledContainer)`
  grid-column: ${(props) => `span ${props.span}`};
  grid-column: ${(props) => props.column};
  grid-row: ${(props) => props.row};
  grid-area: ${(props) => props.area};
  place-self: ${(props) => props.place};
`;

/**
 * @description Grid component
 *
 * @param {object} props
 * @param {gridColumn} [props.span]
 * @param {gridColumn} [props.column]
 * @param {gridRow} [props.row]
 * @param {gridArea} [props.area]
 * @param {placeSelf} [props.place]
 *
 * @returns {JSX.Element}
 */
export const GridItem = (props) => <StyledGridItem {...props} />;
