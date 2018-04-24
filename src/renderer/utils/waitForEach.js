/**
 * waitForEach
 *
 * @param {function} processFn Promise to run for each
 * @param {array} collection collection to consume each tick
 */
const waitForEach = (processFn, [head, ...tail]) =>
  !head
    ? Promise.resolve()
    : processFn(head).then(() => waitForEach(processFn, tail));

export default waitForEach;
