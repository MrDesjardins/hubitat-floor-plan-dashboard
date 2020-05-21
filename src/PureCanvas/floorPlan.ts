import { drawPath2D } from "./commonDrawing";
import { WALL_COLOR } from "../constants";

export function drawFlooPlan(ctx: CanvasRenderingContext2D): void {
  const paths: Path2D[] = [
    new Path2D("M41 197.64C41 301.84 41 302.38 42.72 302.38C44.36 302.38 44.45 301.84 44.45 293.44C44.45 292.85 44.45 289.87 44.45 284.51C46.52 284.51 47.67 284.51 47.9 284.51C50.75 284.51 51.36 284.28 51.36 282.96C51.36 281.63 50.75 281.4 47.9 281.4C47.67 281.4 46.52 281.4 44.45 281.4L44.45 260.03L44.45 238.67L72.51 238.67L100.57 238.67L100.57 260.03L100.57 281.4C95.65 281.4 92.91 281.4 92.37 281.4C84.77 281.4 84.16 281.48 84.16 282.96C84.16 284.51 84.77 284.51 127.76 284.51C170.76 284.51 171.36 284.51 171.36 282.96C171.36 281.63 170.76 281.4 167.48 281.4C167.22 281.4 165.92 281.4 163.59 281.4L163.59 265.86L163.59 250.32L134.24 250.32L104.88 250.32L104.88 225.85L104.88 201.37C106.7 201.37 107.7 201.37 107.91 201.37C110.58 201.37 110.93 201.14 110.93 199.43C110.93 199.3 110.93 198.65 110.93 197.48L77.69 197.48L44.45 197.48L44.45 146.2L44.45 94.92C57.14 94.92 64.19 94.92 65.6 94.92C86.15 94.92 86.75 94.84 86.75 93.37C86.75 91.89 86.15 91.81 64.48 91.81C52.22 91.81 41.86 92.04 41.6 92.36C41.26 92.59 41 139.99 41 197.64ZM100.57 234.78L72.51 234.78L44.45 234.78L44.45 218.08L44.45 201.37L72.51 201.37L100.57 201.37L100.57 218.08L100.57 234.78ZM142.01 281.4L122.58 281.4L103.16 281.4L103.16 267.8L103.16 254.21L122.58 254.21L142.01 254.21L142.01 267.8L142.01 281.4ZM159.27 281.4L152.8 281.4L146.32 281.4L146.32 267.8L146.32 254.21L152.8 254.21L159.27 254.21L159.27 267.8L159.27 281.4Z"),
    new Path2D("M145.72 94.92C147.52 94.92 156.49 94.92 172.66 94.92L172.4 146.2L172.22 197.48L157.98 197.48L143.73 197.48L143.73 199.43L143.73 201.37L195.97 201.37L248.2 201.37L248.2 199.43L248.2 197.48L212.37 197.48L176.54 197.48L176.54 146.2L176.54 94.92C188.46 94.92 195.07 94.92 196.4 94.92C215.65 94.92 216.26 94.84 216.26 93.37C216.26 91.81 215.65 91.81 167.48 91.81C119.3 91.81 118.7 91.81 118.7 93.37C118.7 94.92 119.3 94.92 145.72 94.92Z"),
    new Path2D("M268.49 94.92C269.9 94.92 276.95 94.92 289.64 94.92L289.64 146.2L289.64 197.48C287.05 197.48 285.61 197.48 285.32 197.48C281.27 197.48 281.01 197.64 281.01 199.43C281.01 199.56 281.01 200.2 281.01 201.37L300.43 201.37L319.86 201.37C319.86 200.2 319.86 199.56 319.86 199.43C319.86 197.87 319.43 197.48 317.7 197.48C317.55 197.48 316.84 197.48 315.54 197.48L315.54 146.2L315.54 94.92C323.05 94.92 327.22 94.92 328.06 94.92C339.97 94.92 340.58 94.84 340.58 93.37C340.58 91.81 339.97 91.81 293.96 91.81C247.94 91.81 247.34 91.81 247.34 93.37C247.34 94.84 247.94 94.92 268.49 94.92ZM311.22 197.48L302.59 197.48L293.96 197.48L293.96 146.2L293.96 94.92L302.59 94.92L311.22 94.92L311.22 146.2L311.22 197.48Z"),
    new Path2D("M394.54 94.92C396 94.92 403.34 94.92 416.55 94.92L416.55 146.2L416.55 197.48L384.61 197.48L352.66 197.48C352.66 198.65 352.66 199.3 352.66 199.43C352.66 200.83 353.1 201.37 354.39 201.37C356.03 201.37 356.12 201.91 356.12 220.02C356.12 221.26 356.12 227.48 356.12 238.67L358.28 238.67L360.43 238.67L360.43 220.02L360.43 201.37L403.17 201.37L445.91 201.37L445.91 157.08L445.91 112.79L500.73 112.79L555.55 112.79C555.55 115.12 555.55 116.42 555.55 116.68C555.55 120.02 555.81 120.56 557.28 120.56C558.92 120.56 559 120.02 559 106.19C559 105.23 559 100.44 559 91.81C503.06 91.81 471.98 91.81 465.76 91.81C373.13 91.81 372.52 91.81 372.52 93.37C372.52 94.84 373.13 94.92 394.54 94.92ZM555.55 110.46L499.43 110.46L443.32 110.46L443.32 153.97L443.32 197.48L432.09 197.48L420.87 197.48L420.87 146.2L420.87 94.92L488.21 94.92L555.55 94.92L555.55 102.69L555.55 110.46Z"),
    new Path2D("M483.89 204.48L502.89 204.48L521.88 204.48L521.88 200.59L521.88 196.63C523.02 197.61 523.65 198.15 523.78 198.26C526.89 200.83 533.45 200.05 536.3 196.79C538.2 194.61 537.68 189.87 535.26 187.77C532.76 185.44 526.89 185.13 523.78 187.07C523.65 187.15 523.02 187.54 521.88 188.24L521.88 182.72L521.88 177.2C523.02 178.18 523.65 178.73 523.78 178.84C526.54 181.09 531.46 180.93 534.74 178.37C536.99 176.74 537.42 175.81 537.42 173.01C537.42 170.21 536.99 169.28 534.74 167.65C531.46 165.08 526.54 164.93 523.78 167.18C523.65 167.29 523.02 167.83 521.88 168.81L521.88 162.44L521.88 156.07C523.07 157.05 523.73 157.59 523.87 157.7C526.71 160.11 531.38 159.96 534.74 157.39C536.99 155.76 537.42 154.83 537.42 152.03C537.42 149.23 536.99 148.3 534.74 146.67C531.38 144.1 526.71 143.95 523.87 146.36C523.73 146.47 523.07 147.01 521.88 147.99L521.88 142.47L521.88 136.88L502.89 136.88L483.89 136.88L483.89 170.68L483.89 204.48ZM519.29 202.15L502.89 202.15L486.48 202.15L486.48 170.68L486.48 139.21L502.89 139.21L519.29 139.21L519.29 170.68L519.29 202.15Z"),
    new Path2D("M555.55 272L551.92 272.23L548.21 272.47L548.21 287.62L548.21 302.77L551.92 303L555.55 303.24L555.55 335.87L555.55 368.43C554.31 368.43 553.62 368.43 553.48 368.43C552.36 368.43 551.15 368.97 550.89 369.67C550.63 370.37 550.37 381.87 550.37 395.23C550.37 396.85 550.37 404.96 550.37 419.55L552.96 420.1L555.55 420.64L555.55 447.76L555.55 474.88L533.53 474.88L511.52 474.88L511.52 476.82L511.52 478.76L535.26 478.76L559 478.76C559 378.29 559 322.48 559 311.32C559 144.41 559 143.87 557.28 143.87C555.55 143.87 555.55 144.41 555.55 207.9C555.55 216.44 555.55 237.81 555.55 272ZM555.55 300.83L552.96 300.83L550.37 300.83L550.37 287.62L550.37 274.41L552.96 274.41L555.55 274.41L555.55 287.62L555.55 300.83ZM554.26 418.15C553.13 418.15 552.96 414.97 552.96 394.46C552.96 373.94 553.13 370.76 554.26 370.76C555.38 370.76 555.55 373.94 555.55 394.46C555.55 414.97 555.38 418.15 554.26 418.15Z"),
    new Path2D("M394.97 222.97C395.09 223.08 395.69 223.65 396.78 224.68L392.38 224.68L388.06 224.68L388.06 237.5L388.06 250.32L392.38 250.32L396.78 250.32C395.69 251.35 395.09 251.92 394.97 252.03C393.85 253.2 393.24 254.75 393.24 257C393.24 263.69 401.18 266.72 406.97 262.29C409.13 260.66 409.64 259.72 409.64 257.08C409.64 254.91 409.04 253.35 407.75 252.11C407.62 251.99 407.02 251.39 405.93 250.32L415.08 250.32L424.32 250.32C423.29 251.25 422.71 251.77 422.59 251.87C421.39 252.96 420.87 254.44 420.87 256.93C420.87 261.74 423.63 264.31 428.64 264.31C433.65 264.31 436.41 261.74 436.41 256.93C436.41 254.44 435.89 252.96 434.68 251.87C434.57 251.77 433.99 251.25 432.96 250.32L439.43 250.32L445.91 250.32L445.91 237.5L445.91 224.68L439.43 224.68L432.96 224.68C433.99 223.75 434.57 223.23 434.68 223.13C437.27 220.79 437.1 215.12 434.25 212.64C431.4 209.99 426.31 209.99 423.11 212.64C420.18 215.04 419.92 220.72 422.59 223.13C422.71 223.23 423.29 223.75 424.32 224.68L415.08 224.68L405.93 224.68C407.02 223.61 407.62 223.01 407.75 222.89C409.04 221.65 409.64 220.1 409.64 217.92C409.64 211.39 400.58 208.21 395.57 212.87C392.64 215.67 392.38 220.41 394.97 222.97ZM442.88 247.21L417.24 247.21L391.51 247.21L391.51 237.5L391.51 227.79L417.24 227.79L442.88 227.79L442.88 237.5L442.88 247.21Z"),
    new Path2D("M210.21 281.4C208.14 281.4 206.99 281.4 206.76 281.4C203.91 281.4 203.31 281.63 203.31 282.96C203.31 284.28 203.91 284.51 206.76 284.51C206.99 284.51 208.14 284.51 210.21 284.51L210.21 314.04L210.21 343.56L212.37 343.56L214.53 343.56L214.53 332.68L214.53 321.81L257.09 321.81L299.57 321.81L299.57 361.43L299.57 401.06L257.09 401.06L214.53 401.06L214.53 386.69L214.53 372.31L212.37 372.31L210.21 372.31L210.21 386.69L210.21 401.06L127.33 401.06L44.45 401.06C44.45 395 44.45 391.63 44.45 390.96C44.45 381.4 44.36 380.86 42.72 380.86C41 380.86 41 381.4 41 406.11C41 430.82 41 431.36 42.72 431.36C44.36 431.36 44.45 430.82 44.45 418.15C44.45 417.27 44.45 412.87 44.45 404.95L126.47 404.95L208.49 404.95L208.49 414.27L208.49 423.59L231.8 423.59L255.11 423.59L255.11 436.41L255.11 449.23L277.38 449.23L299.57 449.23L299.57 554.91L299.57 660.58L172.05 660.58L44.45 660.58L44.45 624.14L44.45 587.62C45.64 587.48 46.3 587.4 46.44 587.39C48.33 587.15 48.33 587.08 48.59 571.22C48.85 553.43 48.68 551.8 46.18 551.8C44.45 551.8 44.45 551.1 44.45 506.34C44.45 461.36 44.45 460.89 42.72 460.89C41 460.89 41 461.28 41.17 562.06C41.19 568.81 41.27 602.55 41.43 663.3L172.48 663.53L303.45 663.69L303.45 556.07L303.45 448.46C305.27 448.46 306.27 448.46 306.48 448.46C309.15 448.46 309.5 448.22 309.5 446.52C309.5 444.81 309.15 444.57 306.48 444.57C304.06 444.57 303.45 444.26 303.45 443.02C303.45 442.09 302.85 441.46 301.99 441.46C300.52 441.46 300.43 440.3 300.43 427.09C300.43 413.88 300.52 412.72 301.99 412.72C303.37 412.72 303.45 407.98 303.45 323.75C303.45 317.82 303.45 288.16 303.45 234.78L292.23 234.78L281.01 234.78L281.01 236.72L281.01 238.67L290.33 238.67L299.57 238.67L299.57 278.29L299.57 317.92L257.09 317.92L214.53 317.92L214.53 278.29L214.53 238.67L231.36 238.67L248.2 238.67L248.2 236.72L248.2 234.78L229.21 234.78L210.21 234.78L210.21 258.09L210.21 281.4ZM253.38 420.49L232.66 420.49L211.94 420.49L211.94 413.88L211.94 407.28L232.66 407.28L253.38 407.28L253.38 413.88L253.38 420.49ZM297.41 446.13L277.98 446.13L258.56 446.13L258.56 426.7L258.56 407.28L277.98 407.28L297.41 407.28L297.41 426.7L297.41 446.13Z"),
    new Path2D("M417.41 426.7L446.34 426.7L475.26 426.7L475.26 413.49L475.26 400.28L461.45 400.28L447.63 400.28L447.63 362.21L447.63 324.14L432.52 324.14L417.41 324.14L417.41 375.42L417.41 426.7ZM444.18 402.38C446.56 402.71 447.89 402.89 448.15 402.93C450.39 403.16 456.61 403.39 461.96 403.39C462.62 403.39 465.9 403.39 471.81 403.39L471.81 413.49L471.81 423.59L446.16 423.59L420.44 423.59L420.44 375.42L420.44 327.24L432.52 327.24L444.61 327.24L444.35 364.85L444.18 402.38Z"),
    new Path2D("M386.33 438.67C385.04 435.71 381.24 433.69 377.1 433.69C373.82 433.69 372.78 434.08 370.28 436.34C367.77 438.59 367.34 439.52 367.34 442.63C367.34 445.74 367.77 446.67 370.28 448.92C372.78 451.18 373.82 451.57 377.1 451.57C381.24 451.57 385.04 449.55 386.33 446.59C386.77 445.58 387.11 449.47 387.11 456.77C387.12 457.56 387.15 461.53 387.2 468.66L401.44 468.66L415.69 468.66L415.69 442.63L415.69 416.6L401.44 416.6L387.2 416.6L387.11 428.41C386.88 435.92 386.62 439.34 386.33 438.67ZM412.23 465.55L401.44 465.55L390.65 465.55L390.65 442.63L390.65 419.71L401.44 419.71L412.23 419.71L412.23 442.63L412.23 465.55ZM383.74 442.63C383.74 443.72 382.79 445.51 381.59 446.52C380.46 447.6 378.48 448.46 377.27 448.46C376.06 448.46 374.07 447.6 372.95 446.52C371.74 445.51 370.79 443.72 370.79 442.63C370.79 441.54 371.74 439.76 372.95 438.75C374.07 437.66 376.06 436.8 377.27 436.8C378.48 436.8 380.46 437.66 381.59 438.75C382.79 439.76 383.74 441.54 383.74 442.63Z"),
    new Path2D("M347.92 448.46C348.35 448.46 350.51 448.46 354.39 448.46L354.39 463.61L354.39 478.76L371.66 478.76L388.92 478.76L388.92 476.82L388.92 474.88L373.82 474.88L358.71 474.88L358.71 459.72L358.71 444.57L350.07 444.57L341.44 444.57L341.44 446.52C341.56 447.81 343.71 448.46 347.92 448.46Z"),
    new Path2D("M277.55 490.42L287.05 490.42L296.55 490.42L296.55 470.6L296.55 450.79L287.05 450.79L277.55 450.79L277.55 470.6L277.55 490.42ZM293.09 487.31L287.05 487.31L281.01 487.31L281.01 470.6L281.01 453.9L287.05 453.9L293.09 453.9L293.09 470.6L293.09 487.31Z"),
    new Path2D("M224.89 463.22L250.79 463.22L276.69 463.22L276.69 457.39L276.69 451.57L250.79 451.57L224.89 451.57L224.89 457.39L224.89 463.22ZM273.24 460.11L250.79 460.11L228.34 460.11L228.34 457.39L228.34 454.67L250.79 454.67L273.24 454.67L273.24 457.39L273.24 460.11Z"),
    new Path2D("M47.04 486.53L84.6 486.53L122.15 486.53L122.15 476.04L122.15 465.55L84.6 465.55L47.04 465.55L47.04 476.04L47.04 486.53ZM118.7 483.42L84.6 483.42L50.49 483.42L50.49 476.04L50.49 468.66L84.6 468.66L118.7 468.66L118.7 476.04L118.7 483.42Z"),
    new Path2D("M124.74 533.93L136.83 533.93L148.91 533.93L148.91 500.52L148.91 467.11L136.83 467.11L124.74 467.11L124.74 500.52L124.74 533.93ZM145.46 530.82L136.83 530.82L128.19 530.82L128.19 500.52L128.19 470.21L136.83 470.21L145.46 470.21L145.46 500.52L145.46 530.82Z"),
    new Path2D("M420.87 478.76L449.79 478.76L478.71 478.76L478.71 476.82L478.71 474.88L449.79 474.88L420.87 474.88L420.87 476.82L420.87 478.76Z"),
    new Path2D("M47.04 510.62L84.6 510.62L122.15 510.62L122.15 499.74L122.15 488.86L84.6 488.86L47.04 488.86L47.04 499.74L47.04 510.62ZM118.7 507.51L84.6 507.51L50.49 507.51L50.49 499.74L50.49 491.97L84.6 491.97L118.7 491.97L118.7 499.74L118.7 507.51Z"),
    new Path2D("M124.74 652.03L136.83 652.03L148.91 652.03L148.91 618.23L148.91 584.43L136.83 584.43L124.74 584.43L124.74 618.23L124.74 652.03ZM145.46 648.93L136.83 648.93L128.19 648.93L128.19 618.23L128.19 587.54L136.83 587.54L145.46 587.54L145.46 618.23L145.46 648.93Z"),
  ];
  drawPath2D(ctx, paths, { location: { x: 0, y: -70 }, fillStyle: WALL_COLOR });
}

