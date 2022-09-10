import "crisp-game-lib";

const C = {
  width: 90,
  height: 160,
  laneBlockHeight: 3,
  leftX: 33,
  rightX: 58,
  kumaY: 130,
  kumaStrideLength: 4,
  fastTime: 60,
  slowTime: 60,
  daysUntillGradutation: 1461,
  debug: false,
};
const amountOflaneBlocks = C.height / (C.laneBlockHeight * 2);
const baseDate = new Date(2022, 3, 1);

const title = `KAKENUKERU`;

const description = `
    KUMA

  ${C.daysUntillGradutation} days


[Tap]
Change lanes
`;

const characters: string[] = [
  `
 l  l
 llll
 lllll
lllll
 llll
    l
`,
  `
 l  l
 llll
lllll
 lllll
 llll
 l
`,
  `
rrrrrr
rr  rr
r  r r
r  rrr
r    r
rrrrrr
`,
  `
CCCCCC
CCC CC
CC   C
C C CC
C    C
CCCCCC
`,
  `
yyyyyy
yy  yy
y    y
y    y
y yy y
yyyyyy
`,
  `
YYYYYY
Y YY Y
YY  YY
Y    Y
Y    Y
YYYYYY
`,
  `
RRRRRR
RR  RR
R    R
R    R
 RRRR
RRRRRR
`,
  `
gggggg
gggggg
gg   g
g    g
gg   g
gggggg
`,
  `
RRRRRR
R RR R
R    R
R    R
R    R
RRRR R
`,
  `
PPPPPP
PPP  P
PP   P
P    P
P    P
PPPPPP
`,
  `
cccccc
cc ccc
c    c

c    c
cccccc
`,
  `
RR R R
RR R R
RR R R
R    R
R    R
RRRRRR
`,
  `
 llll
l    l
l
l    l
 llll
`,
  `
 l
l l l
l  lll
l l l
 l lll
    l
`,
  `
  bb
bb byy
bbbbyy
bbyyyy
bby yy
  yy
`,
];

type Item = {
  type: "Fast" | "Slow";
  character: string;
  y: number;
  isInLeft: boolean;
};

type Buff = {
  restTime: number;
};

const items: Item[] = [];
const fasts: Buff[] = [];
const slows: Buff[] = [];

let kumaIsInLeft: boolean;
let pastDays: number;
let pastTime: number;
let muzuLifeTime: number;
let muzuIsInLeft: boolean;
let kimochi: number;
let kimochieeLifeTime: number;
let date: Date;

function update() {
  if (!ticks) {
    kumaIsInLeft = true;
    pastDays = 0;
    pastTime = 0;
    muzuLifeTime = 0;
    muzuIsInLeft = true;
    kimochi = 0;
    kimochieeLifeTime = 0;
    date = baseDate;
    return;
  }

  remove(fasts, (fast) => {
    fast.restTime--;
    return fast.restTime <= 0;
  });
  remove(slows, (slow) => {
    slow.restTime--;
    return slow.restTime <= 0;
  });

  const kumaRunSpeed =
    slows.length >= 1 ? 0.1 : Math.max(difficulty + fasts.length * 1, 0);

  pastTime++;
  while (pastTime > 60 / kumaRunSpeed) {
    pastTime -= 60 / kumaRunSpeed;
    const isFast =
      kumaRunSpeed > 6 ? true : rnd(10) > Math.max(5 / kumaRunSpeed, 0.00001);
    items.push({
      type: isFast ? "Fast" : "Slow",
      character: isFast
        ? addWithCharCode("c", rndi(10))
        : addWithCharCode("c", 10 + rndi(3)),
      y: 0,
      isInLeft: rndi(2) === 0,
    });
  }

  // kuma
  const kumaStride =
    ((ticks * kumaRunSpeed) % C.kumaStrideLength) / C.kumaStrideLength;
  if (kumaRunSpeed > 0.1 && input.isJustPressed) {
    kumaIsInLeft = !kumaIsInLeft;
    play("jump");
  }
  const kumaX = kumaIsInLeft ? C.leftX : C.rightX;
  color("black");
  if (kumaStride < 0.5) {
    char("a", kumaX, C.kumaY);
  } else {
    char("b", kumaX, C.kumaY);
  }

  // items
  remove(items, (item) => {
    item.y += kumaRunSpeed;
    const collision = char(
      item.character,
      item.isInLeft ? C.leftX : C.rightX,
      item.y
    );
    if (collision?.isColliding?.char?.a || collision?.isColliding?.char?.b) {
      switch (item.type) {
        case "Fast":
          fasts.push({ restTime: C.fastTime });
          addScore(1, kumaX, C.kumaY);
          kimochi++;
          play("coin");
          particle(kumaX, C.kumaY, 16, 1, PI / 2, PI / 3);
          return true;
        case "Slow":
          slows.push({ restTime: C.slowTime });
          muzuLifeTime = C.slowTime;
          muzuIsInLeft = item.isInLeft;
          kimochi = 0;
          kimochieeLifeTime = 0;
          particle(kumaX, C.kumaY, 8);
          play("hit");
          return true;
      }
    }
    return item.y > C.height;
  });

  color("black");
  if (muzuLifeTime > 0) {
    muzuLifeTime--;
    text("muzu", (muzuIsInLeft ? C.leftX : C.rightX) - 8, C.kumaY - 10);
  }
  if (kimochieeLifeTime > 0) {
    kimochieeLifeTime--;
    text("KIMOCHIee~~~!!!", 3, C.height / 2 + 7);
    particle(kumaX, C.kumaY, 16, 1, PI / 2, PI / 3);
    play("powerUp");
  }
  if (kimochi > 10) {
    kimochi = 0;
    kimochieeLifeTime = 180;
  }

  // lanes
  const offsetY = (ticks * kumaRunSpeed) % (C.laneBlockHeight * 2);
  color("black");
  for (let n = 0; n < amountOflaneBlocks; n++) {
    const y = offsetY + C.laneBlockHeight * n * 2;
    rect(20, y, 2, C.laneBlockHeight);
    rect(45, y, 2, C.laneBlockHeight);
    rect(70, y, 2, C.laneBlockHeight);
  }
  color("white");
  rect(0, 0, C.width, 21);

  color("black");
  pastDays += kumaRunSpeed / 60;
  date = new Date(baseDate.getTime() + 1000 * 60 * 60 * 24 * pastDays);
  text(
    `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date
      .getUTCDate()
      .toString()
      .padStart(2, "0")}(${Math.ceil(C.daysUntillGradutation - pastDays)})`,
    3,
    10
  );
  text(`${kumaRunSpeed.toFixed(2)} days/s`, 3, 17);
  if (pastDays >= C.daysUntillGradutation) {
    color("light_red");
    rect(0, C.height / 2 - 3, C.width, 10);
    color("black");
    play("lucky");
    end("Thank you!");
  }

  if (C.debug) {
    color("black");
    for (let i = 0; i < characters.length; i++) {
      char(addWithCharCode("a", i), 78, (i + 1) * 10);
    }
    text(`fasts: ${fasts.length}`, 3, 20);
    text(`slows: ${slows.length}`, 3, 30);
  }
}

init({
  update,
  title,
  description,
  characters,
  options: {
    seed: 37,
    isPlayingBgm: true,
    isReplayEnabled: true,
    viewSize: {
      x: C.width,
      y: C.height,
    },
  },
});
