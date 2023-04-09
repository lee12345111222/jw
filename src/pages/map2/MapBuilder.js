import { cloneDeep } from 'lodash-es';

export default class MapBuilder {
  constructor(mapData, landData) {
    const data = cloneDeep(mapData);

    let minX = 999999;
    let minY = 999999;
    let maxX = -999999;
    let maxY = -999999;

    data.streets.forEach((street) => {
      const { startX, startY, endX, endY } = street;

      if (startX < minX) minX = startX;
      if (startY < minY) minY = startY;

      if (endX > maxX) maxX = endX;
      if (endY > maxY) maxY = endY;
    });

    const height = maxY - minY;
    const width = maxX - minX;

    // data.streets.forEach((street) => {
    //   street.startX -= minX;
    //   street.endX -= minX;
    //   street.startY -= minY;
    //   street.endY -= minY;
    // });

    // data.buildings.forEach((building) => {
    //   building.startX -= minX;
    //   building.endX -= minX;
    //   building.startY -= minY;
    //   building.endY -= minY;
    // });

    // landData.forEach((land) => {
    //   const building = data.buildings.find(
    //     (b) =>
    //       b.startX === land.x1 &&
    //       b.startY === land.y1 &&
    //       b.endX === land.x2 &&
    //       b.endY === land.y2
    //   );

    //   if (building) {
    //     building.asset_status = land.asset_status;
    //     building.owner = land.owner;
    //     building.token_id = land.token_id;
    //     building.img = land?.custom_img;
    //   }
    // });

    this.data = data;
    this.smallStreets = data.streets.filter((street) => street.roadSmall);

    this.mediumStreets = data.streets.filter(
      (street) =>
        !street.roadSmall &&
        4 ===
          (street.endX - street.startX < street.endY - street.startY
            ? street.endX - street.startX
            : street.endY - street.startY)
    );

    this.bigStreets = data.streets.filter(
      (street) =>
        !street.roadSmall &&
        8 ===
          (street.endX - street.startX < street.endY - street.startY
            ? street.endX - street.startX
            : street.endY - street.startY)
    );

    this.buildings = data.buildings;

    this.width = width;
    this.height = height;
    this.minX = minX;
    this.minY = minY;
  }

  getData() {
    return this.data;
  }

  getBuildingData() {
    return this.buildings;
  }

  getSize() {
    return { width: this.width, height: this.height };
  }

  svgBuilder() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', this.width);
    svg.setAttribute('height', this.height);
    svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
    svg.setAttribute('fill', 'none');

    return svg;
  }

  /**
   *
   * @returns {domElement} svg
   */
  houseBuilder() {
    let html = '';

    this.buildings.forEach((building) => {
      const { startX: x1, startY: y1, endX: x2, endY: y2 } = building;
      const width = x2 - x1;
      const height = y2 - y1;

      html += `<rect width="${width}" height="${height}" x="${
        x1 - this.minX
      }" y="${this.height - y1 - height + this.minY}" fill="#455955" />`;

      if (building.img) {
        html += `<image width="${width}" height="${height}" x="${
          x1 + 500
        }" y="${this.height - y1 - height + 500}" href="${
          building.img
        }" preserveAspectRatio="xMidYMid slice" />`;
      }
    });
    const houseSvg = this.svgBuilder();
    houseSvg.innerHTML = html;
    return houseSvg;
  }

  streetBuilder(data, size = 0) {
    let html = '';

    data.forEach((street, i) => {
      let { startX: x1, startY: y1, endX: x2, endY: y2 } = street;

      const x0 = x2 - x1;
      const y0 = y2 - y1;

      let x, y;
      if (x0 > y0) {
        // -- style
        y = y0 / 2;
        y1 += y;
        y2 -= y;
      } else {
        // | style
        x = x0 / 2;
        x1 += x;
        x2 -= x;
      }

      const line = `<line x1=${x1 - this.minX} y1=${
        this.height - y1 + this.minY
      } x2=${x2 - this.minX} y2=${
        this.height - y2 + this.minY
      } stroke="#142623" stroke-width=${(x || y) * 2 - size} />`;
      html += line;
    });

    return html;
  }

  bigStreetBuilder(size = 0) {
    const streetSvg = this.svgBuilder();
    streetSvg.innerHTML =
      this.streetBuilder(this.bigStreets, size) +
      this.streetBuilder(this.mediumStreets, size);
    return streetSvg;
  }

  smallStreetBuilder(size = 0) {
    const streetSvg = this.svgBuilder();
    streetSvg.innerHTML = this.streetBuilder(this.smallStreets, size);
    return streetSvg;
  }
}
