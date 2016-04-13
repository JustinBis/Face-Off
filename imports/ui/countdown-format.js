  
/**
 * Format miliseconds as will be rendered by the CountdownTimer react component (used in the feed)
 * @param  Number milliseconds miliseconds to countdown at
 * @return String              Formatted countdown string
 */
export default function formatTime(milliseconds) {


  var totalSeconds = Math.round(milliseconds / 1000);

  var seconds = parseInt(totalSeconds % 60, 10);
  var minutes = parseInt(totalSeconds / 60, 10) % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return minutes + ':' + seconds;
}