import arrColors from './dataset';

class Point {
  constructor(x, y, z, label) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.label = label;
  }
  dist(p) {
    let x = Math.abs(p.x - this.x),
        y = Math.abs(p.y - this.y),
        z = Math.abs(p.z - this.z);

    return Math.sqrt(x * x + y * y + z * z);
  }
}

class ColorClassifier {
  constructor() {
    this.data = [];
  }
  learn(data) {
    this.data = data;
  }
  classify(triplet) {
      let point = rgb_from_hex(triplet);
      let min = Infinity;
      let min_idx = -1;
      let i, dist;
      for (i = 0; i < this.data.length; ++i)
      {
        dist = point.dist(this.data[i]);
        if (dist < min)
        {
          min = dist;
          min_idx = i;
        }
      }
      this.last_result = min_idx;
      return this.data[min_idx].label;
  }
  get_closest_color_hex(triplet) {
      let p = this.data[this.last_result];
      let val = p.x * (256 * 256) + p.y * 256 + p.z;
      let str = val.toString(16);
      while (str.length < 6)
        str = "0" + str;
      return "#" + str;
  }
}

function get_dataset(arrColors, callback)
{
  let data = [],
      arrLength = arrColors.length;

  for (let i = 0; i < arrLength; ++i) {
    data.push(new Point(arrColors[i]["x"], arrColors[i]["y"], arrColors[i]["z"], arrColors[i]["label"]));
  }
  callback(data);
}

function rgb_from_hex(triplet) {
  triplet = triplet.replace("#", "");
  
  if (triplet.length == 3) // #rgb == #rrggbb
  {
    triplet = triplet[0] + triplet[0]
            + triplet[1] + triplet[1]
            + triplet[2] + triplet[2];
  }
  
  let value = parseInt(triplet, 16);
  let b = Math.floor(value % 256);
  let g = Math.floor((value / 256) % 256);
  let r = Math.floor((value / (256 * 256)) % 256);
  return new Point(r, g, b);
}

const classifier = new ColorClassifier();
get_dataset(arrColors, function (data){
    classifier.learn(data);
});

export default classifier;