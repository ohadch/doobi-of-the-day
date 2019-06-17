import listReactFiles from "list-react-files";
import moment from "moment";

const BEGINNING_DATE = new Date("2019-06-17T12:12:52.995Z");

export default randomImage;

async function randomImage() {
  listReactFiles("../assets").then(paths => {
    return new Promise(resolve => {
      let imgIdx = getImageIdx();
      resolve(paths[imgIdx]);
    });
  });
};

function getImageIdx(paths) {
  let now = moment(new Date());
  let start = moment(BEGINNING_DATE);

  let cycles = moment.duration(now.diff(start)).asDays();

  return cycles % paths.length;
}
