const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();

// Upload image
document.getElementById("upload").addEventListener("change", function(e) {
  img.src = URL.createObjectURL(e.target.files[0]);

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };
});

// Apply tint
function applyTint() {
  const color = document.getElementById("colorPicker").value;
  const intensity = document.getElementById("intensity").value / 100;

  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i] * (1 - intensity) + r * intensity;
    data[i + 1] = data[i + 1] * (1 - intensity) + g * intensity;
    data[i + 2] = data[i + 2] * (1 - intensity) + b * intensity;
  }

  ctx.putImageData(imageData, 0, 0);
}

// Download image
function download() {
  const link = document.createElement("a");
  link.download = "tinted.png";
  link.href = canvas.toDataURL();
  link.click();
}
