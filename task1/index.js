const colorArray = ["red", "orange", "yellow", "green", "blue", "purple"];

function createColorManager(defaultColor) {
    this.defaultColor = defaultColor;

    let colorIndex = colorArray.indexOf(this.defaultColor);

    this.get = () => {
        return `You have selected ${colorArray[colorIndex]}`;
    };
    this.next = () => {
        colorIndex++;
        if (colorIndex === colorArray.length) {
            colorIndex = 0;
        }
        return `${colorArray[colorIndex]}`;
    };
    this.prev = () => {
        colorIndex--;
        if (colorIndex < 0) {
            colorIndex = colorArray.length - 1;
        }
        return `${colorArray[colorIndex]}`;
    };
    this.reset = () => {
        colorIndex = colorArray.indexOf(this.defaultColor);
        return `Color was reset to ${colorArray[colorIndex]}`;
    };
}

const colorManager = new createColorManager("green");
