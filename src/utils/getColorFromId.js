export function getColorFromId(id) {
    const hexLastChar = id?.slice(-1);
    const hexValue = parseInt(hexLastChar, 16);
    const colors = ['#ede4ff', '#ffebf1', '#e8fde2', '#dafdf2', '#e4edfc', '#f6f3f0'];

    const colorIndex = hexValue % colors.length;

    return colors[colorIndex]; 
}