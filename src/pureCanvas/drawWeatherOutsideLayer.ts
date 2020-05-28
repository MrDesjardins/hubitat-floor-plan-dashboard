import { TEXT_SIZE, TEXT_COLOR } from "../constants";

const FIRST_X = 560;
const IMAGE_X = 600;
const SECOND_X = 660;
const FIRST_Y = 70;
const VERTICAL_SPACE = 30;
const img = new Image();
export function drawWeatherOutsideLayer(ctx: CanvasRenderingContext2D): void {
  if (img.src === "") {
    img.src = `http://openweathermap.org/img/wn/10d.png`;
  }
  if (img.src !== "") {
    ctx.drawImage(img, IMAGE_X, FIRST_Y - VERTICAL_SPACE, 50, 50);
  }
  ctx.beginPath();
  ctx.font = `${TEXT_SIZE}px Arial`;
  ctx.fillStyle = TEXT_COLOR;
  ctx.fillText("Today", FIRST_X, FIRST_Y);
  ctx.fillText(`123°F`, SECOND_X, FIRST_Y);

  ctx.fillText("Morning", FIRST_X, FIRST_Y + VERTICAL_SPACE * 2);
  ctx.fillText(`123°F`, SECOND_X, FIRST_Y + VERTICAL_SPACE * 2);

  ctx.fillText("Afternoon", FIRST_X, FIRST_Y + VERTICAL_SPACE * 3);
  ctx.fillText(`123°F`, SECOND_X, FIRST_Y + VERTICAL_SPACE * 3);


  ctx.fillText("Tomorrow", FIRST_X, FIRST_Y + VERTICAL_SPACE * 4);
  ctx.fillText(`123°F`, SECOND_X, FIRST_Y + VERTICAL_SPACE * 4);

  ctx.fillText("Tomorrow", FIRST_X, FIRST_Y + VERTICAL_SPACE * 5);
  ctx.fillText(`123°F`, SECOND_X, FIRST_Y + VERTICAL_SPACE * 5);
}